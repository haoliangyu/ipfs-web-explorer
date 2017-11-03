export function initialize(application) {
  application.inject('component', 'ipfs', 'service:ipfs');
}

export default {
  name: 'ipfs',
  initialize: initialize
};
