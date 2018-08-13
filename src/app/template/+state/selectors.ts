import {
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromTemplate from './reducer';
import * as fromComponent from '../../component/+state';

export const selectTemplateState = createFeatureSelector<fromTemplate.State>('template');

export const selectTemplate = createSelector(
  fromComponent.selectCurrentCmpt,
  (cmpt) => cmpt.template
);

/** Select all Elements as an array */
export const selectAllElements = createSelector(
  selectTemplateState,
  fromTemplate.selectAll
);

/** The Element at the index */
export const selectCurrentElement = createSelector(
  selectTemplateState,
  (state: fromTemplate.State) => {
    return state.entities[state.selectedId];
  }
);
