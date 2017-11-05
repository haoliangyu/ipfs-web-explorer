import Service from '@ember/service';
import IpfsUtil from '../utils/ipfs-util';
import IPFS from 'npm:ipfs';

export default Service.extend({

  name: 'ipfs',

  init() {
    this.set('ipfsUtil', IpfsUtil.create());

    let node = new IPFS({
      repo: String(Math.random() + Date.now()),
      start: false
    });

    node.on('ready', () => {
      this.set('node', node);
      this.get('event').emit('ipfs:ready');
    });
  },

  getLinks(multihash) {
    return this.runNode((node) => node.object.links(multihash));
  },

  runNode(hanlder) {
    let node = this.node;

    return node.start()
      .then(() => hanlder(node))
      .then((result) => {
        node.stop();
        return result;
      })
      .catch((err) => {
        node.stop();
        throw err;
      });
  },

});
