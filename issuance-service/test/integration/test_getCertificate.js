const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const { sendRequest, sleep, buildCertificates } = require('../../src/utils');
const { apiUrl, apiPort } = require('../../settings.json');

const apiPath = apiUrl + ':' + apiPort;
const cert = buildCertificates()[0];
cert.recipientLastName = `testlastname${Math.random()}`;

let server;

describe('/getCertificate POST', () => {
  before(async () => {
    server = await startServer(apiPort);
    await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
  });

  after(() => {
    server.close();
  });

  describe('Getting a cert with valid parameters', () => {
    const filter = { 
      recipientLastName: cert.recipientLastName
    };

    it('should return a 200', async () => {
      const res = await sendRequest(apiPath, `getCertificates/${ JSON.stringify(filter) }`);
      const { statusCode } = res;
      assert.strictEqual(statusCode, 200, 'statusCode incorrect');
    });

    it('should return an array of 1 certificate object', async () => {
      const res = await sendRequest(apiPath, `getCertificates/${ JSON.stringify(filter) }`);
      const { body } = res;
      assert.strictEqual(body.length, 1, 'Incorrect amount of certs returned');
    });

    it('should return a cert with the correct data', async () => {
      const res = await sendRequest(apiPath, `getCertificates/${ JSON.stringify(filter) }`);
      const { body } = res;

      assert.strictEqual(body[0].recipientEmail, cert.recipientEmail, 'Incorrect email');
      assert.strictEqual(body[0].recipientFirstNames, cert.recipientFirstNames, 'Incorrect email');
      assert.isNotNull(body[0].signatures.issuingAuthoritySignture, 'Incorrect email');
    });
  });
});
