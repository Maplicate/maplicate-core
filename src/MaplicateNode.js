class MaplicateNode {
  constructor (store) {
    this.store = store;
  }

  get mapAddress() {
    return this.store.address;
  }

  async add (geojson) {
    if (!geojson.properties) {
      geojson.properties = {};
    }
  }
}
