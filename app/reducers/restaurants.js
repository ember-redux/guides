import reselect from 'reselect';
import { normalize, schema } from 'normalizr';

const { createSelector } = reselect;

const reviewSchema = new schema.Entity('reviews');
const restaurantSchema = new schema.Entity('restaurants', {
  reviews: [reviewSchema]
});

const initialState = {
  all: undefined,
  selectedId: undefined,
  reviews: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'RESTAURANTS:TRANSFORM_LIST': {
      const normalized = normalize(action.response, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...restaurants},
        reviews: {...state.reviews, ...reviews}
      }
    }
    case 'RESTAURANTS:TRANSFORM_DETAIL': {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...restaurants},
        reviews: {...state.reviews, ...reviews},
        selectedId: action.response.id
      }
    }
    case 'RESTAURANTS:RATE': {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...restaurants},
        reviews: {...state.reviews, ...reviews}
      }
    }
    default: {
      return state || initialState;
    }
  }
});

const all = state => state.restaurants.all;
const selectedId = state => state.restaurants.selectedId;
const reviews = state => state.restaurants.reviews;

export const getSelectedId = createSelector(
  selectedId,
  (selectedId) => selectedId
)

export const getRestaurants = createSelector(
  all,
  (all) => all
);

export const getSelectedRestaurant = createSelector(
  all,
  selectedId,
  (all, selectedId) => all[selectedId]
);

export const getReviews = createSelector(
  reviews,
  getSelectedRestaurant,
  (reviews, selectedRestaurant) => {
    return selectedRestaurant.reviews.map(reviewId => {
      return reviews[reviewId];
    });
  }
);
