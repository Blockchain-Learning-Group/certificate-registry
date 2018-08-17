const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const ethUtil = require('ethereumjs-util');
const { recoverAddressFromSig } = require('../utils');

/**
 * Verify a signature
 * @param {*} signer 
 * @param {*} sig 
 * @param {*} msg 
 */
module.exports = async function({ signer, sig, msg }) {
  console.log(sig);

  try {
    // v1.0
    sig = JSON.parse(sig);
    console.log(sig)
    console.log('sig')
    console.log('sig')
    console.log('sig')
    const recoveredAddress = await recoverAddressFromSig(sig);  
    console.log(recoveredAddress)
    console.log(recoveredAddress)
    console.log(recoveredAddress)
    return recoveredAddress === signer;
  } catch(err) {
    // v <1.0
    console.log(err);
    console.log('err');
    console.log('err');
    console.log('err');
    console.log('err');
    // return verifyOldSig(signer, sig, msg);
  }
}

const verifyOldSig = async (address, sig, msg) => {
  const sigRpc = ethUtil.fromRpcSig(sig);
  const ecSig = {};

  ecSig.r = `0x${sigRpc.r.toString('hex')}`;
  ecSig.s = `0x${sigRpc.s.toString('hex')}`;
  ecSig.v = sigRpc.v;

  console.log(ecSig);

  const isValid = isValidSignature(msg, ecSig, address.toLowerCase());
  return isValid;
}

function isValidSignature(data, ecsig, signerAddress) {
  const dataBuffer = ethUtil.toBuffer(data)
  const msgHashBuffer = ethUtil.hashPersonalMessage(dataBuffer)
  try {
    const pubKey = ethUtil.ecrecover(
      msgHashBuffer,
      ecsig.v,
      ethUtil.toBuffer(ecsig.r),
      ethUtil.toBuffer(ecsig.s)
    )

    const retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey))

    console.log(retrievedAddress);
    console.log(retrievedAddress);
    console.log(retrievedAddress);

    return retrievedAddress === signerAddress
  } catch (err) {
    return false
  }
}