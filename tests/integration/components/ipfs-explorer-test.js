import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ipfs-explorer', 'Integration | Component | ipfs explorer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ipfs-explorer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ipfs-explorer}}
      template block text
    {{/ipfs-explorer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
