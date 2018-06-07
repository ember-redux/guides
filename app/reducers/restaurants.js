import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  all: undefined,
  selectedId: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'RESTAURANTS:TRANSFORM_LIST': {
      const restaurants = _.keyBy(action.response, restaurant => restaurant.id);
      const merged = _.extend({}, state.all, restaurants);
      return Object.assign({}, state, {all: merged});
    }
    case 'RESTAURANTS:TRANSFORM_DETAIL': {
      const restaurant = {[action.response.id]: action.response};
      const merge = _.extend({}, state.all, restaurant);
      return Object.assign({}, state, {
        all: merge,
        selectedId: action.response.id
      });
    }
    default: {
      return state || initialState;
    }
  }
});

const all = state => state.restaurants.all;
const selectedId = state => state.restaurants.selectedId;

export const getRestaurants = createSelector(
  all,
  (all) => all
);

export const getSelectedRestaurant = createSelector(
  all,
  selectedId,
  (all, selectedId) => _.get(all, selectedId)
);
