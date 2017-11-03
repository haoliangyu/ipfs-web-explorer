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
    let node = this.get('node');
    let ipfsUtil = this.get('ipfsUtil');

    return ipfsUtil.execute(node, (node) => node.object.links(multihash));
  }

});
