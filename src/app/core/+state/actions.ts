import { Action } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

export enum ActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward',
  UpsertQueryParams = '[Router] Upsert Query Params'
}

export class Go implements Action {
  readonly type = ActionTypes.Go;
  constructor(public payload: {
    path: any[];
    outlets?: {[key: string]: string};
    extras?: NavigationExtras;
  }) {}
}

export class Back implements Action {
  readonly type = ActionTypes.Back;
}

export class Forward implements Action {
  readonly type = ActionTypes.Forward;
}

export class UpsertQueryParams implements Action {
  readonly type = ActionTypes.UpsertQueryParams;
  constructor(public payload: { queryParams: Params }) {}
}


export type RouterActions =
  | Go
  | Back
  | Forward
  | UpsertQueryParams;
