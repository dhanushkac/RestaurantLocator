import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import StarRatingComponent from "react-star-rating-component";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import { Person } from "@material-ui/icons";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  closeViewRestaurant,
  openReviewRestaurantDialog,
  fetchRestaurantData
} from "./../../actions/actions";

class ViewRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.openViewRestaurant,
      restaurant: props.restaurant,
      fetched: false
    };
  }

  handleClose = () => {
    this.props.closeViewRestaurant();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open, restaurant } = nextProps;

    if (open !== prevState.open || restaurant !== prevState.restaurant) {
      return { restaurant: restaurant, open: open };
    }

    return null;
  }

  componentDidUpdate() {
    if (!this.state.restaurant.fetched) {
      this.props.fetchRestaurantData(this.state.restaurant, () => {
        this.setState({ fetched: true });
      });
    }
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        className="dialog"
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title" onClose={this.handleClose}>
          {"Reviews of " + this.state.restaurant.restaurant_name}
          <IconButton
            className="close"
            aria-label="Close"
            onClick={this.handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        {this.state.restaurant.fetched ? (
          <DialogContent>
            <div style={{ textAlign: `center` }}>
              <img
                src={this.state.restaurant.photo_url}
                alt={this.state.restaurant.restaurant_name}
              />
              <PerfectScrollbar>
                <List style={{ maxHeight: `275px` }}>
                  {Object.keys(this.state.restaurant).length === 0 ? (
                    ""
                  ) : this.state.restaurant.reviews === undefined ||
                    this.state.restaurant.reviews.length === 0 ? (
                    <Typography variant="subtitle1">
                      No reviews available
                    </Typography>
                  ) : (
                    this.state.restaurant.reviews.map(review => {
                      return (
                        <ListItem key={review.id}>
                          <ListItemAvatar>
                            {review.profile_photo_url !== "" ? (
                              <Avatar
                                src={review.profile_photo_url}
                                alt="user"
                              />
                            ) : (
                              <Avatar>
                                <Person />
                              </Avatar>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              review.text !== "" ? (
                                review.text
                              ) : (
                                <span
                                  style={{
                                    fontSize: `0.7em`,
                                    fontStyle: `italic`
                                  }}
                                >
                                  No comment available
                                </span>
                              )
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  color="textPrimary"
                                >
                                  {review.author_name}
                                </Typography>
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={5}
                                  value={review.rating}
                                  emptyStarColor={grey["400"]}
                                />
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      );
                    })
                  )}
                </List>
              </PerfectScrollbar>
              <DialogActions>
                <Button
                  className="add-review-dialog-button"
                  variant="contained"
                  color="primary"
                  onClick={this.props.openReviewRestaurantDialog}
                >
                  Add new review
                </Button>
              </DialogActions>
            </div>
          </DialogContent>
        ) : (
          <DialogContent style={{ textAlign: `center` }}>
            <CircularProgress />
          </DialogContent>
        )}
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  open: state.app.openViewRestaurant,
  restaurant: state.app.selectedRestaurant
});

export default connect(
  mapStateToProps,
  {
    closeViewRestaurant,
    openReviewRestaurantDialog,
    fetchRestaurantData
  }
)(ViewRestaurant);
