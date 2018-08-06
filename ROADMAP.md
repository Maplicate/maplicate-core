# Roadmap

This is the roadmap for the maplicate-core.

## Create/Join a Network

The maplicate-core library has two methods to create a new or an existing maplicate network:

``` javascript
const IPFS = require('ipfs');
const maplicate = require('maplicate-core');

// create an IPFS node
const ipfs = new IPFS();

// create a maplicate network and return a node class
const name = 'network name';
const nodeA = maplicate.create(ipfs, name);

// join an existing maplicate network and return a node class
const address = 'network address';
const nodeB = maplicate.join(ipfs, address);
```

## `MaplicateNode` Class

`MaplicateNode` class is a node in the maplicate network. It is directly connected with other nodes in the same network and is able to share geospatial data/edit. When many nodes connect to each other, they form a usable network.

### Properties

The class should have the following properties:

* `networkAddress`

  The network address of the maplicate network.

* `ipfsAddress`

  The IPFS node address that the current node is using.

### Methods

* `add(feature: GeoJSON): Promise<string>`

* `update(feature: GeoJSON): Promise`

* `delete(id: string): Promise`

* `get(id: string): Promise<IFeature>`

### Events

The class should have the following events:

* `ready`

  Indicates the maplicate node is connected to the network and is ready to use.

* `replicate`

  Indicates the data replication happens and the node starts downloading data from the network.

* `replicated`

  Indicates the data replication is finished and the node is synchronized all data from the network.

* `featureCreated`

  Indicates a map feature is created. The feature is emitted as the event data.

* `featureEdited`

  Indicates a map feature is edited. The feature is emitted as the event data.

* `featureDeleted`

  Indicates a map feature is deleted. The feature is emitted as the event data.

The `MaplicateNode` is also an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class so these evnets are accessible with:

``` javascript
node.once('replicated', (feature: IFeature) => {
  // do your stuff but only once
});

node.on('featureCreated', (feature: IFeature) => {
  // do your stuff about the feature created
});

node.off('featureCreated', (feature: IFeature) => {
  // remove an event handler
})
```

## `IFeature` Interface

An `Feature` object represents a map feature in the network.

``` javascript
{
  "_hash": "content_hash",
  "_id": "feature_id",
  "geometry": {},
  "properties": {}
}
```

`geometry` and `properties` are standard GeoJSON properties.

`_hash` is a MD5 hash string calculated with the following logic:

``` javascript
const md5 = require('md5');
const geoHash = md5(JSON.stringify(feature.geometry));
const propHash = md5(JSON.stringify(feature.properties));

feature._hash = md5(geoHash + propHash);
```  

`_id` is a unique id across for this feature.
