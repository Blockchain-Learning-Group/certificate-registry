const Web3 = require('web3');
const { recoverAddressFromSig } = require('../utils');

/**
 * Verify a signature
 * @param {*} address 
 * @param {*} sig 
 */
module.exports = async function(address, sig) {
  const recoveredAddress = recoverAddressFromSig(sig);  
  return recoveredAddress === address;
}

