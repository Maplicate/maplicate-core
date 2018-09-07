require("babel-polyfill");

const IPFS = require("ipfs");
const IPFSFactory = require("ipfsd-ctl");
const OrbitDB = require("orbit-db");
const { expect } = require("chai");
const { MaplicateNode } = require("../src/MaplicateNode");

describe('Maplicate Node', () => {
  let ipfsNode, orbitNode;

  beforeEach((done) => {
    const factory = IPFSFactory.create({ type: "proc" });
    const options = {
      exec: IPFS,
      // TODO: this is not supported yet. see https://github.com/ipfs/js-ipfsd-ctl/issues/282
      config: {
        EXPERIMENTAL: {
          pubsub: true
        }
      }
    };

    factory.spawn(options, (err, ipfsd) => {
      ipfsNode = ipfsd;
      orbitNode = new OrbitDB(ipfsd.api)
      done();
    });
  });

  afterEach(async () => {
    await orbitNode.stop();

    ipfsNode.stop((err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  it('should add a map feature', (done) => {
    const node = new MaplicateNode(orbitNode, 'test');

    node.once("ready", async () => {
      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0]
        }
      };

      const featureId = await node.add(feature);
      expect(featureId).to.be.a("string");

      done();
    });
  });
});
