import _ from 'lodash';
import { Restaurant, RestaurantState } from '../types/restaurants';
import { TRANSFORM_LIST, ListAction } from '../actions/restaurants';

const initialState = {
  all: undefined
};

export default ((state: RestaurantState, action: ListAction): RestaurantState => {
  switch(action.type) {
    case TRANSFORM_LIST: {
      const restaurants = _.keyBy(action.response, (restaurant: Restaurant) => restaurant.id);
      const merged = _.extend({}, state.all, restaurants);
      return Object.assign({}, state, {all: merged});
    }
    default: {
      return state || initialState;
    }
  }
});
