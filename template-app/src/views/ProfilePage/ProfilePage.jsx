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

// import blg from "assets/img/blg.jpg";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import getCertificates from "../../stores/requests";
import ProfileForm from "../../components/ProfileForm";
import CertificateForm from "../../components/CertificateForm";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [],
      userProfile: []
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const certificates = await getCertificates(JSON.stringify({ recipientEmail: id }));

      if (certificates) {
        this.setState({ certificates: certificates.reverse() });

        // Set data to be rendered
        const userProfile = [
          {
            label: "First Names",
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
      }
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
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
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Profile",
                        tabIcon: UserIcon,
                        tabContent: (
                          <ProfileForm profile={this.state.userProfile} />
                        )
                      },
                      {
                        tabButton: "Certificates",
                        tabIcon: CertIcon,
                        tabContent: (
                          <CertificateForm certs={this.state.certificates} />
                        )
                      },
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
