import Web3 from 'web3';
import verifySig from './VerifySignature';
import countersignCert from '../stores/countersignCert';

async function countersign({ id, signatures, recipientAddress }) {
  // If metamask enabled
  const web3 = await initWeb3();

  if (web3) {
    const signer = web3.eth.accounts[0];
    const { message } = signatures.issuingAuthoritySignature;

    // Metamask only supports callbacks
    return new Promise((resolve, reject) => {
      web3.personal.sign(web3.toHex(message), signer, async (err, sig) => {
        if (err) {
          reject(err);
        } else {
          if (await verifySig(message, sig, recipientAddress)) {
            resolve(await countersignCert(sig, id));
          } else {
            alert(`oops... does not look like the signature matched the recipient key!  Check if the correct Metamask acount is active.\nKey: ${recipientAddress}`);
            reject();
          }
        }
      })
    });
  }
}

// NOTE we are only using Metamask!
const initWeb3 = () => {
  if (typeof window['web3'] === 'object' && window['web3'].hasOwnProperty('currentProvider')) {
    return new Web3(window['web3'].currentProvider);
  } else {
    alert('No Web3 provider detected... Please ensure Metamask in installed and unlocked!');
  }
};

export default countersign