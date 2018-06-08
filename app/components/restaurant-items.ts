import { connect } from 'ember-redux';
import { RootState } from '../types/index';

const stateToComputed = (state: RootState) => ({
  restaurants: state.restaurants.all
});

export default connect(stateToComputed)();
