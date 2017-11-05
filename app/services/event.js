import Service from '@ember/service';
import EventEmitter from 'npm:eventemitter3';

export default Service.extend({
  name: 'event',

  init() {
    this.set('EE', new EventEmitter());
  },

  once(event, handler, context) {
    this.get('EE').once(event, handler, context);
  },

  on(event, handler, context) {
    this.get('EE').on(event, handler, context);
  },

  off(event, handler, context) {
    this.get('EE').removeListener(event, handler, context);
  },

  emit(event) {
    this.get('EE').emit(event);
  }
});
