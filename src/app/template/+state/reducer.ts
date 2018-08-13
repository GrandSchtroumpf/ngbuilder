import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TreeElement } from '../models';
import { TemplateActions, TemplateActionTypes } from './actions';

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
    /** ADD */
    case TemplateActionTypes.AddElement: {
      return adapter.addOne(action.payload.element, state);
    }

    /** UPDATE */
    case TemplateActionTypes.UpdateElement: {
      return adapter.updateOne(action.payload.element, state);
    }

    /** LOAD */
    case TemplateActionTypes.LoadTree: {
      return adapter.addAll(action.payload.tree, state);
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
