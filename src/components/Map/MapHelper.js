import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";
import { connect } from "react-redux";
import {
  fetchRestaurants,
  setMapSelectLocation
} from "./../../actions/actions";

class MapHelper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
      restaurantList: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location, restaurantList } = nextProps;

    if (
      location !== prevState.location ||
      restaurantList !== prevState.restaurantList
    ) {
      return {
        lat: location.lat,
        lng: location.lng,
        mapLat: location.lat,
        mapLng: location.lng,
        restaurantList: restaurantList
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location !== this.props.location ||
      prevProps.restaurantList !== this.props.restaurantList
    ) {
      this.setState({
        lat: this.props.location.lat,
        lng: this.props.location.lng,
        restaurantList: this.props.restaurantList
      });
    }
  }

  onMarkerDrag = obj => {
    const lat = obj.latLng.lat();
    const lng = obj.latLng.lng();

    const location = {
      lat,
      lng
    };

    this.props.fetchRestaurants(location);
  };

  onMapClicked = props => {
    let location = {
      lat: props.latLng.lat(),
      lng: props.latLng.lng()
    };

    this.props.setMapSelectLocation(location);
  };

  render() {
    return (
      <GoogleMap
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
        center={{ lat: this.state.lat, lng: this.state.lng }}
        defaultZoom={13}
        onClick={this.onMapClicked}
      >
        <Marker
          key="0"
          position={{ lat: this.state.lat, lng: this.state.lng }}
          icon={{
            url:
              "https://lh3.googleusercontent.com/mGFIhirZFR-QA1WK-tdqI1OovIc29buB2yjqR4zHpNpdBDpnn2tWIUeSxThlcVNGvA",
            anchor: new window.google.maps.Point(32, 32),
            scaledSize: new window.google.maps.Size(64, 64)
          }}
          onDragEnd={this.onMarkerDrag}
          draggable
          title="Your location"
        />
        {this.state.restaurantList.map(restaurant => {
          return (
            <Marker
              key={restaurant.id}
              title={restaurant.restaurant_name}
              onClick={this.onMarkerClick}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
            />
          );
        })}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  location: state.app.location,
  restaurantList: state.app.filteredRestaurantList
});

export default connect(
  mapStateToProps,
  { fetchRestaurants, setMapSelectLocation }
)(withScriptjs(withGoogleMap(MapHelper)));
