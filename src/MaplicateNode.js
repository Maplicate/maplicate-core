import { EventEmitter } from 'events';
import { generate as generateId } from 'shortid';
const OrbitDB = require('orbit-db');

export class MaplicateNode extends EventEmitter {
  constructor (ipfs, nameOrAddress) {
    this.ready = false;
    this.ipfs = ipfs;
    this.featureHash = {};
    
    const orbitdb = new OrbitDB(ipfs);
    
    orbitdb
      .docstore(nameOrAddress)
      .then((store) => {
        this.store = store;
        return store.load();
      })
      .then(() => {
        this.ready = true;
        this.emit('ready');
      });
  }

  get mapAddress () {
    if (!this.store) {
      return;
    }
    
    return this.store.address;
  }

  async add (geojson, options = { emitEvent: true }) {
    if (!this.store) {
      throw new Error('map not ready')
    }
        
    const copy = this._copy(geojson);
    
    if (!copy.properties) {
      copy.properties = {};
    }
    
    copy._id = generateId();
    
    const hash = await this.store.put(copy);
    this.featureHash[copy._id] = hash;
    
    if (options.emitEvent) {
      this.emit('featureAdded', copy);
    }    
    
    return copy._id;
  }
  
  async remove (id, options = { emitEvent: true }) {
    if (!this.featureHash[id]) {
      return;
    }
    
    let geojson;
    
    if (options.emitEvent) {
      geojson = this.store
        .get(id)
        .map((e) => e.payload.value)[0]
    }
    
    await this.store.del(id);
    
    this.emit('featureRemoved', )
  }
  
  _copy (geojson) {
    return JSON.parse(JSON.stringify(geojson));
  }
}
