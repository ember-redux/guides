import { Restaurant } from '../types/restaurants';

export interface ListAction {
  type: 'RESTAURANTS:TRANSFORM_LIST';
  response: Array<Restaurant>;
}

export interface ListDispatch {
  (action: ListAction): void;
}

export const TRANSFORM_LIST = 'RESTAURANTS:TRANSFORM_LIST';
