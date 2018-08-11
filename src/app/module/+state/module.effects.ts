import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ModuleActionTypes } from './module.actions';

@Injectable()
export class ModuleEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(ModuleActionTypes.LoadModules));

  constructor(private actions$: Actions) {}
}
