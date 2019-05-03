import React, { Component } from "react";
import MapHelper from "./MapHelper";
import { connect } from "react-redux";

class MapContainer extends Component {
  render() {
    return (
      <div>
        <MapHelper
          containerElement={<div style={{ height: `610px` }} />}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUYu5Xjf2oyXwkJKyW6rkGlXrMRIfGQeo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={
            <div
              style={{
                height: `100%`,
                width: `90%`,
                margin: "auto",
                marginTop: `20px`
              }}
            />
          }
        />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(MapContainer);
