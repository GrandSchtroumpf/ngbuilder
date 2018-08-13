import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TemplateActionTypes } from './actions';

@Injectable()
export class TemplateEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(TemplateActionTypes.LoadTree));

  constructor(private actions$: Actions) {}
}
