const argv = require('../../src/argv');
const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const nock = require('nock');
const { sendRequest, sleep } = require('../../src/utils');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;

describe('/createClass POST', () => {
  before(async () => {
    server = await startServer(serverPort);
  });

  after(() => {
    server.close();
  });

  describe('creating a class with valid parameters', () => {
    const studentAddresses = [
      '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
      '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
      '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
      '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    ];

    const studentNames = [
      'Adam Lemmon',
      'Adam Lemmon',
      'Adam Lemmon',
      'Adam Lemmon',
    ];

    const location = 'toronto CA';
    const description = '3 day bootcamp';
    // 1 Year
    const date = new Date();
    const expiryDate = date.setDate(date.getDate() + 365);

    const newClass = { studentAddresses, studentNames, location, description, expiryDate };

    it('should return a 201', async () => {
      const res = await sendRequest(apiUrl, 'createClass', 'POST', newClass);
      const { statusCode } = res;

      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the id of the class in the db', async () => {
      const res = await sendRequest(apiUrl, 'createClass', 'POST', newClass);
      const { dbId } = res.body;
      assert.isNotNull(dbId, 'root is not valid');
    });

    it('should return the merkle root', async () => {
      const res = await sendRequest(apiUrl, 'createClass', 'POST', newClass);
      const { merkleRoot } = res.body;

      assert.isNotNull(merkleRoot, 'root is not valid');
      // Sha256 = 32 bytes = 64 chars
      assert.strictEqual(merkleRoot.length, 64, 'root is not of valid length');
    });

    it('should push the content to ipfs and return the hash', async () => {
      const res = await sendRequest(apiUrl, 'createClass', 'POST', newClass);
      const { ipfsHash } = res.body;

      // multihash representation of sha256 in base58
      assert.strictEqual(ipfsHash.length, 46, 'ipfs hash length is not correct');
      expect(ipfsHash, 'ipfs hash in incorrect format').to.contain('Qm');
    });
  });
});
