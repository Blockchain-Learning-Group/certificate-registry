const db = require('../../db/api');
const errors = require('restify-errors');
const { ipfs, signData, verifySig } = require('../../utils');

/**
 * Issue a new certificate to a successful student
 * @param {Object} cert 
 *  @param {String} cert.description 
 *  @param {Date} cert.expiryDate 
 *  @param {Date} cert.issuanceDate 
 *  @param {String} cert.recipient.firstNames 
 *  @param {String} cert.recipient.lastName
 *  @param {String} cert.recipient.email
 *  @param {Address} cert.recipient.address ETH Address
 *  @param {String} cert.issuingAuthority Full name
 *  @param {Address} cert.issuingAuthorityAddress ETH Address
 */
module.exports = async function (certificate) {
    // Create the cert object to be saved
    const cert = Object.assign({}, certificate);
    
    // Sign the cert with the issuing authority key
    const sig = await signData(cert);
    
    cert.signatures = {};
    // cert.verificationLink = ''; TODO consider way to verify on-chain

    // Verify the sig against the issuing authority
    if (!verifySig(cert.issuingAuthorityAddress, sig)) {
      throw new errors.BadRequest('Generated signature, does not match the issuing authority.');
    }

    // Add sigs to the cert and leave a placeholder for the recipient to counter sign
    cert.signatures.issuingAuthoritySignature = sig;
    cert.signatures.recipientSignature = null;

    // Push raw data to ipfs
    const ipfsHash = await ipfs.addContentToIpfs(cert);
    cert.ipfsHash = ipfsHash;

    // Store resultant in db
    const dbId = (await db.insertObject(cert, 'certificates')).id;
    
    return { dbId, ipfsHash };
}