import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import AddRestaurantDialog from "../AddRestaurantDialog/AddRestaurantDialog";
import { setSelectedRestaurant } from "./../../actions/actions";

import Restaurant from "../Restaurant/Restaurant";
import ViewRestaurantDialog from "../ViewRestaurantDialog/ViewRestaurantDialog";
import AddReviewDialog from "../AddReviewDialog/AddReviewDialog";
import RestaurantFilter from "../RestaurantFilter/RestaurantFilter";
import MessageSnackBar from "../MessageSnackBar/MessageSnackBar";
import "./RestaurantList.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import CircularProgress from "@material-ui/core/CircularProgress";

class RestaurantList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantList: [],
      msgOpen: false,
      fetched: false
    };
    this.onClickRestaurant = this.onClickRestaurant.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurantList !== this.props.restaurantList) {
      this.setState({
        restaurantList: this.props.restaurantList,
        fetched: true
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { restaurantList } = nextProps;

    if (restaurantList !== prevState.restaurantList) {
      return {
        restaurantList: restaurantList
      };
    }

    return null;
  }

  onClickRestaurant = (e, restaurant) => {
    this.props.setSelectedRestaurant(restaurant);
  };

  handleMsgClose = () => {
    this.setState({ msgOpen: false });
  };

  render() {
    let restaurants = this.state.fetched ? (
      this.state.restaurantList.length > 0 ? (
        this.state.restaurantList.map((restaurant, index) => {
          return (
            <Restaurant
              key={restaurant.id}
              restaurant={restaurant}
              onClick={this.onClickRestaurant}
            />
          );
        })
      ) : (
        <Typography variant="subtitle1" className="title">
          No restaurants available
        </Typography>
      )
    ) : (
      <div style={{ textAlign: `center` }}>
        <CircularProgress />
      </div>
    );

    return (
      <div style={{ padding: `15px` }}>
        <Typography variant="h4" className="title">
          Restaurant List
        </Typography>
        <RestaurantFilter />
        <PerfectScrollbar>
          <div id="container">{restaurants}</div>
        </PerfectScrollbar>
        <ViewRestaurantDialog />
        <AddReviewDialog />
        <MessageSnackBar />
        <AddRestaurantDialog />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurantList: state.app.filteredRestaurantList,
  fetched: state.app.fetched
});

export default connect(
  mapStateToProps,
  { setSelectedRestaurant }
)(RestaurantList);
