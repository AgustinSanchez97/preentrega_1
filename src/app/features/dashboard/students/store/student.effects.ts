import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { Action } from '@ngrx/store';
import { StudentsService } from '../../../../core/services/students.service';

@Injectable()
export class StudentEffects {
  loadStudents$: Actions<Action<string>>;
/*
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      // An EMPTY observable only emits completion. Replace with your own observable API request
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });
*/
  constructor(private actions$: Actions, private studentsService: StudentsService) {

    this.loadStudents$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        concatMap(() => 
        this.studentsService.getStudents().pipe(
          //Success
          map((res) => StudentActions.loadStudentsSuccess({data:res})),
          //Error
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )
    });
  }
}
