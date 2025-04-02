import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, filter, from, map, mergeMap, of } from 'rxjs';
import {
  getTrackedItems,
  getTrackedItemsSuccess,
  getTrackedItemsFailure,
  getPriceChanges,
  getPriceChangesSuccess,
  loadingDataFinished,
} from './actions';
import { IPriceChanges, IPriceInfo } from './reducers';
import { CryptoDataService, SettingsService } from 'crypto-api/model/financial';
import { ITrackedPairs } from '../pages/common/interfaces/ITrackedPairs';

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
      exhaustMap(({ items, timePeriod }) =>
        from(items).pipe(
          mergeMap((item) =>
            this.cryptoService
              .getAvgPrices({ trackedPairId: item.id, timePeriod: timePeriod })
              .pipe(
                map((response) => {
                  let items = response.value!.priceData!.map(
                    (p) =>
                      ({
                        price: p.price,
                        data: p.data,
                      } as IPriceInfo)
                  );

                  let data = {
                    cryptoName: response.value?.name,
                    priceChange: response.value?.priceChange,
                    priceInfo: items,
                  } as IPriceChanges;
                  return getPriceChangesSuccess({ id: item.id, items: data });
                })
              )
          )
        )
      )
    )
  );
}
