import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";
import grey from "@material-ui/core/colors/grey";
import Tooltip from "@material-ui/core/Tooltip";

import "./Restaurant.css";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = { restaurant: props.restaurant };
  }

  render() {
    return (
      <div>
        <Paper
          className="restaurant"
          elevation={1}
          onClick={e => this.props.onClick(e, this.state.restaurant)}
        >
          <Typography variant="h5" component="h3">
            {this.state.restaurant.restaurant_name}
          </Typography>
          <Typography component="p">{this.state.restaurant.address}</Typography>
          <Tooltip
            title={
              this.state.restaurant.rating !== undefined
                ? this.state.restaurant.rating
                : ""
            }
          >
            <div style={{ width: `15%` }}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.restaurant.rating}
                emptyStarColor={grey["400"]}
              />
            </div>
          </Tooltip>
        </Paper>
      </div>
    );
  }
}

export default Restaurant;
