import { createReducer, on } from '@ngrx/store';
import { getPriceChangesSuccess, getTrackedItemsSuccess } from './actions';
import { ITrackedPairs } from '../pages/common/interfaces/ITrackedPairs';

export interface IPriceChanges{
    cryptoName: string;
    priceChange: number;
    priceInfo: IPriceInfo[];
}

export interface IPriceInfo{
  price: number;
  data: string;
}

export interface ICryptoState {
    trackedPairs: ITrackedPairs[];
    priceChanges: Record<number, IPriceChanges> ;
}

export const initialState: ICryptoState = {
  trackedPairs: [],
  priceChanges: []
};

export const itemsReducer = createReducer(
  initialState,
  on(getTrackedItemsSuccess, (state, { items }) => ({
    ...state,
    trackedPairs: items
  })),
  on(getPriceChangesSuccess, (state, { id, items }) => ({
    ...state,
    priceChanges: {
      ...state.priceChanges,
      [id]: items
    }
  })),
);