const ethUtil = require('ethereumjs-util');

/**
 * 
 * @param {*} msg raw message that was signed, not the hash and not the hex format 
 * @param {*} sig raw sig, hex string, 0xr,s,v
 * @param {*} signer address of the signer 
 */
const verifySignature = async (msg, sig, signer) => {
  const sigRpc = ethUtil.fromRpcSig(sig);
  const ecSig = {};

  ecSig.r = `0x${sigRpc.r.toString('hex')}`;
  ecSig.s = `0x${sigRpc.s.toString('hex')}`;
  ecSig.v = sigRpc.v;

  const isValid = await isValidSignature(msg, ecSig, signer.toLowerCase());
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

    return retrievedAddress === signerAddress
  } catch (err) {
    return false
  }
}

export default verifySignature