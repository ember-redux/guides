import { connect } from 'ember-redux';
import { RootState } from '../types/index';
import { getSelectedRestaurant } from '../reducers/restaurants';

const stateToComputed = (state: RootState) => ({
  restaurant: getSelectedRestaurant(state)
});

export default connect(stateToComputed)();
