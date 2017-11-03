import { test } from 'qunit';
import moduleForAcceptance from 'ipfs-explorer/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | show app');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
