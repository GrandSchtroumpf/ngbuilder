import { CmptActions, ActionTypes } from './actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ICmptFile } from '../models';

export const adapter: EntityAdapter<ICmptFile> = createEntityAdapter<
  ICmptFile
>({
  selectId: (cmpt: ICmptFile) => cmpt.path
});

export interface State extends EntityState<ICmptFile> {
  selectedId: string;
}

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null
});

export function reducer(
  state = initialState,
  action: CmptActions
) {
  switch (action.type) {
    // Add
    case ActionTypes.AddCmpt: {
      return adapter.addOne(action.payload.cmpt, state);
    }

    // Select
    case ActionTypes.SelectCmpt: {
      return {...state, selectedId: action.payload.path };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
