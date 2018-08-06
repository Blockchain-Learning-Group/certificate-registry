const { apiUrl, apiPort } = require('../settings.json');
const { sendRequest, buildCertificates } = require('../src/utils');

const certificates = buildCertificates(); 

/**
 * NOTE globals used
 */
async function issueCertificates() {
    let cert;

    for (let i = 0; i < certificates.length; i += 1) {
        cert = certificates[i]

        console.log(`Issuing cert: ${JSON.stringify(cert)}`);

        const res = await sendRequest(`${apiUrl}:${apiPort}`, 'issueCertificate', 'POST', { cert });

        console.log(res.statusCode);
        console.log(res.body);
    }
}

issueCertificates();