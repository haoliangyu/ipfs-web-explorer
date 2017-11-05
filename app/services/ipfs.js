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
        repo: String(Math.random() + Date.now())
      });

      node.on('ready', () => {
        console.log('IPFS node initialized');
        this.set('node', node);
      });
    }
  },

  getLinks(multihash) {
    let node = this.get('node');

    return node.object.links(multihash);
  }

});
