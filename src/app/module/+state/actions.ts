import { IModuleFile } from './../models';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadModules = '[Module] Load All Modules',
  AddModule = '[Module] Add One Module',
  UpdateModule = '[Module] Update One Module',
  SelectModule = '[Module] Select One Module',
}

export class LoadModule implements Action {
  readonly type = ActionTypes.LoadModules;
  constructor(public payload: { modules: IModuleFile[] }) {}
}

export class AddModule implements Action {
  readonly type = ActionTypes.AddModule;
  constructor(public payload: {module: IModuleFile}) {}
}

export class UpdateModule implements Action {
  readonly type = ActionTypes.UpdateModule;
  constructor(public payload: {id: string, changes: Partial<IModuleFile>}) {}
}

export class SelectModule implements Action {
  readonly type = ActionTypes.SelectModule;
  constructor(public payload: { path: string }) {}
}

export type ModuleActions =
  | LoadModule
  | AddModule
  | UpdateModule
  | SelectModule;
