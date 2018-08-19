import EventEmitter from "eventemitter3";
import * as OrbitDB from "orbit-db";
import { generateId, copy } from "./util";

export class MaplicateNode extends EventEmitter {
  constructor(ipfs, nameOrAddress) {
    super();

    this.ready = false;
    this._featureHash = {};

    const orbitdb = new OrbitDB(ipfs);

    orbitdb
      .docstore(nameOrAddress)
      .then(store => {
        this.store = store;

        this.store.events.on("replicate.progress", this._handleProgress);
        this.store.events.on("load.progress", this._handleProgress);

        return store.load();
      })
      .then(() => {
        this.emit("ready");
        this.ready = true;
      });
  }

  get mapAddress() {
    if (!this.ready) {
      return;
    }

    return this.store.address;
  }

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
    this._featureHash[copy._id] = hash;

    if (!options.disableEvent) {
      this.emit("featureAdded", featureCopy);
    }

    return featureCopy._id;
  }

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
      this.emit("featureUpdated", featureCopy);
    }
  }

  async remove(id, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error("map not ready");
    }

    if (!this._featureHash[id]) {
      return;
    }

    let feature;

    if (!options.disableEvent) {
      feature = this.store.get(id).map(e => e.payload.value)[0];
    }

    await this.store.del(id);

    if (!options.disableEvent) {
      this.emit("featureRemoved", feature);
    }
  }

  async close() {
    if (!this.store) {
      return;
    }

    await this.store.close();
  }

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
      this.emit("featureRemoved", { _id: id })
    } else if (!this._featureHash[id]) {
      this.emit("featureAdded", feature);
    } else if (this._featureHash[id] !== hash) {
      this.emit("featureUpdated", feature);
    }

    this._featureHash[id] = hash;
  }
}
