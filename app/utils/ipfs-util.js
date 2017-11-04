import EmberObject from '@ember/object';

export default EmberObject.extend({

  hashFromPath(path) {
    return path.split('/')[2];
  },

  hashFromUrl(url) {
    let parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/')[2];
  }

});
