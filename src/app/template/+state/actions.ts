import { TreeElement } from './../models';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum TemplateActionTypes {
  LoadTree = '[Template] Load Tree',
  AddElement = '[Template] Add One Element',
  UpdateElement = '[Template] Update One Element'
}

export class LoadTree implements Action {
  readonly type = TemplateActionTypes.LoadTree;

  constructor(public payload: { tree: TreeElement[] }) {}
}

export class AddElement implements Action {
  readonly type = TemplateActionTypes.AddElement;

  constructor(public payload: { element: TreeElement }) {}
}


export class UpdateElement implements Action {
  readonly type = TemplateActionTypes.UpdateElement;

  constructor(public payload: { element: Update<TreeElement> }) {}
}


export type TemplateActions =
 | LoadTree
 | AddElement
 | UpdateElement;
