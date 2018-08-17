const { assert, expect } = require('chai');
const startServer = require('../../src/server');
const { sendRequest, sleep } = require('../../src/utils');
const { apiUrl, apiPort } = require('../../settings.json');

const apiPath = apiUrl + ':' + apiPort;

let server;

describe('/verifySignature GET', () => {
  before(async () => {
    server = await startServer(apiPort);
  });

  after(() => {
    server.close();
  });

  describe('Verifying a 1.0 cert with valid parameters', () => {
    const signer = '0xCFE2Bd9F6B83D446FFcB911b7873685B35736815';
    const msg = {"location":"Toronto, Ontario, Canada","description":"Blockchain Application Development Fundamentals","issuingAuthority":"Blockchain Learning Group Inc.","issuingAuthorityAddress":"0xcfe2bd9f6b83d446ffcb911b7873685b35736815","issuanceDate":"Wed Aug 08 2018 15:22:22 GMT-0400 (EDT)","expiryDate":"Thu Aug 08 2019 15:22:22 GMT-0400 (EDT)","recipientFirstNames":"Adam John","recipientLastName":"Lemmon","recipientEmail":"adamjlemmon@gmail.com","recipientAddress":"0xad72a42a278881311929dce42d328cd1a4568ac3"}
    const signature = { 
      "messageHash":"0x2979af472dd9b280694591dff7f6b4646983dd3808df6bda202f99b8122a6bb2",
      "r":"0x7080e3b907a8c685b126ee6c0b6f1f632d1b25d7d0c425df39deafb3c8574ff6",
      "s":"0x78fa9583156570dcd1741e2ac2f19f68e78177a694af9cb6d1257a8f275919b4",
      "signature":"0x7080e3b907a8c685b126ee6c0b6f1f632d1b25d7d0c425df39deafb3c8574ff678fa9583156570dcd1741e2ac2f19f68e78177a694af9cb6d1257a8f275919b41b",
      "v":"0x1b"
    }

    it.only('should return a 200', async () => {
      const res = await sendRequest(apiPath, `verifySignature/${signer}/${JSON.stringify(signature)}/${JSON.stringify(msg)}`);
      const { statusCode } = res;
      assert.strictEqual(statusCode, 200, 'statusCode incorrect');
    });

    it.only('should return true', async () => {
      const res = await sendRequest(apiPath, `verifySignature/${signer}/${JSON.stringify(signature)}/${JSON.stringify(msg)}`);
      const { isValid } = res.body;
      assert(isValid, 'is not valid');
    });
  });

  // const signer = '0xad72a42a278881311929dce42d328cd1a4568ac3';
  // const signature = '0xdd3eb9efee65fb1d0cbadbfd04f39744ef790cc4f7e2b4f140ea6881abf0f29f2bb28ead97a349176184dbe5b8cf49cd0309e0df3bbccc7a0a9e55868ef19f081b'
});
