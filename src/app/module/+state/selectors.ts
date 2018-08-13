import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromModule from './reducer';

export const selectState = createFeatureSelector<fromModule.State>('modules');

export const selectAllModules = createSelector(
  selectState,
  fromModule.selectAll
);

export const selectCurrentModule = createSelector(
  selectState,
  (state: fromModule.State) => state.entities[state.selectedId]
);
