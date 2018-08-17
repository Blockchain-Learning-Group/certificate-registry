const errors = require('restify-errors');
const log = require('../../logger');
const { Router } = require('restify-router');
const { countersign, getCertificates, issueCertificate } = require('./index');
const { verifySig } = require('../../utils');

const router = new Router();

/**
 * Recipient is countersigning the certificate
 * @param {String} id ID of the cert in the db
 * @param {String || Object} sig Sig depending on version of web3
 */
async function countersignCertRoute(req, res, next) {
  try {
    const { id, sig } = req.body;
    const ipfsHash = await countersign(req.body);
    res.send(200, { ipfsHash });
    return next();
  } catch (err) {
    return next(err);
  }
}

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
async function issueCertificateRoute(req, res, next) {
  try {
    // Create the cert object to be saved
    const cert = Object.assign({}, req.body.cert);
    const { dbId, ipfsHash } = await issueCertificate(cert);
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
async function getCertificatesRoute(req, res, next) {
  try {
    const certs = await getCertificates(req.params); 
    res.send(200, certs);
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Verify a signature of a cert 
 * @param {String} signer address of who should have signed the message
 * @param {String} sig raw sig, string for web3 < 1.0 and object for > 1.0
 * @param {String} message raw message that was signed
 * @return {Boolean} If it was verified
 */
async function verifySignatureRoute(req, res, next) {
  try {
    const isValid = await verifySig(req.params); 
    res.send(200, { isValid });
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.get({ path: '/getCertificates/:filter', version: '1.0.0' }, getCertificatesRoute);
router.get({ path: '/verifySignature/:signer/:sig/:msg', version: '1.0.0' }, verifySignatureRoute);
router.post({ path: '/issueCertificate', version: '1.0.0' }, issueCertificateRoute);
router.put({ path: '/countersignCert', version: '1.0.0' }, countersignCertRoute);

module.exports = router;