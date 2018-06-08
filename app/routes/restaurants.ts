import fetch from 'fetch';
import { route } from 'ember-redux';
import { Restaurants } from '../types/restaurants';
import { ListDispatch, TRANSFORM_LIST } from '../actions/restaurants';

const model = (dispatch: ListDispatch) => {
  return fetch('/api/restaurants')
    .then((fetched: Response) => fetched.json())
    .then((response: Restaurants) => dispatch({
      type: TRANSFORM_LIST,
      response: response.restaurants
    }));
};

export default route({model})();
