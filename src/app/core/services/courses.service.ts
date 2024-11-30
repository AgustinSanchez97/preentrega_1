import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { ICourse } from '../../features/dashboard/courses/models';

import { generateRandomString } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IStudent } from '../../features/dashboard/students/models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}
  
  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.baseURL}/courses`);
  }

  getById(id: string): Observable<ICourse > {
    return this.httpClient.get<ICourse>(`${this.baseURL}/courses/${id}`);
  }
  
  createCourse(data: Omit<ICourse, 'id' | "studentsId" | "students">): Observable<ICourse> {
    return this.httpClient.post<ICourse>(`${this.baseURL}/courses`, {
      ...data,
      id: generateRandomString(8),
      studentsId:[],
    });
  }

  removeCourseById(id: string): Observable<ICourse[]> {
    return this.httpClient
      .delete<ICourse>(`${this.baseURL}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }

  updateCourseById(id: string, data: Partial<ICourse>) {
    return this.httpClient
      .patch<ICourse>(`${this.baseURL}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()));
  }
}
