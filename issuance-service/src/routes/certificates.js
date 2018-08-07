const db = require('../db/api');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');
const merkle = require('merkle');
const { ipfs, signData, verifySig } = require('../utils');

const router = new Router();

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
async function issueCertificate(req, res, next) {
  try {
    // Create the cert object to be saved
    const cert = Object.assign({}, req.body.cert);
    
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

    res.send(201, { dbId, ipfsHash });
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a certificate for a given identifier
 * @param {String} filter JSON.stringified objects, specific query for the certificates db
 * @return {Object} cert when it may be found
 */
async function getCertificates(req, res, next) {
  try {
    const filter = JSON.parse(req.params.filter);

    // Query db for the given certs
    const cursor = await db.getObject(filter, 'certificates');
    const certs = await cursor.toArray();

    res.send(200, certs);
    return next();
  } catch (err) {
    return next(err);
  }
}
// ROUTES
router.get({ path: '/getCertificates/:filter', version: '1.0.0' }, getCertificates);
router.post({ path: '/issueCertificate', version: '1.0.0' }, issueCertificate);

module.exports = router;
