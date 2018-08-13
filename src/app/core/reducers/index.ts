import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromModule from '../../module/+state';
import * as fromComponent from '../../component/+state';
import { RouterStateUrl } from '../+state';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  modules: fromModule.State;
  components: fromComponent.State;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  modules: fromModule.reducer,
  components: fromComponent.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
