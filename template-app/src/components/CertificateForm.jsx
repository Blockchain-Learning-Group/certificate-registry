import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const CertificateForm = (props) => {
    const { certs } = props;

    return (
        certs.map((cert, index) => 
        <Paper key={index} style={{marginBottom: 100, marginLeft: 'auto', marginRight: 'auto', width: 700}} elevation={5}>
            <h2>Certificate {certs.length-index}</h2>
            <FormControl style={{width: 700}}>
                <TextField label="Description" style={{margin: 10}} InputProps={{readOnly: true, value: cert.description}} />
                <TextField label="Issuance Timestamp" style={{margin: 10}} InputProps={{readOnly: true,  value: String(new Date(cert.issuanceDate))}} />
                <TextField label="Expiry Timestamp" style={{margin: 10}} InputProps={{readOnly: true,  value: String(new Date(cert.expiryDate))}} />
                <TextField label="IPFS Hash"  style={{margin: 10}} InputProps={{readOnly: true, value: cert.ipfsHash}} />
                <TextField label="Issuing Authority" style={{margin: 10}}  InputProps={{readOnly: true, value: cert.issuingAuthority}} />
                <TextField label="Location" style={{margin: 10}} InputProps={{readOnly: true, value: cert.location}} />
                <TextField label="Issuing Authority Verifying Key" style={{margin: 10}} InputProps={{readOnly: true, value: cert.issuingAuthorityAddress}} />
                <TextField label="Issuing Authority Signature" style={{margin: 10}} InputProps={{readOnly: true, value: JSON.stringify(cert.signatures.issuingAuthoritySignature)}} />
                <TextField label="Recipient Verifying Key" style={{margin: 10}} InputProps={{readOnly: true, value: cert.recipientAddress}} />
                <TextField label="Recipient Signature" style={{margin: 10}} InputProps={{readOnly: true, value: JSON.stringify(cert.signatures.recipientSignature)}} />
            </FormControl>
        </Paper>
       )
   );
};

export default CertificateForm;
