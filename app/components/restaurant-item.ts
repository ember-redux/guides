import fetch from 'fetch';
import { connect } from 'ember-redux';
import { RootState } from '../types/index';
import { RestaurantHash } from '../types/restaurants';
import { RateDispatch, RATE_ITEM } from '../actions/restaurants';
import { getReviews, getSelectedId } from '../reducers/restaurants';

const stateToComputed = (state: RootState) => ({
  reviews: getReviews(state),
  selectedId: getSelectedId(state)
});

const dispatchToActions = (dispatch: RateDispatch) => {
  return {
    rate: (rating: number, selectedId: number) => {
      let params = {
        method: 'POST',
        body: JSON.stringify({rating: rating})
      };
      return fetch(`/api/restaurants/${selectedId}`, params)
        .then((fetched: Response) => fetched.json())
        .then((response: RestaurantHash) => dispatch({
          type: RATE_ITEM,
          response: response.restaurants
        }));
    }
  };
};

export default connect(stateToComputed, dispatchToActions)();
