import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { RegistrationActions } from './registration.actions';
import { Action } from '@ngrx/store';
import { RegistrationsService } from '../../../../core/services/registrations.service';

@Injectable()
export class RegistrationEffects {
  loadRegistrations$: Actions<Action<string>>;
  createRegistration$: Actions<Action<string>>;
  createRegistrationSuccess$: Actions<Action<string>>;
  deleteRegistration$: Actions<Action<string>>;
  deleteRegistrationSuccess$: Actions<Action<string>>;

  constructor(private actions$: Actions, private registrationsService: RegistrationsService,) {
    
    this.loadRegistrations$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(RegistrationActions.loadRegistrations),
      concatMap(() => 
        this.registrationsService.getRegistrations().pipe(
          //Success
          map((res) => RegistrationActions.loadRegistrationsSuccess({data:res})),
          //Error
          catchError((error) => of(RegistrationActions.loadRegistrationsFailure({ error })))
          )
        )
      )
    }
  )

    this.createRegistration$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RegistrationActions.createRegistration),
        concatMap((action) =>
          this.registrationsService
            .createRegistration({
              studentId: action.studentId,
              courseId: action.courseId,
              userId: action.userId
            })
            .pipe(
              map((data) => RegistrationActions.createRegistrationSuccess({ data })),
              catchError((error) =>
                of(RegistrationActions.createRegistrationFailure({ error }))
              )
            )
        )
      );
    });

    this.createRegistrationSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RegistrationActions.createRegistrationSuccess),
        map(() => RegistrationActions.loadRegistrations())
      );
    });
   

    this.deleteRegistration$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RegistrationActions.deleteRegistration),
        concatMap((action) =>
          
          this.registrationsService
            .removeRegistrationById(action.id)
            .pipe(
              map((data) => RegistrationActions.deleteRegistrationSuccess({ data })),
              catchError((error) =>
                of(RegistrationActions.createRegistrationFailure({ error }))
              )
            )
        )
      );
    });

    

    this.deleteRegistrationSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RegistrationActions.deleteRegistrationSuccess),
        map(() => RegistrationActions.loadRegistrations())
      );
    });
  }
}

