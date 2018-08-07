const { 
    location,
    description,
    issuingAuthority, 
    issuingAuthorityAddress, 
    daysValidFor, 
    recipients 
} = require('../../issuedCertificates/toIssue.json');

/**
 * @return {Array} Recipient certificates.
 */
module.exports = () => {
  let certs = [];

  // Compute the expiry for all certs to be issued
  const date = new Date();
  const expiryDate = date.setDate(date.getDate() + Number(daysValidFor));

  let cert = { 
    location, 
    description, 
    issuingAuthority, 
    issuingAuthorityAddress: issuingAuthorityAddress.toLowerCase(), 
    issuanceDate: (new Date).toString(),
    expiryDate: (new Date(expiryDate)).toString()
  };

  for (let i = 0; i < recipients.length; i++) {
    cert.recipientFirstNames = recipients[i].firstNames;
    cert.recipientLastName = recipients[i].lastName;
    cert.recipientEmail = recipients[i].email;
    cert.recipientAddress = recipients[i].address.toLowerCase();
    certs.push(cert);
  }

  return certs;
}