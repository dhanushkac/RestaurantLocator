import {
  FETCH_LOCATION,
  FETCH_RESTAURANTS,
  SET_MAP_SELECT_LOCATION,
  ADD_REVIEW,
  ADD_RESTAURANT,
  CLOSE_ADD_RESTAURANT_DIALOG,
  SET_SELECTED_RESTAURANT,
  CLOSE_VIEW_RESTAURANT,
  OPEN_REVIEW_DIALOG,
  CLOSE_REVIEW_DIALOG,
  CLOSE_MESSAGE_DIALOG,
  OPEN_MESSAGE_DIALOG,
  FILTER_RESTAURANTS,
  FETCH_RESTAURANT_DATA
} from "../actions/types";

const initialState = {
  location: {
    lat: 6.705019,
    lng: 79.932212
  },
  restaurantList: [],
  filteredRestaurantList: [],
  selectedLocation: {},
  selectedRestaurant: {},
  openAddRestaurant: false,
  openViewRestaurant: false,
  openReviewRestaurant: false,
  openMessageDialog: false,
  message: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurantList: action.payload.restaurantList,
        filteredRestaurantList: action.payload.restaurantList,
        location: action.payload.location
      };
    case SET_MAP_SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
        openAddRestaurant: true
      };
    case ADD_REVIEW:
      const rating =
        state.selectedRestaurant.rating !== 0
          ? (state.selectedRestaurant.rating + action.payload.rating) / 2
          : action.payload.rating;
      const newReview =
        state.selectedRestaurant.reviews.length > 0
          ? [...state.selectedRestaurant.reviews, action.payload]
          : [action.payload];
      const list = state.filteredRestaurantList.map(restaurant => {
        if (restaurant.id === state.selectedRestaurant.id) {
          restaurant.reviews = newReview;
          restaurant.rating = rating;
          return restaurant;
        }

        return restaurant;
      });
      const list2 = state.restaurantList.map(restaurant => {
        if (restaurant.id === state.selectedRestaurant.id) {
          restaurant.reviews = newReview;
          restaurant.rating = rating;
          return restaurant;
        }

        return restaurant;
      });

      return {
        ...state,
        filteredRestaurantList: list,
        restaurantList: list2,
        openReviewRestaurant: false
      };
    case ADD_RESTAURANT:
      return {
        ...state,
        openAddRestaurant: false,
        selectedLocation: {},
        restaurantList: [action.payload, ...state.restaurantList],
        filteredRestaurantList: [
          action.payload,
          ...state.filteredRestaurantList
        ]
      };
    case CLOSE_ADD_RESTAURANT_DIALOG:
      return {
        ...state,
        openAddRestaurant: false,
        selectedLocation: {}
      };
    case SET_SELECTED_RESTAURANT:
      return {
        ...state,
        selectedRestaurant: action.payload,
        openViewRestaurant: true
      };
    case CLOSE_VIEW_RESTAURANT:
      return {
        ...state,
        openViewRestaurant: false
      };
    case OPEN_REVIEW_DIALOG:
      return {
        ...state,
        openReviewRestaurant: true,
        openViewRestaurant: false
      };
    case CLOSE_REVIEW_DIALOG:
      return {
        ...state,
        openReviewRestaurant: false
      };
    case CLOSE_MESSAGE_DIALOG:
      return {
        ...state,
        openMessageDialog: false,
        message: {}
      };
    case OPEN_MESSAGE_DIALOG:
      return {
        ...state,
        openMessageDialog: true,
        message: { ...action.payload }
      };
    case FILTER_RESTAURANTS:
      const filterText = action.payload.filterText;
      const ratingFilter = action.payload.ratingFilter;
      const minRating = action.payload.minRating;
      const maxRating = action.payload.maxRating;

      const rl = [...state.restaurantList];

      let resList = [];

      if (ratingFilter !== -1) {
        if (minRating === 0 && maxRating === 0) {
          resList = rl.filter(restaurant => {
            return (
              restaurant.restaurant_name
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) >= 0 &&
              Math.floor(restaurant.rating) === ratingFilter
            );
          });
        } else {
          resList = rl.filter(restaurant => {
            return (
              restaurant.restaurant_name
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) >= 0 &&
              Math.floor(restaurant.rating) === ratingFilter &&
              (restaurant.rating >= minRating && restaurant.rating <= maxRating)
            );
          });
        }
      } else {
        if (minRating === 0 && maxRating === 0) {
          resList = rl.filter(restaurant => {
            return (
              restaurant.restaurant_name
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) >= 0
            );
          });
        } else {
          resList = rl.filter(restaurant => {
            return (
              restaurant.restaurant_name
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) >= 0 &&
              (restaurant.rating >= minRating && restaurant.rating <= maxRating)
            );
          });
        }
      }

      return {
        ...state,
        filteredRestaurantList: resList
      };

    case FETCH_RESTAURANT_DATA:
      const reviewsList =
        action.payload.reviews.length > 0 ? [...action.payload.reviews] : [];
      const photo_url =
        action.payload.photo_url !== "" ? action.payload.photo_url : "";

      const list5 = state.filteredRestaurantList.map(restaurant => {
        if (restaurant.id === state.selectedRestaurant.id) {
          restaurant.reviews = reviewsList;
          restaurant.fetched = true;
          restaurant.photo_url = photo_url;
          return restaurant;
        }

        return restaurant;
      });

      const list6 = state.restaurantList.map(restaurant => {
        if (restaurant.id === state.selectedRestaurant.id) {
          restaurant.reviews = reviewsList;
          restaurant.photo_url = photo_url;
          restaurant.fetched = true;
          return restaurant;
        }

        return restaurant;
      });

      const selectedRestaurant = {
        ...state.selectedRestaurant,
        reviews: reviewsList,
        fetched: true,
        photo_url: photo_url
      };

      return {
        ...state,
        filteredRestaurantList: list5,
        restaurantList: list6,
        selectedRestaurant: selectedRestaurant
      };
    default:
      return state;
  }
}
