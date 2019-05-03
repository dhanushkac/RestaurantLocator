import {
  FETCH_LOCATION,
  FETCH_RESTAURANTS,
  ADD_RESTAURANT,
  SET_MAP_SELECT_LOCATION,
  ADD_REVIEW,
  CLOSE_ADD_RESTAURANT_DIALOG,
  SET_SELECTED_RESTAURANT,
  CLOSE_VIEW_RESTAURANT,
  OPEN_REVIEW_DIALOG,
  CLOSE_REVIEW_DIALOG,
  CLOSE_MESSAGE_DIALOG,
  OPEN_MESSAGE_DIALOG,
  FILTER_RESTAURANTS,
  FETCH_RESTAURANT_DATA
} from "./types";

const API_KEY = "AIzaSyDUYu5Xjf2oyXwkJKyW6rkGlXrMRIfGQeo";

export const fetchLocation = callback => dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        dispatch({
          type: FETCH_LOCATION,
          payload: location
        });

        callback();
      },
      error => {
        console.log("Locatin blocked ", error.message);
        fetch(
          "http://api.ipstack.com/check?access_key=6b15f78fb62e6c06cc74a1d6d7c0c4e7"
        )
          .then(res => res.json())
          .then(result => {
            let location = {
              lat: result.latitude,
              lng: result.longitude
            };

            dispatch({
              type: FETCH_LOCATION,
              payload: location
            });

            callback();
          });
      }
    );
  }
};

export const fetchRestaurants = location => dispatch => {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    location.lat
  },${location.lng}&radius=3000&type=restaurant&key=${API_KEY}`;

  fetch("https://cors-anywhere.herokuapp.com/" + url)
    .then(res => res.json())
    .then(result => {
      let restaurantList = result.results.map(restaurant => {
        return {
          id: restaurant.id,
          restaurant_name: restaurant.name,
          address: restaurant.vicinity,
          lat: restaurant.geometry.location.lat,
          lng: restaurant.geometry.location.lng,
          reviews: [],
          place_id: restaurant.place_id,
          rating: restaurant.rating,
          fetched: false,
          photo_url: ""
        };
      });

      dispatch({
        type: FETCH_RESTAURANTS,
        payload: {
          restaurantList: restaurantList,
          location: location
        }
      });
    });
};

export const addNewRestaurant = restaurant => dispatch => {
  dispatch({
    type: ADD_RESTAURANT,
    payload: restaurant
  });
};

export const closeAddNewRestaurantDialog = () => dispatch => {
  dispatch({
    type: CLOSE_ADD_RESTAURANT_DIALOG
  });
};

export const setMapSelectLocation = location => dispatch => {
  dispatch({
    type: SET_MAP_SELECT_LOCATION,
    payload: location
  });
};

export const addNewReview = review => dispatch => {
  dispatch({
    type: ADD_REVIEW,
    payload: review
  });
};

export const setSelectedRestaurant = restaurant => dispatch => {
  dispatch({
    type: SET_SELECTED_RESTAURANT,
    payload: restaurant
  });
};

export const closeViewRestaurant = () => dispatch => {
  dispatch({
    type: CLOSE_VIEW_RESTAURANT
  });
};

export const openReviewRestaurantDialog = () => dispatch => {
  dispatch({
    type: OPEN_REVIEW_DIALOG
  });
};

export const closeReviewRestaurantDialog = () => dispatch => {
  dispatch({
    type: CLOSE_REVIEW_DIALOG
  });
};

export const closeMessageDialog = () => dispatch => {
  dispatch({
    type: CLOSE_MESSAGE_DIALOG
  });
};

export const openMessageDialog = message => dispatch => {
  dispatch({
    type: OPEN_MESSAGE_DIALOG,
    payload: message
  });
};

export const filterRestaurants = (
  filterText,
  ratingFilter,
  minRating,
  maxRating
) => dispatch => {
  dispatch({
    type: FILTER_RESTAURANTS,
    payload: {
      filterText: filterText,
      ratingFilter: ratingFilter,
      minRating: minRating,
      maxRating: maxRating
    }
  });
};

export const fetchRestaurantData = (restaurant, callback) => dispatch => {
  const photoUrl = `https://maps.googleapis.com/maps/api/streetview?size=250x150&location=${
    restaurant.lat
  },${restaurant.lng}&heading=151.78&pitch=-0.76&key=${API_KEY}`;

  let photo_url = "";
  let reviews = [];

  if (!restaurant.fetch) {
    fetch("https://cors-anywhere.herokuapp.com/" + photoUrl).then(res => {
      photo_url = res.url;

      const reviewUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
        restaurant.place_id
      }&key=${API_KEY}`;

      fetch("https://cors-anywhere.herokuapp.com/" + reviewUrl)
        .then(res => res.json())
        .then(data => {
          reviews =
            data.result.reviews === undefined
              ? []
              : data.result.reviews.map(review => {
                  return {
                    id: review.time,
                    rating: review.rating,
                    text: review.text,
                    time: review.time,
                    author_name: review.author_name,
                    profile_photo_url: review.profile_photo_url
                  };
                });

          dispatch({
            type: FETCH_RESTAURANT_DATA,
            payload: { reviews, photo_url }
          });

          callback();
        });
    });
  } else {
    dispatch({
      type: FETCH_RESTAURANT_DATA,
      payload: { reviews, photo_url }
    });

    callback();
  }
};
