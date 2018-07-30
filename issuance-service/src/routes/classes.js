const db = require('../db/api');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');
const merkle = require('merkle');
const { ipfs } = require('../utils');

const router = new Router();

/**
 * Create a new class record
 * @param {Array} studentAddresses List of eth addresses 
 * @param {Array} studentNames List of full names
 * @param {String} description Short description of the course completed
 * @param {String} location Where the course took place
 * @param {Timestamp} expiryDate When the certification of this course expires
 */
async function createClass(req, res, next) {
  try {
    const { studentAddresses, studentNames, description, location, expiryDate } = req.body;
    
    // Compute merkle tree of student addresses
    const tree = merkle('sha256').sync(studentAddresses);
    const merkleRoot = tree.root();

    // Push raw data to ipfs
    req.body[merkleRoot] = merkleRoot;
    const ipfsHash = await ipfs.addContentToIpfs(req.body);

    // Store resultant in db
    req.body[ipfsHash] = ipfsHash;
    const dbId = (await db.insertObject(req.body, 'classes')).id;

    const response = { merkleRoot, ipfsHash, dbId };

    res.send(201, response);
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/createClass', version: '1.0.0' }, createClass);

module.exports = router;



  