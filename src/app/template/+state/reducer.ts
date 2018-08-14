import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TreeElement } from '../models';
import { TemplateActions, ActionTypes } from './actions';

export interface State extends EntityState<TreeElement> {
  // additional entities state properties
  selectedId: number;
  template: string;
}

export const adapter: EntityAdapter<TreeElement> = createEntityAdapter<TreeElement>({
  selectId: (element: TreeElement) => element.index,
  sortComparer: (a: TreeElement, b: TreeElement) => a.index - b.index
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: 0,
  template: ''
});

export function reducer(
  state = initialState,
  action: TemplateActions
): State {
  switch (action.type) {

    /** UPSERT */
    case ActionTypes.UpsertTree: {
      return adapter.upsertMany(action.payload.tree, state);
    }

    /** UPDATE */
    case ActionTypes.UpdateElement: {
      return adapter.updateOne(action.payload.element, state);
    }

    /** LOAD */
    case ActionTypes.LoadTree: {
      return adapter.addAll(action.payload.tree, state);
    }

    /** SELECT */
    case ActionTypes.SelectElement: {
      return {...state, selectedId: action.payload.index};
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

