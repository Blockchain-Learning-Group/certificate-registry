import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// nodejs library to set properties for components
// import PropTypes from "prop-types";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class CertificateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleClick() {
    this.setState({ open: true });
  }
  render() {
    // const { name } = this.state;
    // const {
    //   recipientName,
    // } = this.props;
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8} lg={8}>
                <CustomInput
                labelText="Recipient Name"
                id="float"
                formControlProps={{
                    fullWidth: true
                }}
                />
                <CustomInput
                labelText="Recipient Address"
                id="float"
                formControlProps={{
                    fullWidth: true
                }}
                />
                <CustomInput
                labelText="Issuing Authority"
                id="float"
                formControlProps={{
                    fullWidth: true
                }}
                />
                <CustomInput
                labelText="Issuing Authority Address"
                id="float"
                formControlProps={{
                    fullWidth: true
                }}
                />
                <CustomInput
                labelText="Issue Date"
                id="float"
                formControlProps={{
                    fullWidth: true
                }}
                />
                <Button color="primary" round>
                  Issue Certificate
                </Button>
            </GridItem>
        </GridContainer>
    );
  }
}

CertificateForm.defaultProps = {
    recipientName: "Adam Lemmon",
};

CertificateForm.propTypes = {};

// export default withStyles(certificateFormStyle)(CertificateForm);
export default CertificateForm;
