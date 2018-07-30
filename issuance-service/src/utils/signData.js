const Web3 = require('web3');

/**
 * Sign an object of data with a private key
 * @param {*} rawData 
 */
module.exports = async function(rawData) {
  // Load the private key from env
  const priv = process.env.PRIV;

  // Sign the data
  const web3 = new Web3();
  const sig = web3.eth.accounts.sign(JSON.stringify(rawData), priv);

  return sig;
}