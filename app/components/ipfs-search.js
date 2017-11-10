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
   * Inidicate whet
   * @type {Boolean}
   */
  searchBoxFocused: false,

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
      .once('ipfs:ready', () => {
        that.set('ipfsInitializing', false);
      });
  },

  actions: {
    onFocus() {
      this.set('searchBoxFocused', true);
      this.set('searchError', null);
    },

    onBlur() {
      this.set('searchBoxFocused', false);
      this.set('searchError', null);
    },

    onInputFinish(text) {
      let ipfsUtil = this.get('ipfsUtil');
      let multihash;

      if (isIPFS.multihash(text)) {
        multihash = text;
      } else if (isIPFS.ipfsPath(text)) {
        multihash = ipfsUtil.multihashFromPath(text);
      } else if (isIPFS.ipfsUrl(text)) {
        multihash = ipfsUtil.multihashFromUrl(text);
      } else {
        this.set('searchBoxFocused', false);
        this.set('searchError', 'This is not a recognizable IPFS url, path, or multihash.');
        return;
      }

      this.get('event').emit('ipfs:search', multihash);
    }
  }
});
