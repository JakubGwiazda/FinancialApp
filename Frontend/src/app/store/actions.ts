import { createAction, props } from '@ngrx/store';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';
import { IPriceChanges } from './reducers';
import { TimePeriod } from 'crypto-api/model';
import { TimePeriodEnum } from '../common/enums/TimePeriodEnum';

export const getTrackedItems = createAction('GetTrackedItems');

export const getTrackedItemsSuccess = createAction(
  '[Tracker] Get Tracked Items Success',
  props<{ items: ITrackedPairs[] }>()
);

export const getTrackedItemsFailure = createAction(
  '[Tracker] Get Tracked Items Failure',
  props<{ error: any }>()
);

export const getPriceChanges = createAction(
    'GetPriceChanges', props<{items: ITrackedPairs[], timePeriod: TimePeriodEnum}>()
)

export const getPriceChangesSuccess = createAction(
    'GetPriceChangesSuccess',
    props<{ id: number, items: IPriceChanges }>()
  );
 
