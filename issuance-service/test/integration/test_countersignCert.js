const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const { sendRequest, sleep, buildCertificates } = require('../../src/utils');
const { apiUrl, apiPort } = require('../../settings.json');

const apiPath = apiUrl + ':' + apiPort;
const cert = buildCertificates()[0];

let server;
let dbId;
const sig = '0xdd3eb9efee65fb1d0cbadbfd04f39744ef790cc4f7e2b4f140ea6881abf0f29f2bb28ead97a349176184dbe5b8cf49cd0309e0df3bbccc7a0a9e55868ef19f081b';

describe('/countersignCert PUT', () => {
  before(async () => {
    server = await startServer(apiPort);
    const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
    ({ dbId } = res.body);
  });

  after(() => {
    server.close();
  });

  describe('Countersigning a cert with valid parameters', () => {
    it('should return a 200', async () => {
      const res = await sendRequest(apiPath, 'countersignCert', 'PUT', { sig, id: dbId });
      const { statusCode } = res;
      assert.strictEqual(statusCode, 200, 'statusCode incorrect');
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
