import { connect } from 'ember-redux';
import { RootState } from '../types/index';
import { getRestaurants } from '../reducers/restaurants';

const stateToComputed = (state: RootState) => ({
  restaurants: getRestaurants(state)
});

export default connect(stateToComputed)();
