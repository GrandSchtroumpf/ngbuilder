import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

export const selectState = createSelector(
  selectRouterState,
  (state) => state.state
);

export const selectModuleName = createSelector(
  selectState,
  (state: RouterStateUrl) => state.queryParams['module'] as string
);
