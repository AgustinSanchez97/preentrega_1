import { createFeature, createReducer, on } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';
import { IRegistration } from '../models';

export const registrationFeatureKey = 'registration';

export interface State {
  registrations: IRegistration[];
  isLoadingRegistrations: boolean;
  loadRegistrationsError: Error | null;
}

export const initialState: State = {
  registrations: [],  
  isLoadingRegistrations: false,
  loadRegistrationsError: null,
};

export const reducer = createReducer(
  initialState,
  
  //Carga de Cursos
  on(RegistrationActions.loadRegistrations, (state) => {
    return{
      ...state,
      isLoadingRegistrations: true,
    }
  }),
  on(RegistrationActions.loadRegistrationsSuccess, (state, action) => {
    return {
      ...state,
      registrations: action.data,
      isLoadingRegistrations: false,
      loadRegistrationsError: null,
    };
  }),
  on(RegistrationActions.loadRegistrationsFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingRegistrations: false,
      loadRegistrationsError: action.error,
    };
  }),

  on(RegistrationActions.createRegistration, (state) => {
    return{
      ...state,
      isLoadingRegistrations: true,
    }
  }),
  on(RegistrationActions.createRegistrationSuccess, (state, action) => {
    return {
      ...state,
      registration: action.data,
      isLoadingRegistrations: false,
      loadRegistrationsError: null,
    };
  }),
  on(RegistrationActions.createRegistrationFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingRegistrations: false,
      loadRegistrationsError: action.error,
    };
  }),

  on(RegistrationActions.deleteRegistration, (state) => {
    return{
      ...state,
      isLoadingRegistrations: true,
    }
  }),
  on(RegistrationActions.deleteRegistrationSuccess, (state, action) => {
    return {
      ...state,
      registration: action.data,
      isLoadingRegistrations: false,
      loadRegistrationsError: null,
    };
  }),
  on(RegistrationActions.deleteRegistrationFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingRegistrations: false,
      loadRegistrationsError: action.error,
    };
  }),
);

export const registrationFeature = createFeature({
  name: registrationFeatureKey,
  reducer,
});

