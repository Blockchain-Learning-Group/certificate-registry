import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import UserIcon from "@material-ui/icons/AccountCircle";
import CertIcon from "@material-ui/icons/AssignmentTurnedIn";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/VerifiedUser';

// import blg from "assets/img/blg.jpg";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import getCertificates from "../../stores/getCertificates";
import CertificateForm from "../../components/CertificateForm";
import Loading from "../../components/Loading";

import Countersign from '../../services/Web3';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CardUI from './CardUI'

var certificates;
var details = new Array();

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [],
      userProfile: [],
      loading: false
    }
  }

  /**
   * Sort by latest issuance date
   * @param {*} a 
   * @param {*} b 
   */
  sortLatest(a,b) {
    if (a.issuanceDate > b.issuanceDate)
      return -1;
    if (a.issuanceDate < b.issuanceDate)
      return 1;
    return 0;
  }
  
  async componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.match.params;

    if (id) {
       certificates = await getCertificates(JSON.stringify({ recipientEmail: id }));

      if (certificates) {
        const sorted = certificates.sort(this.sortLatest);

        this.setState({ certificates: sorted });
        details.push(certificates[0].recipientFirstNames)
        details.push(certificates[0].recipientLastName)
        details.push(certificates[0].recipientEmail)
        details.push(certificates[0].recipientAddress)
        // Set data to be rendered
        const userProfile = [
          {
            label: "First Name",
            value: certificates[0].recipientFirstNames
          },
          {
            label: "Last Name",
            value: certificates[0].recipientLastName
          },
          {
            label: "Email",
            value: certificates[0].recipientEmail
          },
          {
            label: "Verification Key",
            value: certificates[0].recipientAddress
          },
        ];

        this.setState({ userProfile });
        this.setState({ loading: false });
      }
    }
  }

  countersign = async ({ currentTarget }) => {
    const { id } = currentTarget;
    const certs = this.state.certificates;    
    const cert = certs[id];
    
    // Send req to sign
    this.setState({ loading: true });
    const { data, sig } = await Countersign(cert);
    
    // Update cert with latest ipfs hash and new sig
    cert.ipfsHash = data.ipfsHash;
    cert.signatures.recipientSignature = sig;
    certs[id] = cert;
    this.setState({ certificates: certs });
    this.setState({ loading: false });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { loading } = this.state;
    // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <React.Fragment>
        {loading && <Loading open={loading}/>}
        <Header
          color="transparent"
          brand="Blockchain Learning Group"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/bg2.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
               <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <Grid container style={{ margin: '1.5em' }} direction="column" spacing={16}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Profile",
                        tabIcon: UserIcon,
                        tabContent: (
                          <Paper               
                          style={{ marginBottom: 100, marginLeft: 'auto', marginRight: 'auto', width: "85%", }}
                          elevation={8}
                          //square = {false}
                          >
                      
                        
                          <Typography variant="body2" align="left">
                            First Name:
                            <InputAdornment position="start">
                            <AccountCircle />
                            {details[0]}
                        </InputAdornment> 
                          </Typography>
                          <GridItem xs={12}>
                          </GridItem>                                                  
                          <Typography variant="body2" align="left">
                            Last Name: 
                            <InputAdornment position="start">
                            <AccountCircle />
                            {details[1]}
                        </InputAdornment>
                           </Typography>
                           <Typography variant="body2" align="left">
                            Email:
                            <InputAdornment position="start">
                            <AccountCircle />
                            {details[2]}
                        </InputAdornment>
                           </Typography>
                           <Typography variant="body2" align="left">
                           Verification Key:
                            <InputAdornment position="start">
                            <AccountCircle />
                            {details[3]}
                        </InputAdornment>
                           </Typography>
                           </Paper>

                          //<ProfileForm profile={this.state.userProfile} />
                          
                        )

                        
                      },
                      {
                        tabButton: "Certificates",
                        tabIcon: CertIcon,
                        tabContent: (
                          <CertificateForm certs={this.state.certificates} countersign={this.countersign}/>
                        )
                      },
                    ]}
                  /> 
                  </Grid>
                </GridItem>
              </GridContainer>
             
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
