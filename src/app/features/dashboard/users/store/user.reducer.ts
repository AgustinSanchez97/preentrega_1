import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  isLoadingUsers: boolean;
  loadUsersError: Error | null;
}

export const initialState: State = {
  users: [],  
  isLoadingUsers: false,
  loadUsersError: null
};

export const reducer = createReducer(
  initialState,
  
  //Carga de Cursos
  on(UserActions.loadUsers, (state) => {
    return{
      ...state,
      isLoadingUsers: true,
    }
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
      isLoadingUsers: false,
      loadUsersError: null,
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingUsers: false,
      loadUsersError: action.error,
    };
  }),

  // Crear Curso
  
  on(UserActions.createUser, (state) => {
    return{
      ...state,
      isLoadingUsers: true,
    }
  }),
  on(UserActions.createUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.data,
      isLoadingUsers: false,
      loadUsersError: null,
    };
  }),
  on(UserActions.createUserFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingUsers: false,
      loadUsersError: action.error,
    };
  }),

  on(UserActions.deleteUser, (state) => {
    return{
      ...state,
      isLoadingUsers: true,
    }
  }),
  on(UserActions.deleteUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.data,
      isLoadingUsers: false,
      loadUsersError: null,
    };
  }),
  on(UserActions.deleteUserFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingUsers: false,
      loadUsersError: action.error,
    };
  }),

);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

