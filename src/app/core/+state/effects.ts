import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRouter from './actions';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterEffects {

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<fromRouter.Go>(fromRouter.ActionTypes.Go),
    map(action => action.payload),
    tap(({ path = [], outlets, extras }) => {
      this.router.navigate(
        [...path, {outlets}],
        { queryParamsHandling: 'merge', ...extras }
      );
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions
  ) {}

}
