import _ from 'lodash';
import reselect from 'reselect';
import { RootState, Dictionary } from '../types/index';
import { Restaurant, RestaurantState } from '../types/restaurants';
import { TRANSFORM_LIST, TRANSFORM_DETAIL, DetailAction, ListAction } from '../actions/restaurants';

const { createSelector } = reselect;

const initialState = {
  all: undefined,
  selectedId: undefined
};

type Action = ListAction | DetailAction;

export default ((state: RestaurantState, action: Action): RestaurantState => {
  switch(action.type) {
    case TRANSFORM_LIST: {
      const restaurants = _.keyBy(action.response, (restaurant: Restaurant) => restaurant.id);
      const merged = _.extend({}, state.all, restaurants);
      return Object.assign({}, state, {all: merged});
    }
    case TRANSFORM_DETAIL: {
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

const all = (state: RootState) => state.restaurants.all;
const selectedId = (state: RootState) => state.restaurants.selectedId;

export const getRestaurants = createSelector(
  all,
  (all: Dictionary<Restaurant>) => all
);

export const getSelectedRestaurant = createSelector(
  all,
  selectedId,
  (all: Dictionary<Restaurant>, selectedId: number) => _.get(all, selectedId)
);
