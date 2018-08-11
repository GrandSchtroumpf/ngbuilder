import { NgModule } from '@angular/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ModuleActions, ModuleActionTypes } from './module.actions';

export interface State extends EntityState<NgModule> {
  // additional entities state properties
}

export const adapter: EntityAdapter<NgModule> = createEntityAdapter<NgModule>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ModuleActions
): State {
  switch (action.type) {
    case ModuleActionTypes.AddModule: {
      return adapter.addOne(action.payload.module, state);
    }

    case ModuleActionTypes.UpsertModule: {
      return adapter.upsertOne(action.payload.module, state);
    }

    case ModuleActionTypes.AddModules: {
      return adapter.addMany(action.payload.modules, state);
    }

    case ModuleActionTypes.UpsertModules: {
      return adapter.upsertMany(action.payload.modules, state);
    }

    case ModuleActionTypes.UpdateModule: {
      return adapter.updateOne(action.payload.module, state);
    }

    case ModuleActionTypes.UpdateModules: {
      return adapter.updateMany(action.payload.modules, state);
    }

    case ModuleActionTypes.DeleteModule: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ModuleActionTypes.DeleteModules: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ModuleActionTypes.LoadModules: {
      return adapter.addAll(action.payload.modules, state);
    }

    case ModuleActionTypes.ClearModules: {
      return adapter.removeAll(state);
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
