import { TreeElement } from './../models/nodes';
import { Action } from '@ngrx/store';
import { TemplateActions, TemplateActionTypes } from './template.actions';

export interface State {
  template: string;
  tree: TreeElement[];
}

export const initialState: State = {
  template: '',
  tree: []
};

export function reducer(state = initialState, action: TemplateActions): State {
  switch (action.type) {

    case TemplateActionTypes.LoadTemplates:
      return state;


    default:
      return state;
  }
}
