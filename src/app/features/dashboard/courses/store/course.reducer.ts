import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';

export const courseFeatureKey = 'course';

export interface State {
  courses: ICourse[] ;
  isLoadingCourses: boolean;
  loadCoursesError: Error | null;
}

export const initialState: State = {
  courses: [],  
  isLoadingCourses: false,
  loadCoursesError: null
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

  //Carga de Curso
  /*
  on(CourseActions.loadCourse, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CourseActions.loadCourseSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(CourseActions.loadCourseFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),*/

  // Crear Curso
  
  on(CourseActions.createCourse, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CourseActions.createCourseSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(CourseActions.createCourseFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),

  on(CourseActions.deleteCourse, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CourseActions.deleteCourseSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(CourseActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),
/*
  on(CourseActions.deleteStudentfromCourse, (state) => {
    return{
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CourseActions.deleteStudentfromCourseSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
      isLoadingCourses: false,
      loadCoursesError: null,
    };
  }),
  on(CourseActions.deleteStudentfromCourseFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoadingCourses: false,
      loadCoursesError: action.error,
    };
  }),
*/


);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

