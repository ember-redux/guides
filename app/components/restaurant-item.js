import fetch from 'fetch';
import { connect } from 'ember-redux';
import { getReviews, getSelectedId } from '../reducers/restaurants';

const stateToComputed = (state) => ({
  reviews: getReviews(state),
  selectedId: getSelectedId(state)
});

const dispatchToActions = function(dispatch) {
  return {
    rate: rating => {
      const selectedId = this.selectedId;
      const params = {
        method: 'POST',
        body: JSON.stringify({rating: rating})
      };
      return fetch(`/api/restaurants/${selectedId}`, params)
        .then(fetched => fetched.json())
        .then(response => dispatch({
          type: 'RESTAURANTS:RATE',
          response: response.restaurants
        }));
    }
  };
};

export default connect(stateToComputed, dispatchToActions)();
