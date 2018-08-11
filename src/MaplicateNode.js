import { EventEmitter } from 'events';
import { generate as generateId } from 'shortid';
const OrbitDB = require('orbit-db');

export class MaplicateNode extends EventEmitter {
  constructor (ipfs, nameOrAddress) {
    this.ready = false;
    this._featureHash = {};
    
    const orbitdb = new OrbitDB(ipfs);
    
    orbitdb
      .docstore(nameOrAddress)
      .then((store) => {
        this.store = store;
        
        this.store.events.on('replicate.progress', this._handleProgress);
        this.store.events.on('load.progress', this._handleProgress);
                
        return store.load();
      })
      .then(() => {
        this.emit('ready');
        this.ready = true;
      });
  }

  get mapAddress () {
    if (!this.ready) {
      return;
    }
    
    return this.store.address;
  }

  async add (feature, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error('map not ready');
    }
                
    const copy = this._copy(feature);
    
    if (!copy.properties) {
      copy.properties = {};
    }
    
    copy._id = generateId();
    
    const hash = await this.store.put(copy);
    this._featureHash[copy._id] = hash;
    
    if (!options.disableEvent) {
      this.emit('featureAdded', copy);
    }    
    
    return copy._id;
  },
  
  aysnc update (id, feature, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error('map not ready');
    }
    
    if (!this._featureHash[id]) {
      throw new Error('feature not exists');
    }
    
    const copy = this._copy(feature);
    
    if (!copy.properties) {
      copy.properties = {};
    }
    
    copy._id = generateId();
    
    const hash = await this.store.put(copy);
    this._featureHash[copy._id] = hash;
    
    if (!options.disableEvent) {
      this.emit('featureUpdated', copy);
    }   
  },
  
  async remove (id, options = { disableEvent: false }) {
    if (!this.ready) {
      throw new Error('map not ready');
    }
    
    if (!this._featureHash[id]) {
      return;
    }
    
    let feature;
    
    if (!options.disableEvent) {
      feature = this.store
        .get(id)
        .map((e) => e.payload.value)[0]
    }
    
    await this.store.del(id);
    
    if (!options.disableEvent) {
      this.emit('featureRemoved', feature);
    }
  }
  
  _handleProgress (address, hash, entry) {
    const id = entry.payload.key;
    const feature = this._copy(entry.payload.value);
    
    if (!this._featureHash[id]) {
      this.emit('featureAdded', feature);
    } else if (this._featureHash[id] !== hash) {
      this.emit('featureUpdated', feature);
    }
    
    this._featureHash[id] = hash;
  },
  
  _copy (geojson) {
    return JSON.parse(JSON.stringify(geojson));
  }
}
