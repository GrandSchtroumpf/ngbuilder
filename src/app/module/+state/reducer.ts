import { ModuleActions, ActionTypes } from './actions';
import { IModuleFile } from './../models';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<IModuleFile> = createEntityAdapter<
  IModuleFile
>({
  selectId: (module: IModuleFile) => module.path
});

export interface State extends EntityState<IModuleFile> {
  selectedId: string;
}

export const initialState: State = adapter.getInitialState({
  selectedId: null
});

export function reducer(
  state = initialState,
  action: ModuleActions
) {
  switch (action.type) {
    // Add
    case ActionTypes.AddModule: {
      return adapter.addOne(action.payload.module, state);
    }

    // Load
    case ActionTypes.LoadModules: {
      return adapter.addAll(action.payload.modules, state);
    }

    // Update
    case ActionTypes.UpdateModule: {
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload.changes
      }, state);
    }

    // Select
    case ActionTypes.SelectModule: {
      return { ...state, selectedId: action.payload.path };
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
  selectTotal
} = adapter.getSelectors();
