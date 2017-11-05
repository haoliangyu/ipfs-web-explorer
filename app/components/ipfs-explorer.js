import Component from '@ember/component';

export default Component.extend({
  objectLinks: [],
  actions: {
    updateLinks(links) {
      this.set('objectLinks', links);
    }
  }
});
