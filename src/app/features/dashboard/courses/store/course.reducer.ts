import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';

export const courseFeatureKey = 'course';


export interface State {
  courses: ICourse[];
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
  on(CourseActions.loadCourses, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),

);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

