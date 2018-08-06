const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const { sendRequest, sleep, buildCertificates } = require('../../src/utils');
const { apiUrl, apiPort } = require('../../settings.json');

const apiPath = apiUrl + ':' + apiPort;
const cert = buildCertificates()[0];

let server;

describe('/issueCertificate POST', () => {
  before(async () => {
    server = await startServer(apiPort);
  });

  after(() => {
    server.close();
  });

  describe('Issuing a cert with valid parameters', () => {

    it('should return a 201', async () => {
      const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
      const { statusCode } = res;
      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the id of the class in the db', async () => {
      const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
      const { dbId } = res.body;
      assert.isNotNull(dbId, 'db id is not valid');
    });

    it('should push the content to ipfs and return the hash', async () => {
      const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
      const { ipfsHash } = res.body;
      // multihash representation of sha256 in base58
      assert.strictEqual(ipfsHash.length, 46, 'ipfs hash length is not correct');
      expect(ipfsHash, 'ipfs hash in incorrect format').to.contain('Qm');
    });
  });
});
