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
  
  courses$ : ICourse[] = []
  students$: IStudent[] = []

  /*
  getCourses(): Observable<ICourse[]> {
    this.httpClient.get<IStudent[]>(`${this.baseURL}/students/`).subscribe((students) =>
      { 
        this.students$ = students;
        this.httpClient.get<ICourse[]>(`${this.baseURL}/courses`).subscribe((courses:ICourse[])=>
        {
          this.courses$ = courses;
          this.courses$.forEach(course =>
          {
            course.students = []
            course.studentsId.forEach((studentKey)=>
              {
                let content = (students.find(studentObject => studentObject.id === studentKey.toString()))
                if(content == null) return

                content as IStudent == content
                course.students?.push(content)  
              }
            )
          }
        )
        console.log(of(courses) as Observable<ICourse[]>)
      }
    )      
  });
  return of(this.courses$) as Observable<ICourse[]>
    
    return this.httpClient.get<ICourse[]>(`${this.baseURL}/courses?_embed=student`);
  }*/
  
  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.baseURL}/courses?_embed=student`);
  }

  /*
    getById(id: string): Observable<User | undefined> {
      return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
    }
  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...data,
      role: 'USER',
      password: generateRandomString(8),
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
      */
}
