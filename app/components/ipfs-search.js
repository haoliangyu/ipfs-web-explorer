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

  init() {
    this._super(...arguments);
    this.set('ipfsUtil', IpfsUtil.create());
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
      let hash;

      if (isIPFS.multihash(text)) {
        hash = text;
      } else if (isIPFS.ipfsPath(text)) {
        hash = ipfsUtil.hashFromPath(text);
      } else if (isIPFS.ipfsUrl(text)) {
        hash = ipfsUtil.hashFromUrl(text);
      } else {
        this.set('searchBoxFocused', false);
        this.set('searchError', 'This is not a recognizable IPFS url, path, or multihash.');
        return;
      }

      this.get('event').emit('ipfs:search', hash);

      // this.get('ipfs')
      //   .getLinks(hash)
      //   .then((links) => {
      //     let result = {
      //       hash,
      //       result: links
      //     };
      //
      //     this.get('afterSearch')(result)
      //   })
      //   .catch((err) => console.error(err));
    }
  }
});
