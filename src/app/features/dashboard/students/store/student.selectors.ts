import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
);

export const selectIsLoadingStudents = createSelector(
  selectStudentState,
  (state) => state.isLoadingStudents
);

export const selectLoadStudentsError = createSelector(
  selectStudentState,
  (state) => state.loadStudentsError
);