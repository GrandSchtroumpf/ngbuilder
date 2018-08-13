import * as fromComponent from './reducer';
import * as fromModule from '../../module/+state';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectState = createFeatureSelector<fromComponent.State>(
  'components'
);

export const selectComponentIds = createSelector(
  selectState,
  fromComponent.getSelectedId
);

export const selectAllCmpts = createSelector(
  selectState,
  fromModule.selectCurrentModule,
  (state, module) => {
    if (!module) { return []; }
    return module.cmptIds.map(id => state.entities[id]);
  }
);

export const selectCurrentCmpt = createSelector(
  selectState,
  (state) => state.entities[state.selectedId]
);
