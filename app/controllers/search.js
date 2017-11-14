import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    let that = this;

    this.get('event')
      .on('ipfs:search', (multihash) => {
        that.transitionToRoute('ipfs', multihash);
      });
  }
});
