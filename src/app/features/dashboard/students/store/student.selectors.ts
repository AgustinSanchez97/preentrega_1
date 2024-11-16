import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.courses
);

export const selectIsLoadingCourses = createSelector(
  selectStudentState,
  (state) => state.isLoadingCourses
);

export const selectLoadCoursesError = createSelector(
  selectStudentState,
  (state) => state.loadCoursesError
);