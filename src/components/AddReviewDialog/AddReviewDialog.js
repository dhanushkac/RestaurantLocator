import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import StarRatingComponent from "react-star-rating-component";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import TextField from "@material-ui/core/TextField";

import {
  closeReviewRestaurantDialog,
  addNewReview,
  openMessageDialog
} from "../../actions/actions";

class AddReviewDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      restaurant: props.restaurant,
      reviewText: "",
      stars: 0,
      hoverStars: 0
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open, restaurant } = nextProps;

    if (open !== prevState.open || restaurant !== prevState.restaurant) {
      return { restaurant: restaurant, open: open };
    }

    return null;
  }

  handleAddReview = () => {
    let review = {
      id: Date.now().toString(),
      rating: this.state.stars,
      text: this.state.reviewText,
      author_name: "current session",
      profile_photo_url: ""
    };

    this.props.addNewReview(review);
    this.setState({ reviewText: "", stars: 0, hoverStars: 0 });
    this.props.openMessageDialog({
      title: "Add Review",
      text: "New Review has been added successfully."
    });
  };

  handleChange = e => {
    this.setState({ reviewText: e.target.value });
  };

  handleReviewClose = () => {
    this.props.closeReviewRestaurantDialog();
    this.setState({ reviewText: "", stars: 0, hoverStars: 0 });
  };

  handleHoverReviewStars = (next, prev, name) => {
    this.setState({ hoverStars: next });
  };

  handleClickReviewStars = (next, prev, name) => {
    this.setState({ stars: next, hoverStars: next });
  };

  handleHoverOutReviewStars = () => {
    let stars = this.state.stars;
    this.setState({ hoverStars: stars });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleReviewClose}
        className="dialog"
        aria-labelledby="simple-dialog-review"
      >
        <DialogTitle id="simple-dialog-review" onClose={this.handleReviewClose}>
          {"Add new review for " + this.state.restaurant.restaurant_name}
          <IconButton
            className="close"
            aria-label="Close"
            onClick={this.handleReviewClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="standard-multiline-flexible"
            label="Add your review text here"
            multiline
            rowsMax="4"
            className="review-input"
            onChange={this.handleChange}
            margin="normal"
          />
          <Typography className="review-title" variant="body2" gutterBottom>
            How was your experience here?
          </Typography>
          <StarRatingComponent
            name="review-rate"
            value={
              this.state.stars !== this.state.hoverStars
                ? this.state.hoverStars
                : this.state.stars
            }
            onStarClick={this.handleClickReviewStars}
            onStarHover={this.handleHoverReviewStars}
            onStarHoverOut={this.handleHoverOutReviewStars}
            emptyStarColor={grey["400"]}
            editing={true}
            className="review-rating"
          />
          <br />
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddReview}
            >
              Add review
            </Button>
            <Button onClick={this.handleReviewClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  open: state.app.openReviewRestaurant,
  restaurant: state.app.selectedRestaurant
});

export default connect(
  mapStateToProps,
  { closeReviewRestaurantDialog, addNewReview, openMessageDialog }
)(AddReviewDialog);
