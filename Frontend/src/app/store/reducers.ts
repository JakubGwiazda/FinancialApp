import { createReducer, on } from '@ngrx/store';
import { getPriceChangesSuccess, getTrackedItems, getTrackedItemsSuccess } from './actions';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';

export interface IPriceChanges{
    cryptoName: string;
    price: number;
    priceChange: number;
    data: string;
}

export interface ICryptoState {
    trackedPairs: ITrackedPairs[];
    priceChanges: Record<number, IPriceChanges[]> ;
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