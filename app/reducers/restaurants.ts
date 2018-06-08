import reselect from 'reselect';
import { RootState, Dictionary } from '../types/index';
import { Review, Restaurant, RestaurantState } from '../types/restaurants';
import { RATE_ITEM, TRANSFORM_LIST, TRANSFORM_DETAIL, RateAction, DetailAction, ListAction } from '../actions/restaurants';
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

type Action = ListAction | DetailAction | RateAction;

export default ((state: RestaurantState, action: Action): RestaurantState => {
  switch(action.type) {
    case TRANSFORM_LIST: {
      const normalized = normalize(action.response, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...restaurants},
        reviews: {...state.reviews, ...reviews}
      }
    }
    case TRANSFORM_DETAIL: {
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
    case RATE_ITEM: {
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

const all = (state: RootState) => state.restaurants.all;
const selectedId = (state: RootState) => state.restaurants.selectedId;
const reviews = (state: RootState) => state.restaurants.reviews;

export const getSelectedId = createSelector(
  selectedId,
  (selectedId: number) => selectedId
);

export const getRestaurants = createSelector(
  all,
  (all: Dictionary<Restaurant>) => all
);

export const getSelectedRestaurant = createSelector(
  all,
  selectedId,
  (all: Dictionary<Restaurant>, selectedId: number) => all[selectedId]
);

export const getReviews = createSelector(
  reviews,
  getSelectedRestaurant,
  (reviews: Dictionary<Review>, selectedRestaurant: Restaurant) => {
    return selectedRestaurant.reviews.map((reviewId: number) => {
      return reviews[reviewId];
    });
  }
);
