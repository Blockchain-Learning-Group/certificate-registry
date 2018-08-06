const Web3 = require('web3');

/**
 * Sign an object of data with a private key
 * @param {*} rawData 
 */
module.exports = async function(rawData) {
  let sig;
  const web3 = new Web3();

  // Load the private key from env
  const priv = process.env.PRIV;

  if (typeof rawData !== "string") {
    rawData = JSON.stringify(rawData);
  }

  try {
    sig = web3.eth.accounts.sign(rawData, priv);
  } catch(err) {
    throw new Error('Sig could not be generated, ensure priv is accessible');
  }

  return sig;
}