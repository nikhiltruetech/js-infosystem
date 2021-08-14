import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "components/CustomButtons/Button.js";
import Slide from "@material-ui/core/Slide";

import confirmationModalStyle from "assets/jss/material-dashboard-react/views/goldRatesStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class ConfirmationUnlinkModal extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      confirmationModal: false,
      confirmationModalHeader: "",
      confirmationModalMsg: "",
    };
  }
  handlePositiveButton() {
    if (this.props.handlePositiveButton) {
      this.props.handlePositiveButton();
    }
  }
  handleNegativeButton() {
    this.props.handleNegativeButton();
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.confirmationModal !== state.confirmationModal) {
      let statusDetails = {};
      if (props.confirmationModal) {
        statusDetails = {
          confirmationModal: props.confirmationModal,
          confirmationModalHeader: props.confirmationModalHeader,
          confirmationModalMsg: props.confirmationModalMsg,
        };
      }
      return {
        confirmationModal: props.confirmationModal,
        ...statusDetails,
      };
    }
    return null;
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Dialog
          classes={{
            root: classes.center + " " + classes.modalRoot,
            paper: classes.modal,
          }}
          open={this.state.confirmationModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleNegativeButton()}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>
              {this.state.confirmationModalHeader}
            </h4>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <p>{this.state.confirmationModalMsg}</p>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button
              onClick={() => this.handlePositiveButton()}
              color="info"
              round
            >
              {this.props.positiveButtonText
                ? this.props.positiveButtonText
                : "Confirm"}
            </Button>
            <Button
              onClick={() => this.handleNegativeButton()}
              color="info"
              round
            >
              {this.props.negativeButtonText
                ? this.props.negativeButtonText
                : "Cancel"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmationUnlinkModal.propTypes = {
  classes: PropTypes.object.isRequired,
  confirmationModal: PropTypes.bool.isRequired,
  confirmationModalHeader: PropTypes.string,
  confirmationModalMsg: PropTypes.string.isRequired,
  handleNegativeButton: PropTypes.func.isRequired,
  handlePositiveButton: PropTypes.func.isRequired,
};

export default withStyles(confirmationModalStyle)(ConfirmationUnlinkModal);
