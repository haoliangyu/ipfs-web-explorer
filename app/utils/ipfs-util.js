import EmberObject from '@ember/object';

export default EmberObject.extend({

  multihashFromPath(path) {
    return path.split('/')[2];
  },

  multihashFromUrl(url) {
    let parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/')[2];
  }

});
