import { connect } from 'ember-redux';
import { getReviews } from '../reducers/restaurants';

const stateToComputed = (state) => ({
  reviews: getReviews(state)
});

export default connect(stateToComputed)();
