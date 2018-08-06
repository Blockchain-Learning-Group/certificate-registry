// const { assert, expect } = require('chai');
// const startServer = require('../../src/server');
// const { sendRequest, sleep, buildCertificates } = require('../../src/utils');
// const { apiUrl, apiPort, ipfsUrl, ipfsPort } = require('../../settings.json');
// const nock = require('nock');

// const apiPath = apiUrl + ':' + apiPort;
// const ipfsPath = ipfsUrl + ':' + ipfsPort;
// const cert = buildCertificates()[0];

// console.log(ipfsPath);
// console.log(ipfsPath);
// console.log(ipfsPath);

// let server;

// describe('/issueCertificate POST', () => {
//   before(async () => {
//     server = await startServer(apiPort);
//   });

//   after(() => {
//     server.close();
//   });

//   describe('Issuing a cert with valid parameters', () => {
//     it.only('should return a 201', async () => {
//       nock('https://infura.ipfs.io')
//         .post(() => true)
//         .reply(201, "QmUVGD7MpgF1SZqs5jDmbSjgqGGSBSBKSaYVS71g7ZCHVs");

//       const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
//       const { statusCode } = res;
//       assert.strictEqual(statusCode, 201, 'statusCode incorrect');
//     });

//     it('should return the id of the class in the db', async () => {
//       const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
//       const { dbId } = res.body;
//       assert.isNotNull(dbId, 'db id is not valid');
//     });

//     it('should push the content to ipfs and return the hash', async () => {
//       const res = await sendRequest(apiPath, 'issueCertificate', 'POST', { cert });
//       const { ipfsHash } = res.body;
//       // multihash representation of sha256 in base58
//       assert.strictEqual(ipfsHash.length, 46, 'ipfs hash length is not correct');
//       expect(ipfsHash, 'ipfs hash in incorrect format').to.contain('Qm');
//     });
//   });
// });
