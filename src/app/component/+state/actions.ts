import { Action } from '@ngrx/store';
import { ICmptFile } from '../models';

export enum ActionTypes {
  LoadCmpts = '[Component] Load all Components from a module',
  AddCmpt = '[Component] Add One Component',
  UpdateCmpt = '[Component] Update One Component',
  DeleteCmpt = '[Component] Delete One Component',
  SelectCmpt = '[Component] Select One Component'
}

export class LoadCmpts implements Action {
  readonly type = ActionTypes.LoadCmpts;
  constructor(public payload: {module: string, cmpts: ICmptFile[]}) {}
}

export class AddCmpt implements Action {
  readonly type = ActionTypes.AddCmpt;
  constructor(public payload: {cmpt: ICmptFile}) {}
}

export class SelectCmpt implements Action {
  readonly type = ActionTypes.SelectCmpt;
  constructor(public payload: {path: string}) {}
}

export class UpdateCmpt implements Action {
  readonly type = ActionTypes.UpdateCmpt;
  constructor(public payload: {id: string, changes: Partial<ICmptFile>}) {}
}

export type CmptActions =
  | LoadCmpts
  | SelectCmpt
  | AddCmpt
  | UpdateCmpt;
