import _ from 'lodash';
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
      const merged = _.extend({}, state.all, _.keyBy(restaurants, (r: Restaurant) => r.id));
      const mergedReviews = _.extend({}, state.reviews, _.keyBy(reviews, (r: Review) => r.id));
      return Object.assign({}, state, {
        all: merged,
        reviews: mergedReviews
      });
    }
    case TRANSFORM_DETAIL: {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      const merge = _.extend({}, state.all, restaurants);
      const mergeReviews = _.extend({}, state.reviews, _.keyBy(reviews, (r: Review) => r.id));
      return Object.assign({}, state, {
        all: merge,
        reviews: mergeReviews,
        selectedId: action.response.id
      });
    }
    case RATE_ITEM: {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      const rateMerge = _.extend({}, state.all, restaurants);
      const rateReviews = _.extend({}, state.reviews, _.keyBy(reviews, (r: Review) => r.id));
      return Object.assign({}, state, {
        all: rateMerge,
        reviews: rateReviews
      });
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
  (all: Dictionary<Restaurant>, selectedId: number) => _.get(all, selectedId)
);

export const getReviews = createSelector(
  reviews,
  getSelectedRestaurant,
  (reviews: Dictionary<Review>, selectedRestaurant: Restaurant) => {
    return _.map(selectedRestaurant.reviews, (reviewId: number) => {
      return _.get(reviews, reviewId);
    });
  }
);
