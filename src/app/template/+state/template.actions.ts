import { Action } from '@ngrx/store';

export enum TemplateActionTypes {
  LoadTemplates = '[Template] Load Templates'
}

export class LoadTemplates implements Action {
  readonly type = TemplateActionTypes.LoadTemplates;
}

export type TemplateActions = LoadTemplates;
