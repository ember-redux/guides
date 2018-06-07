import { connect } from 'ember-redux';

const stateToComputed = (state) => ({
  restaurants: state.restaurants.all
});

export default connect(stateToComputed)();
