import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateRandomString } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  createUser(data: Omit<User, 'id'| "token" | "createdAt">): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...data,
      token: generateRandomString(20),
      createdAt: new Date().toISOString(),
    });
  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient
      .delete<User>(`${this.baseURL}/users/${id}`)
      .pipe(concatMap(() => this.getUsers()));
  }

  updateUserById(id: string, update: Partial<User>) {
    return this.httpClient
      .patch<User>(`${this.baseURL}/users/${id}`, update)
      .pipe(concatMap(() => this.getUsers()));
  }
}
