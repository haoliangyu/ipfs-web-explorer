import ipfsUtil from 'ipfs-web-explorer/utils/ipfs-util';
import { module, test } from 'qunit';

module('Unit | Utility | ipfs-util');

test('hashFromPath() should extract a multihash from an IPFS path.', (assert) => {
  let ipfs = ipfsUtil.create();
  let path = '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';
  let hash = 'QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';

  assert.equal(ipfs.hashFromPath(path), hash);
});

test('hashFromUrl() should extract a multihash from an IPFS url.', (assert) => {
  let ipfs = ipfsUtil.create();
  let url = 'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';
  let hash = 'QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o';

  assert.equal(ipfs.hashFromUrl(url), hash);
});
