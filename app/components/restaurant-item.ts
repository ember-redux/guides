import { connect } from 'ember-redux';
import { RootState } from '../types/index';
import _ from 'lodash';

const stateToComputed = (state: RootState) => ({
  restaurant: _.get(state.restaurants.all, state.restaurants.selectedId)
});

export default connect(stateToComputed)();
