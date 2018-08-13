import { Action } from '@ngrx/store';
import { CmptFile } from '../models';
import { ModuleFile } from './../../module/models';

export enum ActionTypes {
  LoadCmpts = '[Component] Load all Components from a module',
  AddCmpt = '[Component] Add One Component',
  UpsertCmpt = '[Component] Upsert One Component',
  DeleteCmpt = '[Component] Delete One Component',
  SelectCmpt = '[Component] Select One Component'
}

export class LoadCmpts implements Action {
  readonly type = ActionTypes.LoadCmpts;
  constructor(public payload: {module: string, cmpts: CmptFile[]}) {}
}

export class AddCmpt implements Action {
  readonly type = ActionTypes.AddCmpt;
  constructor(public payload: {cmpt: CmptFile}) {}
}

export class SelectCmpt implements Action {
  readonly type = ActionTypes.SelectCmpt;
  constructor(public payload: {path: string}) {}
}

export type CmptActions =
  | LoadCmpts
  | SelectCmpt
  | AddCmpt;
