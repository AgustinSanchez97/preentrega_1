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
  
  
  /*
  courses$ : ICourse[] = []
  students$: IStudent[] = []
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

  getById(id: string): Observable<ICourse > {
    //console.log("entro")
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
    //console.log(id,{...data})
    return this.httpClient
      .patch<ICourse>(`${this.baseURL}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()));
  }

  updateCourseAndStudentById(courseId: string, courseData: Partial<ICourse>,studentId: string, studentData: Partial<IStudent>) {
    //console.log(courseId,courseData,studentId,studentData)
    // this.httpClient
    //   .patch<IStudent>(`${this.baseURL}/students/${studentId}`, studentData)
    return this.httpClient
      .patch<ICourse>(`${this.baseURL}/courses/${courseId}`, courseData)
      .pipe(concatMap(() => this.getCourses()));
  }
      
}
