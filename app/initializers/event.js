export function initialize(application) {
  application.inject('component', 'event', 'service:event');
  application.inject('service:ipfs', 'event', 'service:event');
}

export default {
  name: 'event',
  initialize
};
