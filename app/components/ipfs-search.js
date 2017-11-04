import Component from '@ember/component';
import IpfsUtil from '../utils/ipfs-util';
import isIPFS from 'npm:is-ipfs';

export default Component.extend({
  text: '',
  init() {
    this._super(...arguments);

    if (!this.get('ipfsUtil')) {
      this.set('ipfsUtil', IpfsUtil.create());
    }
  },
  actions: {
    onInputFinish(text) {
      let ipfsUtil = this.get('ipfsUtil');
      let hash;

      if (isIPFS.multihash(text)) {
        hash = text;
      } else if (isIPFS.ipfsPath(text)) {
        hash = ipfsUtil.hashFromPath(text);
      } else if (isIPFS.ipfsUrl(text)) {
        hash = ipfsUtil.hashFromUrl(text);
      } else {
        console.log('Invalid IPFS hash/path/url: ', text);
        return;
      }

      this.get('ipfs')
        .getLinks(hash)
        .then((links) => this.get('onSearch')(links))
        .catch((err) => console.error(err));
    }
  }
});
