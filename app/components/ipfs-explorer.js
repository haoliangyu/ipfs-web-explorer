import Component from '@ember/component';

export default Component.extend({

  /**
   * IPFS objects for current multihash
   * @type {Array}
   */
  objectLinks: [],

  /**
   * Path names for current multihash
   * @type {Array}
   */
  pathNames: [],

  /**
   * Indicates whether the IPFS node has been initialized
   * @type {Boolean}
   */
  ipfsInitialized: false,

  /**
   * Indicates whether to show search result
   * @type {Boolean}
   */
  showSearchResult: false,

  init() {
    let that = this;

    this._super(...arguments);

    this.get('event')
      .once('ipfs:ready', () => {
        that.set('ipfsInitialized', true);
      });
  },

  actions: {
    afterSearch(result) {

      console.log(result.result);
      this.set('pathNames', [result.hash]);
      this.set('objectLinks', result.result);
      this.set('showSearchResult', true);
    }
  },
});
