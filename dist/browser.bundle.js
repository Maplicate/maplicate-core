"use strict";function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}Object.defineProperty(exports,"__esModule",{value:!0});var eventemitter3=createCommonjsModule(function(e){var t=Object.prototype.hasOwnProperty,r="~";function n(){}function o(e,t,r){this.fn=e,this.context=t,this.once=r||!1}function s(e,t,n,s,a){if("function"!=typeof n)throw new TypeError("The listener must be a function");var i=new o(n,s||e,a),u=r?r+t:t;return e._events[u]?e._events[u].fn?e._events[u]=[e._events[u],i]:e._events[u].push(i):(e._events[u]=i,e._eventsCount++),e}function a(e,t){0==--e._eventsCount?e._events=new n:delete e._events[t]}function i(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(r=!1)),i.prototype.eventNames=function(){var e,n,o=[];if(0===this._eventsCount)return o;for(n in e=this._events)t.call(e,n)&&o.push(r?n.slice(1):n);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},i.prototype.listeners=function(e){var t=r?r+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var o=0,s=n.length,a=new Array(s);o<s;o++)a[o]=n[o].fn;return a},i.prototype.listenerCount=function(e){var t=r?r+e:e,n=this._events[t];return n?n.fn?1:n.length:0},i.prototype.emit=function(e,t,n,o,s,a){var i=r?r+e:e;if(!this._events[i])return!1;var u,c,f=this._events[i],p=arguments.length;if(f.fn){switch(f.once&&this.removeListener(e,f.fn,void 0,!0),p){case 1:return f.fn.call(f.context),!0;case 2:return f.fn.call(f.context,t),!0;case 3:return f.fn.call(f.context,t,n),!0;case 4:return f.fn.call(f.context,t,n,o),!0;case 5:return f.fn.call(f.context,t,n,o,s),!0;case 6:return f.fn.call(f.context,t,n,o,s,a),!0}for(c=1,u=new Array(p-1);c<p;c++)u[c-1]=arguments[c];f.fn.apply(f.context,u)}else{var l,h=f.length;for(c=0;c<h;c++)switch(f[c].once&&this.removeListener(e,f[c].fn,void 0,!0),p){case 1:f[c].fn.call(f[c].context);break;case 2:f[c].fn.call(f[c].context,t);break;case 3:f[c].fn.call(f[c].context,t,n);break;case 4:f[c].fn.call(f[c].context,t,n,o);break;default:if(!u)for(l=1,u=new Array(p-1);l<p;l++)u[l-1]=arguments[l];f[c].fn.apply(f[c].context,u)}}return!0},i.prototype.on=function(e,t,r){return s(this,e,t,r,!1)},i.prototype.once=function(e,t,r){return s(this,e,t,r,!0)},i.prototype.removeListener=function(e,t,n,o){var s=r?r+e:e;if(!this._events[s])return this;if(!t)return a(this,s),this;var i=this._events[s];if(i.fn)i.fn!==t||o&&!i.once||n&&i.context!==n||a(this,s);else{for(var u=0,c=[],f=i.length;u<f;u++)(i[u].fn!==t||o&&!i[u].once||n&&i[u].context!==n)&&c.push(i[u]);c.length?this._events[s]=1===c.length?c[0]:c:a(this,s)}return this},i.prototype.removeAllListeners=function(e){var t;return e?(t=r?r+e:e,this._events[t]&&a(this,t)):(this._events=new n,this._eventsCount=0),this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prefixed=r,i.EventEmitter=i,e.exports=i});if("production"!==process.env.NODE_ENV&&("undefined"==typeof self||!self.crypto&&!self.msCrypto))throw new Error("Your browser does not have secure random generator. If you don’t need unpredictable IDs, you can use nanoid/non-secure.");var crypto=self.crypto||self.msCrypto,url="_~getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ",index_browser=function(e){e=e||21;for(var t="",r=crypto.getRandomValues(new Uint8Array(e));0<e--;)t+=url[63&r[e]];return t};function generateId(){return index_browser()}function copy(e){return JSON.parse(JSON.stringify(e))}var asyncToGenerator=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(o,s){try{var a=t[o](s),i=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(i).then(function(e){n("next",e)},function(e){n("throw",e)});e(i)}("next")})}},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},MaplicateNode=function(e){function t(e,r){classCallCheck(this,t);var n=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.ready=!1,n._featureHash={},e.docstore(r).then(function(e){return n.store=e,n.store.events.on("replicate.progress",n._handleProgress),n.store.events.on("load.progress",n._handleProgress),e.load()}).then(function(){n.emit("ready"),n.ready=!0}),n}return inherits(t,eventemitter3),createClass(t,[{key:"get",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.store.get(t).map(function(e){return e.payload.value})[0]);case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"add",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{disableEvent:!1};return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.ready){e.next=2;break}throw new Error("map not ready");case 2:return(r=copy(t)).properties||(r.properties={}),r._id||(r._id=generateId()),e.next=7,this.store.put(r);case 7:return n=e.sent,this._featureHash[copy._id]=n,o.disableEvent||this.emit("featureAdded",r),e.abrupt("return",r._id);case 11:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n,o,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{disableEvent:!1};return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.ready){e.next=2;break}throw new Error("map not ready");case 2:if(this._featureHash[t]){e.next=4;break}throw new Error("feature not exists");case 4:return(n=copy(r)).properties||(n.properties={}),n._id=t,e.next=9,this.store.put(n);case 9:o=e.sent,this._featureHash[n._id]=o,s.disableEvent||this.emit("featureUpdated",n);case 12:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()},{key:"remove",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{disableEvent:!1};return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.ready){e.next=2;break}throw new Error("map not ready");case 2:if(this._featureHash[t]){e.next=4;break}return e.abrupt("return");case 4:return r=void 0,n.disableEvent||(r=this.store.get(t)[0]),e.next=8,this.store.del(t);case 8:n.disableEvent||this.emit("featureRemoved",r);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"close",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.store){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.store.close();case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"drop",value:function(){var e=asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.store){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.store.drop();case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"_handleProgress",value:function(e,t,r){var n=r.payload.key,o=copy(r.payload.value);o?this._featureHash[n]?this._featureHash[n]!==t&&this.emit("featureUpdated",o):this.emit("featureAdded",o):this.emit("featureRemoved",{_id:n}),this._featureHash[n]=t}},{key:"mapAddress",get:function(){if(this.ready)return this.store.address}}]),t}();exports.MaplicateNode=MaplicateNode;
