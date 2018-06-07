import _ from 'lodash';
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
      const merged = _.extend({}, state.all, _.keyBy(restaurants, r => r.id));
      const mergedReviews = _.extend({}, state.reviews, _.keyBy(reviews, r => r.id));
      return Object.assign({}, state, {
        all: merged,
        reviews: mergedReviews
      });
    }
    case 'RESTAURANTS:TRANSFORM_DETAIL': {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      const merge = _.extend({}, state.all, restaurants);
      const mergeReviews = _.extend({}, state.reviews, _.keyBy(reviews, r => r.id));
      return Object.assign({}, state, {
        all: merge,
        reviews: mergeReviews,
        selectedId: action.response.id
      });
    }
    case 'RESTAURANTS:RATE': {
      const restaurant = {[action.response.id]: action.response};
      const normalized = normalize(restaurant, [restaurantSchema]);
      const { restaurants, reviews } = normalized.entities;
      const rateMerge = _.extend({}, state.all, restaurants);
      const rateReviews = _.extend({}, state.reviews, _.keyBy(reviews, r => r.id));
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
  (all, selectedId) => _.get(all, selectedId)
);

export const getReviews = createSelector(
  reviews,
  getSelectedRestaurant,
  (reviews, selectedRestaurant) => {
    return _.map(selectedRestaurant.reviews, reviewId => {
      return _.get(reviews, reviewId);
    });
  }
);
