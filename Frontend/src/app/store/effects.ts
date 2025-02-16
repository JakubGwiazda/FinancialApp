import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, from, map, mergeMap, of } from 'rxjs';
import {
  getTrackedItems,
  getTrackedItemsSuccess,
  getTrackedItemsFailure,
  getPriceChanges,
  getPriceChangesSuccess,
} from './actions';
import {
  CryptoDataService,
  GetCryptoDataQuery,
  SettingsService,
} from 'crypto-api/model';
import { ITrackedPairs } from '../common/interfaces/ITrackedPairs';
import { IPriceChanges } from './reducers';

@Injectable()
export class TrackerEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private cryptoService: CryptoDataService
  ) {}

  loadTrackedItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrackedItems),
      exhaustMap(() =>
        this.settingsService.getTrackerPairs().pipe(
          map((res) => {
            const trackedItems = res.value!.map(
              (p) =>
                ({
                  id: p.id,
                  cryptoCurrencySymbol: p.cryptoCurrencySymbol,
                  fiatCurrencySymbol: p.fiatCurrencySymbol,
                  collectData: p.collectData,
                } as ITrackedPairs)
            );
            return getTrackedItemsSuccess({ items: trackedItems });
          })
        )
      )
    )
  );

  leadPriceChangesData = createEffect(() =>
    this.actions$.pipe(
      ofType(getPriceChanges),
      exhaustMap(({ items }) =>
        from(items).pipe(
          mergeMap((item) => 
            this.cryptoService.getAvgPrices({ trackedPairId: item.id }).pipe(
              map((response) => {
                let items = response.value!.map(p => 
                  ({
                    cryptoName: p.name,
                    price: p.price,
                    priceChange: p.priceChange,
                    data: p.data
                  } as IPriceChanges))
                return getPriceChangesSuccess({ id: item.id, items });
              })
            )
          )
        )
      )
    )
  )
};
