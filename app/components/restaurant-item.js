import _ from 'lodash';
import { connect } from 'ember-redux';

const stateToComputed = (state) => ({
  restaurant: _.get(state.restaurants.all, state.restaurants.selectedId)
});

export default connect(stateToComputed)();
