# Maplicate Node Events

The `MaplicateNode` class extends the `EventEmitter` class from the [eventemitter3](https://github.com/primus/EventEmitter3) library, which supports most common event functions and features.

``` javascript
maplicateNode.on('feature:created', (feature) => {
  // do something with the map feature (GeoJSON)
});
```

## Events

* `ready`

indicates the maplicate node is ready to use

* `feature:added`

indicates a new map feature is added

* `feature:updated`

indicates an existing map feature is updated

* `feature:removed`

indicates an existing map feature is removed
