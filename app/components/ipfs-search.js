import Component from '@ember/component';
import isIPFS from 'npm:is-ipfs';

export default Component.extend({
  text: '',
  actions: {
    onInputFinish(text) {

      if (!isIPFS.multihash(text)) {
        console.log('Invalid multihash: ', text);
        return;
      }

      this.get('ipfs')
        .getLinks(text)
        .then((links) => this.get('onSearch')(links))
        .catch((err) => console.error(err));
    }
  }
});
