import { Injectable } from '@angular/core';

import { concatMap, delay, map, Observable, of } from 'rxjs';
import { IStudent } from '../../features/dashboard/students/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { generateRandomString } from '../../shared/utils';



@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}

  
    getStudents(): Observable<IStudent[]> {
      return this.httpClient.get<IStudent[]>(`${this.baseURL}/students`);
    }

  getById(id: string): Observable<IStudent | undefined> {
    return this.httpClient.get<IStudent>(`${this.baseURL}/students/${id}`);
  }

  createStudent(data: Omit<IStudent, 'id'| "createdAt" | "coursesId">): Observable<IStudent> {
    return this.httpClient.post<IStudent>(`${this.baseURL}/students`, {
      ...data,
      id: generateRandomString(8),
      createdAt: new Date().toISOString(),
      coursesId:[]
    });
  }

  removeStudentById(id: string): Observable<IStudent[]> {
    return this.httpClient
      .delete<IStudent>(`${this.baseURL}/students/${id}`)
      .pipe(concatMap(() => this.getStudents()));
  }

  updateStudentById(id: string, update: Partial<IStudent>) {
    return this.httpClient
      .patch<IStudent>(`${this.baseURL}/students/${id}`, update)
      .pipe(concatMap(() => this.getStudents()));
  }
}
