import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';

@Injectable()
export class UserEffects {

  loadUsers$: Actions<Action<string>>;
  createUser$: Actions<Action<string>>;
  createUserSuccess$: Actions<Action<string>>;
  deleteUser$: Actions<Action<string>>;
  deleteUserSuccess$: Actions<Action<string>>;
  changeUser$: Actions<Action<string>>;
  changeUserSuccess$: Actions<Action<string>>;

  

  constructor(private actions$: Actions,private usersService: UsersService) 
  {

    this.loadUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loadUsers),
        concatMap(() => 
          this.usersService.getUsers().pipe(
            //Success
            map((res) => UserActions.loadUsersSuccess({data:res})),
            //Error
            catchError((error) => of(UserActions.loadUsersFailure({ error })))
          )
        )
      )
    });
    
    this.createUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.createUser),
        concatMap((action) =>
          this.usersService
            .createUser({
              firstName: action.firstName,
              lastName: action.lastName,
              email: action.email,
              password: action.password,
              role: action.role,
            })
            .pipe(
              map((data) => UserActions.createUserSuccess({ data })),
              catchError((error) =>
                of(UserActions.createUserFailure({ error }))
              )
            )
        )
      );
    });

    this.createUserSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });
   

    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUser),
        concatMap((action) =>
          this.usersService
            .removeUserById(action.id)
            .pipe(
              map((data) => UserActions.deleteUserSuccess({ data })),
              catchError((error) =>
                of(UserActions.createUserFailure({ error }))
              )
            )
        )
      );
    });

    this.deleteUserSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });


this.changeUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(UserActions.changeUser),
    concatMap((action) =>
      
      this.usersService
        .updateUserById(action.id,action.data)
        .pipe(
          map((data) => UserActions.changeUserSuccess({ data })),
          catchError((error) =>
            of(UserActions.createUserFailure({ error }))
          )
        )
      )
    );
  });
    
    this.changeUserSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.changeUserSuccess),
        map(() => UserActions.loadUsers())
      );
    });


  }
}
