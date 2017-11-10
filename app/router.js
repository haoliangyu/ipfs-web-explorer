import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('search');
  this.route('ipfs', { path: '/ipfs/:sub_path' });
});

export default Router;
