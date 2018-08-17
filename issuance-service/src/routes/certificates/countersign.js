const db = require('../../db/api');
const errors = require('restify-errors');
const { ipfs } = require('../../utils');

/**
 * Recipient is countersigning the certificate
 * @param {String} id ID of the cert in the db
 * @param {String || Object} sig Sig depending on version of web3, < v1.0 string <= v1.0 object
 */
module.exports = async function({ id, sig }) {
    const filter = { id };

    // Query db for the given certs
    const certs = await (await db.getObject(filter, 'certificates')).toArray();

    if (certs.length !== 1) {
        throw new errors.BadRequest(`DB returned 2 records with the ID: ${id}`);
    }

    // Update the cert locally with the new sig
    const cert = certs[0]
    const { signatures } = cert;
    signatures.recipientSignature = sig;
    cert.signatures = signatures;

    // Push to ipfs with sig
    const ipfsHash = await ipfs.addContentToIpfs(cert);

    // Update the db record with latest ipfs hash and sig
    const update = { signatures, ipfsHash };
    const { replaced } = await db.updateObject(filter, 'certificates', update);

    if (replaced !== 1) {
        throw new errrors.BadRequest(`ID: ${id} could not be updated...`);
    }

    return ipfsHash;
}