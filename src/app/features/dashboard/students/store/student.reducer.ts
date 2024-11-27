import { createFeature, createReducer, on} from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  students: IStudent[];
  isLoadingStudents: boolean;
  loadStudentsError: Error | null;
}

export const initialState: State = {
  students: [],  
  isLoadingStudents: false,
  loadStudentsError: null,
};

export const reducer = createReducer(
  initialState,
  
  //Carga de Cursos
  on(StudentActions.loadStudents, (state) => {
    return{
      ...state,
      isLoadingStudents: true,
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.data,
      isLoadingStudents: false,
      loadStudentsError: null,
    };
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingStudents: false,
      loadStudentsError: action.error,
    };
  }),

  on(StudentActions.createStudent, (state) => {
    return{
      ...state,
      isLoadingStudents: true,
    }
  }),
  on(StudentActions.createStudentSuccess, (state, action) => {
    return {
      ...state,
      student: action.data,
      isLoadingStudents: false,
      loadStudentsError: null,
    };
  }),
  on(StudentActions.createStudentFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingStudents: false,
      loadStudentsError: action.error,
    };
  }),

  on(StudentActions.deleteStudent, (state) => {
    return{
      ...state,
      isLoadingStudents: true,
    }
  }),
  on(StudentActions.deleteStudentSuccess, (state, action) => {
    return {
      ...state,
      student: action.data,
      isLoadingStudents: false,
      loadStudentsError: null,
    };
  }),
  on(StudentActions.deleteStudentFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingStudents: false,
      loadStudentsError: action.error,
    };
  }),
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});