import { computed } from '@ember/object';
import Component from '@ember/component';
import prettyBytes from 'npm:pretty-bytes';

export default Component.extend({

  /**
   * IPFS links (raw data)
   * @type {Array}
   */
  links: null,

  displayLinks: computed('links.[]', function() {
    let links = this.get('links');
    let display = links.map((link) => {
      return {
        name: link.name,
        size: prettyBytes(link.size),
        multihash: link.multihash.toString('hex')
      }
    });

    return display;
  })
});
