import { createFeature, createReducer, on} from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  courses: IStudent[];
  isLoadingCourses: boolean;
  loadCoursesError: Error | null;
}

export const initialState: State = {
  courses: [],  
  isLoadingCourses: false,
  loadCoursesError: null,
};

export const reducer = createReducer(
  initialState,
  
  //Carga de Cursos
  on(StudentActions.loadStudents, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),

);

export const courseFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});