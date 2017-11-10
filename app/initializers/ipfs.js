export function initialize(application) {
  application.inject('component', 'ipfs', 'service:ipfs');
  application.inject('route', 'ipfs', 'service:ipfs');
  application.inject('controller', 'ipfs', 'service:ipfs');
}

export default {
  name: 'ipfs',
  initialize: initialize
};
