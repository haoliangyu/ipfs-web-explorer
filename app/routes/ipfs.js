import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {

    if (!params.sub_path) {
      return Promise.resolve({
        status: 'error',
        message: 'IPFS path is not defined.'
      });
    }

    let pathNames = params.sub_path.split('/');
    let multihash = pathNames[0];

    if (!this.get('ipfs').initialized) {
      return Promise.resolve({
        status: 'initializing',
        multihash,
        pathNames
      });
    }

    return this.get('ipfs')
      .getLinks(multihash)
      .then((links) => {
        return {
          status: 'success',
          multihash,
          links,
          pathNames
        };
      });
  }
});
