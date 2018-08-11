import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TemplateActionTypes } from './template.actions';

@Injectable()
export class TemplateEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(TemplateActionTypes.LoadTemplates));

  constructor(private actions$: Actions) {}
}
