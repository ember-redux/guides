import { Dictionary } from './index';

export interface Review {
  id: number;
  rating: number;
}

export interface Restaurant {
  id: number;
  name: string;
  reviews: Array<number>;
}

export interface RestaurantState {
  all: Dictionary<Restaurant>;
  reviews: Dictionary<Review>;
  selectedId: number;
}

export interface Restaurants {
  restaurants: Array<Restaurant>;
}

export interface RestaurantHash {
  restaurants: Restaurant;
}
