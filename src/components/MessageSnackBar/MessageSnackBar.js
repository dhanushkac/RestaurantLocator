import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { closeMessageDialog } from "../../actions/actions";

import Snackbar from "@material-ui/core/Snackbar";

class MessageDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      message: props.message
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open, message } = nextProps;

    if (open !== prevState.open || message !== prevState.message) {
      return { open, message };
    }

    return null;
  }

  handleClose = () => {
    this.props.closeMessageDialog();
    this.setState({ open: false, message: "" });
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{this.state.message.text}</span>}
        action={[
          <Button
            key="close"
            color="primary"
            size="small"
            onClick={this.handleClose}
          >
            Close
          </Button>
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  open: state.app.openMessageDialog,
  message: state.app.message
});

export default connect(
  mapStateToProps,
  { closeMessageDialog }
)(MessageDialog);
