import { connect } from 'ember-redux';
import { RootState } from '../types/index';
import { getReviews } from '../reducers/restaurants';

const stateToComputed = (state: RootState) => ({
  reviews: getReviews(state)
});

export default connect(stateToComputed)();
