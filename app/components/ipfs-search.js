import Component from '@ember/component';
import IpfsUtil from '../utils/ipfs-util';
import isIPFS from 'npm:is-ipfs';

export default Component.extend({

  /**
   * Search text
   * @type {String}
   */
  text: '',

  /**
   * Search error
   * @type {String}
   */
  searchError: '',

  /**
   * Indicates whether the IPFS node is being initialized
   * @type {Boolean}
   */
  ipfsInitializing: true,

  init() {
    let that = this;

    this._super(...arguments);
    this.set('ipfsUtil', IpfsUtil.create());

    this.get('event')
      .once('ipfs:initialized', () => {
        that.set('ipfsInitializing', false);
      });
  },

  actions: {
    openHash() {
      let ipfsUtil = this.get('ipfsUtil');
      let text = this.get('text');
      let multihash;

      this.set('searchError', '');

      if (isIPFS.multihash(text)) {
        multihash = text;
      } else if (isIPFS.ipfsPath(text)) {
        multihash = ipfsUtil.multihashFromPath(text);
      } else if (isIPFS.ipfsUrl(text)) {
        multihash = ipfsUtil.multihashFromUrl(text);
      } else {
        this.set('searchError', 'This is not a recognizable IPFS url, path, or multihash.');
        return;
      }

      this.get('event').emit('ipfs:search', multihash);
    }
  }
});
