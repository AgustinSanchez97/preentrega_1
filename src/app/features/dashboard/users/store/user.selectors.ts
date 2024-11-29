import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);


export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectIsLoadingUsers = createSelector(
  selectUserState,
  (state) => state.isLoadingUsers
);

export const selectLoadUsersError = createSelector(
  selectUserState,
  (state) => state.loadUsersError
);