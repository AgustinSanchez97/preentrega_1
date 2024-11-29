import { Injectable } from '@angular/core';

import { BehaviorSubject, map,  Observable,  of, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../features/dashboard/users/models';
import { AuthData } from '../../features/auth/models';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { selectAutheticatedUser } from '../../features/auth/store/auth.selectors';
import { AuthActions } from '../../features/auth/store/auth.actions';

@Injectable({  providedIn: 'root'})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser$ = this._authUser$.asObservable();
  //public authUser$ = Observable<User | null>


  private baseURL = environment.apiBaseURL;

  constructor(private router: Router, private httpClient: HttpClient, private store: Store) 
  {
    this.authUser$ = this.store.select(selectAutheticatedUser);
  }

  private handleAuthentication(users: User[]): User | null {
    if (!!users[0]) {
      this.store.dispatch(AuthActions.setAuthenticatedUser({ user: users[0] }));
      localStorage.setItem('token', users[0].token);
      return users[0];
    } else {      
      return null;
    }
  }

  login(data: AuthData): Observable<User> {
    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          if (user) return user;

          else throw new Error('Los datos son invalidos');
          
        })
      );
  }

  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {

    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          return !!user;
        })
      );
  }
}
