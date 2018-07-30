const argv = require('../../src/argv');
const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const { sendRequest, sleep } = require('../../src/utils');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;

describe('/createCertificate POST', () => {
  before(async () => {
    server = await startServer(serverPort);
  });

  after(() => {
    server.close();
  });

  describe('creating a class with valid parameters', () => {
    const classIpfsHash = "QmNiDqBjgKxVapuSX4TArzDa2hBAPgaPSeqCSYQtiG4kLJ";
    const recipientName = "Full name";
    const recipientAddress = "0x1";
    const issuingAuthority = "Full name";
    const issuingAuthorityAddress = "0xCFE2Bd9F6B83D446FFcB911b7873685B35736815";

    const certificate = { classIpfsHash, recipientName, recipientAddress, issuingAuthority, issuingAuthorityAddress };

    it('should return a 201', async () => {
      const res = await sendRequest(apiUrl, 'createCertificate', 'POST', certificate);
      const { statusCode } = res;
      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the id of the class in the db', async () => {
      const res = await sendRequest(apiUrl, 'createCertificate', 'POST', certificate);
      const { dbId } = res.body;
      assert.isNotNull(dbId, 'db id is not valid');
    });

    it('should push the content to ipfs and return the hash', async () => {
      const res = await sendRequest(apiUrl, 'createCertificate', 'POST', certificate);
      const { ipfsHash } = res.body;
      // multihash representation of sha256 in base58
      assert.strictEqual(ipfsHash.length, 46, 'ipfs hash length is not correct');
      expect(ipfsHash, 'ipfs hash in incorrect format').to.contain('Qm');
    });
  });
});
