import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import filter_1 from "@material-ui/icons/Filter1";
import filter_2 from "@material-ui/icons/Filter2";
import filter_3 from "@material-ui/icons/Filter3";
import filter_4 from "@material-ui/icons/Filter4";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import team3 from "assets/img/faces/kendall.jpg";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem sm={12} md={8}>
            <h2 className={classes.title}> Follow these 3 easy steps to get your very first certificate </h2>
            <h3 className={classes.description}>
            Through these courses, you will develop a sense about solving some of the common 
            problems modern businesses face using blockchain technology.
            <br /> 
            <br />
            Upon Completing each course, you will be awarded a certificate of completion. 
           
            </h3>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12}>
              <InfoArea
                title="Pick A Course"
                description="Some courses are taught in person while others are taught online. Pick the one that is suitable for you by choosing recommended courses from the tab above"               
                icon={filter_1}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs>
              <InfoArea
                title="Finish The Course"
                description="Complete the course in depth and ask your questions from the instructor as needed"
                icon={filter_2}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs>
              <InfoArea
title="Pass The Exam"
description="You will now be tested on the concepts taught in your specific course. The exam will be multiple choice with a minimum passing mark of __%"
                icon={filter_3}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs>
              <InfoArea
                title="Voila!"
                description="Click on the My Certificates tab to obtain your Blockchain Learning Group attested developer certificate"
                icon={filter_4}
                iconColor="success"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);

