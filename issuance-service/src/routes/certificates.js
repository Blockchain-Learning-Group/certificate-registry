const db = require('../db/api');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');
const merkle = require('merkle');
const { ipfs, signData, verifySig } = require('../utils');

const router = new Router();

/**
 * Create a new class record
 * @param {String} classIpfsHash Location of the information on the class this cert is regarding
 * @param {String} recipientName Full name
 * @param {Address} recipientAddress ETH Address
 * @param {String} issuingAuthority Full name
 * @param {Address} issuingAuthorityAddress ETH Address
 */
async function createCertificate(req, res, next) {
  try {
    const { classIpfsHash, issuingAuthorityAddress } = req.body;
    
    // Get the class data from ipfs
    const data = await ipfs.getContentFromIpfs(classIpfsHash);

    // Create the cert object to be saved
    const cert = Object.assign({}, req.body);
    cert.expiryDate = data.expiryDate;
    cert.merkleRoot = data.merkleRoot;
    cert.signatures = {};
    cert.verificationLink = '';

    // Compute merkle proof for this address 
    // const tree = merkle('sha256').sync(studentAddresses);
    // const merkleRoot = tree.root();

    // Sign the cert with the issuing authority key
    const sig = await signData(data);

    // Verify the sig against the issuing authority
    if (!verifySig(issuingAuthorityAddress, sig)) {
      throw new errors.BadRequest('Generated signature, does not match the issuing authority.');
    }

    // Add to the cert and leave a placeholder for the recipient to counter sign
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

// ROUTES
router.post({ path: '/createCertificate', version: '1.0.0' }, createCertificate);

module.exports = router;
