import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import RestaurantList from "./../RestaurantList/RestaurantList";
import MapContainer from "./../Map/MapContainer";
import "./Home.css";
import { connect } from "react-redux";
import { fetchLocation, fetchRestaurants } from "../../actions/actions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantList: [],
      location: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location, restaurantList } = nextProps;

    if (
      location !== prevState.location ||
      restaurantList !== prevState.restaurantList
    ) {
      return { location, restaurantList };
    }

    return null;
  }

  componentDidMount() {
    this.props.fetchLocation(() =>
      this.props.fetchRestaurants(this.props.location)
    );
  }

  handleCenterChange(lat, lng) {
    console.log(lat, lng);
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid className="container-area" item xs={12} md={8}>
            <MapContainer changeCenter={this.handleCenterChange.bind(this)} />
          </Grid>
          <Grid className="container-area" item xs={12} md={4}>
            <RestaurantList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.app.location,
  restaurantList: state.app.restaurantList
});

export default connect(
  mapStateToProps,
  { fetchLocation, fetchRestaurants }
)(Home);
