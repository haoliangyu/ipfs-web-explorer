import Controller from '@ember/controller';

export default Controller.extend({

  links: [],

  pathnames: [],

  status: 'success',

  init() {
  },

  modelChanged: function() {
    let model = this.get('model');
    let multihash = model.multihash;

    this.set('status', model.status);

    if (model.status === 'initializing') {
      this.get('event')
        .once('ipfs:initialized', () => {
          this.get('ipfs')
            .getLinks(multihash)
            .then((links) => {
              this.set('status', 'success');
              this.set('links', links);
              this.set('pathnames', [multihash]);
            });
        });
    } else if (model.status === 'success') {
      this.set('links', model.links);
      this.set('pathnames', [multihash]);
    }
  }.observes('model')
});
