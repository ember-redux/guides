import { RestaurantState } from './restaurants';
import { ImmutableObject } from 'seamless-immutable';

export type ImmutableState<T> = ImmutableObject<T> & T;

export interface RootState {
  restaurants: RestaurantState;
}

export interface Dictionary<T> {
  [index: string]: T;
}
