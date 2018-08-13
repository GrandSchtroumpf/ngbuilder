import { Action } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

export enum ActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward',
  AddQueryParams = '[Router] Add Query Params'
}

export class Go implements Action {
  readonly type = ActionTypes.Go;
  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {}
}

export class Back implements Action {
  readonly type = ActionTypes.Back;
}

export class Forward implements Action {
  readonly type = ActionTypes.Forward;
}

export class UpdateQueryParams implements Action {
  readonly type = ActionTypes.AddQueryParams;
  constructor(public payload: { queryParams: Params }) {}
}


export type RouterActions =
  | Go
  | Back
  | Forward
  | UpdateQueryParams;
