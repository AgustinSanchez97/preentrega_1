import { ActionReducerMap } from '@ngrx/store';
import {
    authFeatureKey,
    authReducer,
    AuthState,
} from "./auth.reducer"

interface RootState {
  [authFeatureKey]: AuthState;
}

const RootReducer: ActionReducerMap<RootState> = {
  [authFeatureKey]: authReducer,
};

export { RootReducer };