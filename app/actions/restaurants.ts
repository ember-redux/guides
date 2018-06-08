import { Restaurant } from '../types/restaurants';

export interface ListAction {
  type: 'RESTAURANTS:TRANSFORM_LIST';
  response: Array<Restaurant>;
}

export interface ListDispatch {
  (action: ListAction): void;
}

export interface DetailAction {
  type: 'RESTAURANTS:TRANSFORM_DETAIL';
  response: Restaurant;
}

export interface DetailDispatch {
  (action: DetailAction): void;
}

export interface RateAction {
  type: 'RESTAURANTS:RATE';
  response: Restaurant;
}

export interface RateDispatch {
  (action: RateAction): void;
}

export const RATE_ITEM = 'RESTAURANTS:RATE';
export const TRANSFORM_LIST = 'RESTAURANTS:TRANSFORM_LIST';
export const TRANSFORM_DETAIL = 'RESTAURANTS:TRANSFORM_DETAIL';
