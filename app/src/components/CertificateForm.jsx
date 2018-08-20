import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
// import BLGImage from '../assets/img/blg.jpg';

const CertificateForm = (props) => {
    const { certs, countersign } = props;

    return (
        certs.map((cert, index) =>
            <div style={{ flexGrow: 1 }} key={index}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper
                            key={index}
                            style={{ marginBottom: 100, marginLeft: 'auto', marginRight: 'auto', width: "85%", }}
                            elevation={8}
                            
                        >
                        <Typography variant="display3">
                            Certificate Of Accomplishment
                            </Typography>
                            <img alt="" src={require('./img.jpeg')} />
                            <Grid container style={{ margin: '1.5em' }} direction="column" spacing={16}>
                                <Grid item>
                                    <Typography variant="title" align="left">
                                        {cert.description}
                                    </Typography>
                                    <Typography align="left">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Cras rhoncus ante 
                                        Aenean lacinia gravida interdum.
                                    </Typography>
                                    <Typography align="left">
                                    Nunc eu sem quis diam euismod dictum quis ultrices turpis.
                                    Nam elementum tempus vestibulum.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid
                                        container
                                        spacing={8}
                                        justify="space-evenly"
                                    >

                                        <Grid item>
                                            <Typography variant="body2" align="left">
                                                Issuing Authority
                                    </Typography>
                                            <Typography align="left" color = "secondary">
                                            <a
                                                href="https://www.blockchainlearninggroup.com/"
                                                color="primary"
                                                
                                            >
                                                Blockchain Learning Group
                                                
                                             </a>
                                    </Typography>

                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={8}
                                        justify="space-evenly"
                                    >

                                        <Grid item>
                                            <Typography variant="body2" align="left">
                                                Issuance Timestamp
                                    </Typography>
                                            <Typography align="left">
                                                {String(new Date(cert.issuanceDate))}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" align="left">
                                                Expiry Timestamp
                                    </Typography>
                                            <Typography align="left">
                                                {String(new Date(cert.issuanceDate))}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                
                                <Grid item>
                                    <Grid
                                        container
                                        spacing={8}
                                        justify="flex-start"
                                    >

                                        <Grid item>
                                            <Typography variant="body2" align="left">
                                                IPFS Hash
                                    </Typography>
                                            <Typography align="left">
                                                {cert.ipfsHash}
                                            </Typography>
                                            
                                        </Grid> 
                                        <Grid item>
                                            <Typography variant="body2" align="left">
                                                Location
                                    </Typography>
                                            <Typography align="left">
                                                {cert.location}
                                            </Typography>
                                        </Grid>   
                               
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid
                                        container
                                        spacing={8}
                                        justify="flex-start"
                                    >


 
                                        <Grid item>
                                        <span> </span>
                                            <Typography variant="body2" align="left">
                                                Skills Gained
                                    </Typography>
                                            <Button color="default" variant = "raised" href = "https://blockscalesolutions.com/">
                                            
                                                Blockchain
                                            </Button>
                                            
                                            <Button color="default" variant = "raised" href = "https://blockscalesolutions.com/">
                                            
                                                DLT
                                            </Button>
                                            <Button color="default" variant = "raised" href = "https://blockscalesolutions.com/">
                                            
                                            Hyperledger
                                        </Button>
                                        <Button color="default" variant = "raised" href = "https://blockscalesolutions.com/">
                                            
                                            Ledger
                                        </Button>
                                        <Button color="default" variant = "raised" href = "https://blockscalesolutions.com/">
                                            
                                            Open Source
                                        </Button>
                                        </Grid>                                   
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                                
                               

                            <FormControl fullWidth={true}>
                                
                                {
                                    (cert.signatures.issuingAuthoritySignature !== 'undefined')
                                        ?
                                    
                                        <Paper>
                                            <Typography variant="display1">
                                            Signature Data
                                            </Typography>
                                            <Grid container style={{ margin: '2.6em' }} >
                                                <Grid item xs={10}>
                                                <Typography variant="body2" color="primary" align="left">
                                                Message Hash
                                                    </Typography>
                                                    <TextField style={{ margin: 2, width: "100%" }}
                                                        InputProps={{ readOnly: true, value: cert.signatures.issuingAuthoritySignature.messageHash }}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                <Typography variant="body2" color="primary" align="left">
                                                Issuing Authority Address 
                                                    </Typography>
                                                    <TextField style={{ margin: 2, width: "100%" }}
                                                        InputProps={{ readOnly: true, value: cert.issuingAuthorityAddress  }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={10}>
                                                <Typography variant="body2" color="primary" align="left">
                                                Issuing Authority Signature 
                                                    </Typography>
                                                    <TextField style={{ margin: 2, width: "100%" }}
                                                        InputProps={{ readOnly: true, value: cert.signatures.issuingAuthoritySignature.signature  }}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                <Typography variant="body2" color="primary" align="left">
                                                Recipient Key
                                                    </Typography>                                                                                     
                                                    <TextField style={{ margin: 2, width: "100%" }} 
                                                    InputProps={{ readOnly: true, value: cert.recipientAddress }} />
                                                </Grid>
                                                {
                                                    cert.signatures.recipientSignature
                                                        ?
                                                        (
                                                            <Grid container>
                                                                <Grid item xs={12}>
                                                                    <TextField label="Recipient Signature" style={{ margin: 10, width: "90%" }}
                                                                        InputProps={{ readOnly: true, value: cert.signatures.recipientSignature }}
                                                                    />
                                                                </ Grid>
                                                                <Grid item xs={12}>
                                                                    <Button style={{ margin: 20 }} variant="contained" color="primary">
                                                                        Verify Recipient Signature
                                                            <CloudUpload style={{ margin: 10, fontSize: 36 }} />
                                                                    </Button>
                                                                    <Button style={{ margin: 20 }} variant="contained" color="primary">
                                                                        Verify Authority Signature
                                                            <CloudUpload style={{ margin: 10, fontSize: 36 }} />
                                                                    </Button>
                                                                </ Grid>
                                                            </ Grid>
                                                        )
                                                        :
                                                        (<Button id={index}  style={{ margin: 2 }} variant="contained" color="primary" onClick={countersign}>
                                                            Countersign
                                                    <EditIcon style={{ margin: 10, fontSize: 36 }} />
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
