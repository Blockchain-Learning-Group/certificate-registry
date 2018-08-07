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


// const EthereumTx = require('ethereumjs-tx');
// const ethUtil = require('ethereumjs-util');
// // const verifySig = async (msg, sig, address) => {
// //   const sigRpc = ethUtil.fromRpcSig(sig);
// //   const ecSig = {};

// //   ecSig.r = `0x${sigRpc.r.toString('hex')}`;
// //   ecSig.s = `0x${sigRpc.s.toString('hex')}`;
// //   ecSig.v = sigRpc.v;

// //   console.log(ecSig);

// //   const isValid = isValidSignature(msg, ecSig, address.toLowerCase());
// //   return isValid;
// // }

// function isValidSignature(data, ecsig, signerAddress) {
//   const dataBuffer = ethUtil.toBuffer(data)
//   const msgHashBuffer = ethUtil.hashPersonalMessage(dataBuffer)
//   try {
//     const pubKey = ethUtil.ecrecover(
//       msgHashBuffer,
//       ecsig.v,
//       ethUtil.toBuffer(ecsig.r),
//       ethUtil.toBuffer(ecsig.s)
//     )

//     const retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey))

//     console.log(retrievedAddress);
//     console.log(retrievedAddress);
//     console.log(retrievedAddress);

//     return retrievedAddress === signerAddress
//   } catch (err) {
//     return false
//   }
// }