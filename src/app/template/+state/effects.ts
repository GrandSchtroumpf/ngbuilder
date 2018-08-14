import { TemplateService } from './../services/template.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
// NGRX
import { Store, select } from '@ngrx/store';
import { State } from '../../core/reducers';
import { Go } from '../../core/+state';
import * as fromTemplate from './actions';
import * as fromCmpt from '../../component/+state';
import { selectCurrentElement, selectTree, selectCurrentId } from './selectors';

import { map, catchError, withLatestFrom, switchMap, combineLatest } from 'rxjs/operators';
import { of } from 'rxjs';
import { TemplateParser, TemplateCompiler } from '../utils';

@Injectable()
export class TemplateEffects {

  @Effect()
  parseTemplate$ = this.actions$.pipe(
    ofType<fromTemplate.ParseTemplate>(fromTemplate.ActionTypes.ParseTemplate),
    map(action => this.parser.parse(action.payload.template)),
    map(tree => new fromTemplate.LoadTree({tree})),
    catchError(err => of(err))
  );

  @Effect()
  compileTree$ = this.actions$.pipe(
    ofType<fromTemplate.CompileTree>(fromTemplate.ActionTypes.CompileTree),
    map(action => this.compiler.compile(action.payload.tree)),
    withLatestFrom(this.store.pipe(select(fromCmpt.selectCurrentId))),
    map(([template, id]: [string, string]) => new fromCmpt.UpdateCmpt({
      id,
      changes: { path: id, template }
    })),
    catchError(err => of(err))
  );

  @Effect()
  selectElement$ = this.actions$.pipe(
    ofType<fromTemplate.SelectElement>(fromTemplate.ActionTypes.SelectElement),
    switchMap(action => this.store.pipe(select(selectCurrentElement))),
    map(el => new Go({
      path: [],
      outlets: { view: el.name }
    }))
  );

  @Effect()
  addElement$ = this.actions$.pipe(
    ofType<fromTemplate.AddElement>(fromTemplate.ActionTypes.AddElement),
    withLatestFrom(
      this.store.pipe(select(selectTree)),
      this.store.pipe(select(selectCurrentId))
    ),
    map(([{payload}, tree, index]) => {
      return this.service.addElement(payload.tag, tree, index);
    }),
    map(tree => new fromTemplate.UpsertTree({tree})),
    catchError(err => of(err))
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private service: TemplateService,
    private parser: TemplateParser,
    private compiler: TemplateCompiler
  ) {}
}
