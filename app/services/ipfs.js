import Service from '@ember/service';
import IpfsUtil from '../utils/ipfs-util';
import IPFS from 'npm:ipfs';

export default Service.extend({

  name: 'ipfs',

  init() {
    if (!this.get('ipfsUtil')) {
      this.set('ipfsUtil', IpfsUtil.create());
    }

    if (!this.get('node')) {
      let node = new IPFS({
        start: false
      });

      node.on('ready', () => console.log('IPFS node initialized'));

      this.set('node', node);
    }
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
