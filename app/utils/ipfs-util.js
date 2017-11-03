import EmberObject from '@ember/object';

export default EmberObject.extend({

  execute(node, hanlder) {
    return node.start()
      .then(() => hanlder(node))
      .then((result) => {
        node.stop();
        return result;
      })
      .catch((err) => {
        node.stop();
         throw err;
      });
  }

});
