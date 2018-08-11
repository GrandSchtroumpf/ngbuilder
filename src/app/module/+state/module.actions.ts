import { NgModule } from '@angular/core';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ModuleActionTypes {
  LoadModules = '[Module] Load Modules',
  AddModule = '[Module] Add Module',
  UpsertModule = '[Module] Upsert Module',
  AddModules = '[Module] Add Modules',
  UpsertModules = '[Module] Upsert Modules',
  UpdateModule = '[Module] Update Module',
  UpdateModules = '[Module] Update Modules',
  DeleteModule = '[Module] Delete Module',
  DeleteModules = '[Module] Delete Modules',
  ClearModules = '[Module] Clear Modules'
}

export class LoadModules implements Action {
  readonly type = ModuleActionTypes.LoadModules;

  constructor(public payload: { modules: NgModule[] }) {}
}

export class AddModule implements Action {
  readonly type = ModuleActionTypes.AddModule;

  constructor(public payload: { module: NgModule }) {}
}

export class UpsertModule implements Action {
  readonly type = ModuleActionTypes.UpsertModule;

  constructor(public payload: { module: NgModule}) {}
}

export class AddModules implements Action {
  readonly type = ModuleActionTypes.AddModules;

  constructor(public payload: { modules: NgModule[] }) {}
}

export class UpsertModules implements Action {
  readonly type = ModuleActionTypes.UpsertModules;

  constructor(public payload: { modules: NgModule[] }) {}
}

export class UpdateModule implements Action {
  readonly type = ModuleActionTypes.UpdateModule;

  constructor(public payload: { module: Update<NgModule> }) {}
}

export class UpdateModules implements Action {
  readonly type = ModuleActionTypes.UpdateModules;

  constructor(public payload: { modules: Update<NgModule>[] }) {}
}

export class DeleteModule implements Action {
  readonly type = ModuleActionTypes.DeleteModule;

  constructor(public payload: { id: string }) {}
}

export class DeleteModules implements Action {
  readonly type = ModuleActionTypes.DeleteModules;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearModules implements Action {
  readonly type = ModuleActionTypes.ClearModules;
}

export type ModuleActions =
 LoadModules
 | AddModule
 | UpsertModule
 | AddModules
 | UpsertModules
 | UpdateModule
 | UpdateModules
 | DeleteModule
 | DeleteModules
 | ClearModules;
