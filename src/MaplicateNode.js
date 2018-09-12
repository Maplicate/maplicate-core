import EventEmitter from "eventemitter3";
import { generateId, copy } from "./util";

/**
 * Maplicate node
 * @param {Object}  orbitdb an orbit-db instance
 * @param {string}  nameOrAddress maplicate node name or address
 */
export class MaplicateNode extends EventEmitter {
  constructor(orbitdb, nameOrAddress, options = {}) {
    super();

    this.ready = false;
    this._featureHash = {};

    let access;

    if (options.readOnly) {
      access = {};
    } else {
      access = {
        write: ["*"]
      };
    }

    orbitdb
      .docstore(nameOrAddress, access)
      .then(store => {
        this.store = store;

        this.store.events.on("replicate.progress", this._handleProgress.bind(this));
        this.store.events.on("load.progress", this._handleProgress.bind(this));

        return store.load();
      })
      .then(() => {
        this.emit("ready");
        this.ready = true;
      });
  }

  /**
   * Map address
   * @returns {string} unique map address
   */
  get address() {
    if (!this.ready) {
      return;
    }

    const { root, path } = this.store.address;
    return `${root}/${path}`;
  }

  /**
   * Get a map feature
   * @param   {string}  id  feature id
   * @returns {Promise}     GeoJSON feature
   */
  async get(id) {
    return this.store.get(id)[0];
  }

  /**
   * Add a map feature
   * @param  {Feature}  feature    GeoJSON feature
   * @param  {Object}   [options={}] options
   * @param  {boolean}  [options.disableEvent=false]  indicates whether to disable event
   * @returns {Promise}            feature id
   */
  async add(feature, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error("map not ready");
    }

    const featureCopy = copy(feature);

    if (!featureCopy.properties) {
      featureCopy.properties = {};
    }

    if (!featureCopy._id) {
      featureCopy._id = generateId();
    }

    const hash = await this.store.put(featureCopy);
    this._featureHash[featureCopy._id] = hash;

    if (!options.disableEvent) {
      this.emit("feature:added", featureCopy);
    }

    return featureCopy._id;
  }

  /**
   * Update a map feature
   * @param   {string}  id         feature id
   * @param   {Feature} feature    GeoJSON feature
   * @param   {Object}  [options={}] options
   * @param   {boolean} [options.disableEvent=false]  indicates whether to disable event
   * @returns {Promise}            no output
   */
  async update(id, feature, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error("map not ready");
    }

    if (!this._featureHash[id]) {
      throw new Error("feature not exists");
    }

    const featureCopy = copy(feature);

    if (!featureCopy.properties) {
      featureCopy.properties = {};
    }

    featureCopy._id = id;

    const hash = await this.store.put(featureCopy);
    this._featureHash[featureCopy._id] = hash;

    if (!options.disableEvent) {
      this.emit("feature:updated", featureCopy);
    }
  }

  /**
   * Remove a map feature
   * @param   {string}  id         feature id
   * @param   {Object}  [options={}] options
   * @param   {boolean} [options.disableEvent=false]  indicates whether to disable event
   * @returns {Promise}            no output
   */
  async remove(id, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error("map not ready");
    }

    if (!this._featureHash[id]) {
      return;
    }

    let feature;

    if (!options.disableEvent) {
      feature = this.store.get(id)[0];
    }

    await this.store.del(id);

    if (!options.disableEvent) {
      this.emit("feature:removed", feature);
    }
  }

  /**
   * Close the connection
   * @returns {Promise} no output
   */
  async close() {
    if (!this.store) {
      return;
    }

    await this.store.close();
  }

  /**
   * Drop local storage
   * @returns {Promise} no output
   */
  async drop() {
    if (!this.store) {
      return;
    }

    await this.store.drop();
  }

  _handleProgress(address, hash, entry) {
    const id = entry.payload.key;
    const feature = copy(entry.payload.value);

    if (!feature) {
      this.emit("feature:removed", { _id: id });
    } else if (!this._featureHash[id]) {
      this.emit("feature:added", feature);
    } else if (this._featureHash[id] !== hash) {
      this.emit("feature:updated", feature);
    }

    this._featureHash[id] = hash;
  }
}
