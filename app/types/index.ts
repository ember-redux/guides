import { RestaurantState } from './restaurants';

export interface RootState {
  restaurants: RestaurantState;
}

export interface Dictionary<T> {
  [index: string]: T;
}
