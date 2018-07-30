const log = require('../logger');

/**
 * Sign an object of data with a private key
 * @param {*} rawData 
 * @param {*} hashingAlgo 
 */
module.exports = async function(rawData, hashingAlgo='sha256') {
  log.info({ module: 'sig' }, `Signing ${JSON.stringify(rawData)} ...`);

  // Hash the rawData
  // const hash = ...;

  // Load the private key?
  const priv = process.env.PRIV;

  // Sign the hash of the data
  // const sig = ...;
  const sig = { v: 32, r: 123, s: 123 };

  // log.info({ module: 'sig' }, `Signed ${hash} successfully.`);
  return sig;
}
