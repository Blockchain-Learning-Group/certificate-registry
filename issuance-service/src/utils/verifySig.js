const log = require('../logger');

/**
 * Verify a signature
 * @param {*} address 
 * @param {*} sig 
 */
module.exports = async function(data, address, sig) {
  log.info({ module: 'sig' }, `Verifying signature against address: ${address}...`);

  // verification step
  // gen hash and verify sig
  
  return true;
}
