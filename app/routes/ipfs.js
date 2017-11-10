import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let pathNames = params.sub_path.split('/');
    let multihash = pathNames[0];

    return this.get('ipfs')
      .getLinks(multihash)
      .then((links) => {
        console.log(links);

        return {
          multihash,
          links,
          pathNames
        };
      });
  }
});
