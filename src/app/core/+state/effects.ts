import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// NGRX
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRouter from './actions';
import { State } from '../reducers';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterEffects {
  constructor(
    private router: Router,
    private store: Store<State>,
    private actions$: Actions
  ) {}

}
