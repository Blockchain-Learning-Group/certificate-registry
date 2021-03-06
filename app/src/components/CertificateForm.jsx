import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import BLGImage from '../assets/img/blg.jpg';

const CertificateForm = (props) => {
    const { certs, countersign } = props;

    return (
        certs.map((cert, index) => 
            <div style={{flexGrow: 1}} key={index}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper 
                            key={index} 
                            style={{marginBottom: 100, marginLeft: 'auto', marginRight: 'auto', width: "80%"}} 
                            elevation={5}
                        >
                            <h2>Certificate {certs.length-index}</h2>
                            <FormControl fullWidth={true}>
                                <TextField label="Description" style={{margin: 10}} InputProps={{readOnly: true, value: cert.description}} />
                                <TextField label="Issuance Timestamp" style={{margin: 10}} InputProps={{readOnly: true,  value: String(new Date(cert.issuanceDate))}} />
                                <TextField label="Expiry Timestamp" style={{margin: 10}} InputProps={{readOnly: true,  value: String(new Date(cert.expiryDate))}} />
                                <TextField label="IPFS Hash"  style={{margin: 10}} InputProps={{readOnly: true, value: cert.ipfsHash}} />
                                <TextField label="Issuing Authority" style={{margin: 10}}  InputProps={{readOnly: true, value: cert.issuingAuthority}} />
                                <TextField label="Location" style={{margin: 10}} InputProps={{readOnly: true, value: cert.location}} />
                                {
                                        (cert.signatures.issuingAuthoritySignature !== 'undefined')
                                        ?   
                                        <Paper>
                                            <p>Signature data...</p>
                                            <Grid container justify="center">
                                                <Grid item xs={12}>
                                                    <TextField label="Message" style={{margin: 10, width: "90%"}} 
                                                        InputProps={{readOnly: true, value: cert.signatures.issuingAuthoritySignature.message}} 
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField label="Message Hash" style={{margin: 10, width: "90%"}} 
                                                    InputProps={{readOnly: true, value: cert.signatures.issuingAuthoritySignature.messageHash}} 
                                                />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField label="Issuing Authority Key" style={{margin: 10, width: "90%"}} 
                                                    InputProps={{readOnly: true, value: cert.issuingAuthorityAddress}} 
                                                />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField label="Issuing Authority Signature" style={{margin: 10, width: "90%"}} 
                                                    InputProps={{readOnly: true, value: cert.signatures.issuingAuthoritySignature.signature}} 
                                                />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField label="Recipient Key" style={{margin: 10, width: "90%"}} InputProps={{readOnly: true, value: cert.recipientAddress}} />
                                                </Grid>
                                            {
                                                cert.signatures.recipientSignature 
                                                ? 
                                                (
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <TextField label="Recipient Signature" style={{margin: 10, width: "90%"}} 
                                                            InputProps={{readOnly: true, value: cert.signatures.recipientSignature}} 
                                                        />
                                                    </ Grid>
                                                    <Grid item xs={12}>
                                                        <Button style={{margin: 20}} variant="contained" color="primary">
                                                            Verify Recipient Signature
                                                            <CloudUpload style={{margin: 10, fontSize: 36}}/>
                                                        </Button>
                                                        <Button style={{margin: 20}} variant="contained" color="primary">
                                                            Verify Authority Signature
                                                            <CloudUpload style={{margin: 10, fontSize: 36}}/>
                                                        </Button>
                                                    </ Grid>
                                                </ Grid>
                                                )
                                                :
                                                (<Button id={index} fullWidth={true} style={{margin: 20}} variant="contained" color="secondary" onClick={countersign}>
                                                    Countersign
                                                    <EditIcon style={{margin: 10, fontSize: 36}}/>
                                                </Button>)
                                            }
                                            </Grid>
                                        </Paper>
                                        : ""
                                }
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

       )
   );
};

export default CertificateForm;
