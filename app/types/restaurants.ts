import { Dictionary } from './index';

export interface Restaurant {
  id: number;
  name: string;
}

export interface RestaurantState {
  all: Dictionary<Restaurant>;
  selectedId: number;
}

export interface Restaurants {
  restaurants: Array<Restaurant>;
}

export interface RestaurantHash {
  restaurants: Restaurant;
}
