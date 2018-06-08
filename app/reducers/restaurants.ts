import _ from 'lodash';
import { Restaurant, RestaurantState } from '../types/restaurants';
import { TRANSFORM_LIST, TRANSFORM_DETAIL, DetailAction, ListAction } from '../actions/restaurants';

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
