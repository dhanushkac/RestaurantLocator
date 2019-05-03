import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  addNewRestaurant,
  closeAddNewRestaurantDialog,
  openMessageDialog
} from "../../actions/actions";

class AddRestaurantDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.selectedLocation,
      open: props.openAddRestaurant,
      restaurantName: "",
      restaurantAddress: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ restaurantName: "", restaurantAddress: "" });
    this.props.notifyClose();
  };

  handleAddNewRestaurant = () => {
    let name = this.state.restaurantName;
    let address = this.state.restaurantAddress;
    let lat = this.state.location.lat;
    let lng = this.state.location.lng;

    let restaurant = {
      id: Date.now().toString(),
      restaurant_name: name,
      address: address,
      lat: lat,
      lng: lng,
      rating: 0,
      reviews: [],
      photo_url: "",
      place_id: "",
      fetched: true
    };

    this.props.addNewRestaurant(restaurant);
    this.setState({ restaurantName: "", restaurantAddress: "" });
    this.props.openMessageDialog({
      title: "Add Restaurant",
      text: "New Restaurant has been added successfully."
    });
  };

  handleClose = () => {
    this.setState({ restaurantName: "", restaurantAddress: "" });
    this.props.closeAddNewRestaurantDialog();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedLocation, openAddRestaurant } = nextProps;

    if (
      selectedLocation !== prevState.selectedLocation ||
      openAddRestaurant !== prevState.openAddRestaurant
    ) {
      return { location: selectedLocation, open: openAddRestaurant };
    }

    return null;
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        className="dialog"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="title" id="alert-dialog-title">
          Add new restaurant
          <IconButton
            className="close"
            aria-label="Close"
            onClick={this.handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="restaurantName"
            label="Name"
            value={this.state.restaurantName}
            onChange={this.handleChange("restaurantName")}
            margin="normal"
          />
          <br />
          <TextField
            id="restaurantAddress"
            label="Address"
            value={this.state.restaurantAddress}
            onChange={this.handleChange("restaurantAddress")}
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="button-area">
          <Button
            variant="contained"
            onClick={this.handleAddNewRestaurant}
            color="primary"
            autoFocus
          >
            Add Restaurant
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocation: state.app.selectedLocation,
  openAddRestaurant: state.app.openAddRestaurant
});

export default connect(
  mapStateToProps,
  { addNewRestaurant, closeAddNewRestaurantDialog, openMessageDialog }
)(AddRestaurantDialog);
