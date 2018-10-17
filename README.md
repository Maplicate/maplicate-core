# maplicate-core

[![Build Status](https://travis-ci.org/Maplicate/maplicate-core.svg?branch=master)](https://travis-ci.org/Maplicate/maplicate-core)

**maplicate-core** is a thin layer on the top of  [OrbitDB](https://github.com/orbitdb/orbit-db), a distributed peer-to-peer database, with convenient APIs for working with geographic data and mapping libraries (like [Leaflet](https://leafletjs.com/)). It is designed for building decentralized and offline-first map applications.

Each maplicate node is an [OrbitDB DocStore](https://github.com/orbitdb/orbit-db-docstore), which provides:

* full CRUD functions for map features (in GeoJSON format)
* feature level events for feature edits

## Example

``` javascript
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

import { MaplicateNode } from 'maplicate-core';

const ipfs = new IPFS();

ipfs.on('ready', () => {
  // initialize an OrbitDB instance
  const orbitdb = new OrbitDB(ipfs);

  // create a maplicate node instance with an address
  const maplicateNode = new MaplicateNode(orbitdb, 'map_address');

  maplicateNode.on('feature:added', (feature) => {
    // update your map view when a map feature is added by other peers
  });
});
```

For more details, see the [API documentation](https://maplicate.github.io/maplicate-core/) and [event guide](./docs/events.md).

To see an actual application, please take a look at [Maplicate Editor](https://github.com/Maplicate/maplicate-editor).

## Plan

Maplicate is work in progress. Its goal is to build a highly scalable and distributed map data storage, particularly for machine-generated data. Features on our roadmap:

- [ ] remove the dependency of orbit-db
- [ ] store data at different locations (local file system, cache, database) via injectable adapters
- [ ] minimize bandwith requirement for exchanging map edits
- [ ] offline support
- [ ] automatic conflict resolve
- [ ] join multiple maps
- [ ] user permission control
- [ ] bootstrap with local data and progressively load additional data
- [ ] history data retrieval

## License

MIT @ 2018
