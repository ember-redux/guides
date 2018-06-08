import { Dictionary } from './index';

export interface Restaurant {
  id: number;
  name: string;
}

export interface RestaurantState {
  all: Dictionary<Restaurant>;
}

export interface Restaurants {
  restaurants: Array<Restaurant>;
}
