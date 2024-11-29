import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, State } from './auth.reducer';


export const selectAuthState = createFeatureSelector<State>(authFeatureName);

export const selectAutheticatedUser = createSelector(
  selectAuthState,
  (state) => state.authenticatedUser
);