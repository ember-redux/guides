import { connect } from 'ember-redux';
import { getSelectedRestaurant } from '../reducers/restaurants';

const stateToComputed = (state) => ({
  restaurant: getSelectedRestaurant(state)
});

export default connect(stateToComputed)();
