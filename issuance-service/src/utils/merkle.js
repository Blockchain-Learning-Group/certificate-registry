const log = require('../logger');
const merkle = require('merkle');

/**
 * Create a merkle tree from an array of data.
 * @param {Array} dataArray Array of content to create a merkle tree from.
 * @param {String} hashingAlgo Hash algorithm to use, default sha256
 * @returns {String} Merkle root
 */
async function createTree(dataArray, hashingAlgo='sha256') {
  log.info({ module: 'merkle' }, `Creating a merkle tree for ${dataArray.length} items...`);

  const tree = merkle(hashingAlgo).sync(dataArray);
  const root = tree.root();

  log.info({ module: 'merkle' }, `Merkle tree created root: ${root}`);
  return root;
}

module.exports = {
  createTree,
}
