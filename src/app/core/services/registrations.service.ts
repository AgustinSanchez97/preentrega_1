import { Injectable } from '@angular/core';

import { concatMap, delay, map, Observable, of } from 'rxjs';
import { IRegistration } from '../../features/dashboard/registrations/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { generateRandomString } from '../../shared/utils';



@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}

  
  getRegistrations(): Observable<IRegistration[]> {
    return this.httpClient.get<IRegistration[]>(`${this.baseURL}/registrations`);
  }

  getById(id: string): Observable<IRegistration | undefined> {
    return this.httpClient.get<IRegistration>(`${this.baseURL}/registrations/${id}`);
  }

  createRegistration(data: Omit<IRegistration, 'id'| "registrationDate">): Observable<IRegistration> {
    return this.httpClient.post<IRegistration>(`${this.baseURL}/registrations`, {
      ...data,
      id: generateRandomString(8),
      registrationDate: new Date().toISOString(),
    });
  }

  removeRegistrationById(id: string): Observable<IRegistration[]> {
    return this.httpClient
      .delete<IRegistration>(`${this.baseURL}/registrations/${id}`)
      .pipe(concatMap(() => this.getRegistrations()));
  }

  updateRegistrationById(id: string, update: Partial<IRegistration>) {
    return this.httpClient
      .patch<IRegistration>(`${this.baseURL}/registrations/${id}`, update)
      .pipe(concatMap(() => this.getRegistrations()));
  }
}
