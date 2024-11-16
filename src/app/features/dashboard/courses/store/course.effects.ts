import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { CourseActions } from './course.actions';
import { Action } from '@ngrx/store';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';
import { ICourse } from '../models';
import { IStudent } from '../../students/models';

@Injectable()
export class CourseEffects {
  loadCourses$: Actions<Action<string>>;

  // loadCourses$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(CourseActions.loadCourses),
  //     /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //     concatMap(() => EMPTY as Observable<{ type: string }>)
  //   );
  // });

  
  constructor(private actions$: Actions, private coursesService: CoursesService, private studentsService: StudentsService)
  {
    /*
    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.loadCourses),
        concatMap(() => 
        this.coursesService.getCourses().pipe(
          //Success
          map((res) => CourseActions.loadCoursesSuccess({data:res})),
          //Error
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    )
    });
    */

    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.loadCourses),
        concatMap(() => 
        forkJoin([
          this.coursesService.getCourses(), // Traer cursos
          this.studentsService.getStudents()  // Traer estudiantes
        ]).pipe(
          //Success
          map(([courses, students]) => {
            const coursesFull = courses.map(course => {
              course.students = []
              const studentsInCourse = course.studentsId.map(id => 
              {
                let studentFilter : any
                studentFilter = students.find(student => student.id === id.toString()) // filtrar estudiantes por id                
                course.students?.push(studentFilter)
              }
            )
            return {...course};
           });
            
          return CourseActions.loadCoursesSuccess({ data : coursesFull });
          }),
          //Error
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    )
    });
    
    
    
    
    //this.actions$.subscribe(console.log)
  }
}
