import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);

export const selectRegistrations = createSelector(
  selectRegistrationState,
  (state) => state.registrations
);

export const selectIsLoadingRegistrations = createSelector(
  selectRegistrationState,
  (state) => state.isLoadingRegistrations
);

export const selectLoadRegistrationsError = createSelector(
  selectRegistrationState,
  (state) => state.loadRegistrationsError
);
