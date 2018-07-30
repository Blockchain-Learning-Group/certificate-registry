const Web3 = require('web3');

/**
 * Verify a signature
 * @param {Object} sig {message, messageHash, v, r, s, sig} 
 */
module.exports = async function(sig) {
  const web3 = new Web3();
  const address = web3.eth.accounts.recover(sig);
  return address;
}

