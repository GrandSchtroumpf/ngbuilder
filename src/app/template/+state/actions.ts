import { TreeElement } from './../models';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ActionTypes {
  ParseTemplate = '[Template] Parse Template from Component',
  CompileTree = '[Template] Compile Tree into Template',
  LoadTree = '[Template] Load Tree',
  UpsertTree = '[Template] Upsert Tree',
  AddElement = '[Template] Add One Element',
  UpdateElement = '[Template] Update One Element',
  SelectElement = '[Template] Select One Element'
}

/**
 * TEMPLATE
 */

export class ParseTemplate implements Action {
  readonly type = ActionTypes.ParseTemplate;
  constructor(public payload: {template: string}) {}
}

export class CompileTree implements Action {
  readonly type = ActionTypes.CompileTree;
  constructor(public payload: {tree: TreeElement[]}) {}
}

/**
 * TREE
 */

export class LoadTree implements Action {
  readonly type = ActionTypes.LoadTree;
  constructor(public payload: { tree: TreeElement[] }) {}
}

export class UpsertTree implements Action {
  readonly type = ActionTypes.UpsertTree;
  constructor(public payload: { tree: TreeElement[] }) {}
}

export class AddElement implements Action {
  readonly type = ActionTypes.AddElement;
  constructor(public payload: { tag: string }) {}
}

export class UpdateElement implements Action {
  readonly type = ActionTypes.UpdateElement;
  constructor(public payload: { element: Update<TreeElement> }) {}
}

export class SelectElement implements Action {
  readonly type = ActionTypes.SelectElement;
  constructor(public payload: {index: number}) {}
}


export type TemplateActions =
 | ParseTemplate
 | CompileTree
 | LoadTree
 | UpsertTree
 | AddElement
 | UpdateElement
 | SelectElement;
