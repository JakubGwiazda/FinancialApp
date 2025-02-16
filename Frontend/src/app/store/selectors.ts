import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICryptoState } from './reducers';
import { AppState } from './state';

export const cryptoState = (state: AppState) =>  state.cryptoState;

export const getTrackedPairs = createSelector(
    cryptoState,
    (state: ICryptoState) => state.trackedPairs
);

export const selectPriceChanges = createSelector(
    cryptoState,
    (state: ICryptoState) => state.priceChanges
);
