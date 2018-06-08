import fetch from 'fetch';
import { route } from 'ember-redux';
import { RestaurantHash } from '../../types/restaurants';
import { DetailDispatch, TRANSFORM_DETAIL } from '../../actions/restaurants';

type ParamsObject = {
  id: string
}

const model = (dispatch: DetailDispatch, params: ParamsObject) => {
  return fetch(`/api/restaurants/${params.id}`)
    .then((fetched: Response) => fetched.json())
    .then((response: RestaurantHash) => dispatch({
      type: TRANSFORM_DETAIL,
      response: response.restaurants
    }));
};

export default route({model})();
