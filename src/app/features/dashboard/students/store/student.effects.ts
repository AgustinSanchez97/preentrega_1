import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { StudentActions } from './student.actions';
import { Action } from '@ngrx/store';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class StudentEffects {
  loadStudents$: Actions<Action<string>>;
  createStudent$: Actions<Action<string>>;
  createStudentSuccess$: Actions<Action<string>>;
  deleteStudent$: Actions<Action<string>>;
  deleteStudentSuccess$: Actions<Action<string>>;
  changeStudent$: Actions<Action<string>>;
  changeStudentSuccess$: Actions<Action<string>>;

  changeStudentFromCourse$: Actions<Action<string>>;
  changeStudentFromCourseSuccess$: Actions<Action<string>>;


/*
  loadStudents$ = createEffect(() => {
      concatMap(() => 
        this.studentsService.getStudents().pipe(
          //Success
          map((res) => StudentActions.loadStudentsSuccess({data:res})),
          //Error
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )

*/
  constructor(private actions$: Actions, private studentsService: StudentsService,private coursesService: CoursesService) {
    
    this.loadStudents$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        concatMap(() => 
          forkJoin([
            this.studentsService.getStudents(),  // Traer estudiantes
            this.coursesService.getCourses() // Traer cursos
          ]).pipe(
            //Success
            map(([students,courses ]) => {
              const studentsFull = students.map(student => {
                student.courses = []
                student.coursesId.map(id => 
                {
                  let courseFilter : any
                  courseFilter = courses.find(course => course.id === id.toString()) // filtrar estudiantes por id                
                  student.courses?.push(courseFilter)
                }
              )
              return {...student};
             });
              
            return StudentActions.loadStudentsSuccess({ data : studentsFull });
            }),
            //Error
            catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
          )
        )
      )
    });

    this.createStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.createStudent),
        concatMap((action) =>
          this.studentsService
            .createStudent({
              firstName: action.firstName,
              lastName: action.lastName,
              email: action.email
            })
            .pipe(
              map((data) => StudentActions.createStudentSuccess({ data })),
              catchError((error) =>
                of(StudentActions.createStudentFailure({ error }))
              )
            )
        )
      );
    });

    this.createStudentSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.createStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });
   

    this.deleteStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudent),
        concatMap((action) =>
          
          this.studentsService
            .removeStudentById(action.id)
            .pipe(
              map((data) => StudentActions.deleteStudentSuccess({ data })),
              catchError((error) =>
                of(StudentActions.createStudentFailure({ error }))
              )
            )
        )
      );
    });
    /*
        this.deleteStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudent),
        concatMap((action) =>
          forkJoin([
            this.studentsService.getStudents(),
            this.coursesService.getCourses(),
            //this.studentsService.removeStudentById(action.id),
            //this.coursesService.deletedStudentById(action.id)
          ])
            .pipe(
              map(([students]) => {
                
                return StudentActions.deleteStudentSuccess({data:students})
            }),
            //Error
            catchError((error) => of(StudentActions.deleteStudentFailure({ error })))
            )
        )
      );
    });
        
    */

    this.deleteStudentSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });

    
    this.changeStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.changeStudent),
        concatMap((action) =>
          
          this.studentsService
            .updateStudentById(action.id,action.data)
            .pipe(
              map((data) => StudentActions.changeStudentSuccess({ data })),
              catchError((error) =>
                of(StudentActions.createStudentFailure({ error }))
              )
            )
          )
        );
      });
    
    this.changeStudentSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.changeStudentSuccess),
        map(() => StudentActions.loadStudents())
      );
    });

    this.changeStudentFromCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.changeStudentFromCourse),
        concatMap((action) =>
          forkJoin([
            this.studentsService.getStudents(),
            this.coursesService.getCourses(),
            this.studentsService.getById(action.studentId),  // Traer estudiante
            this.coursesService.getById(action.courseId), // Traer curso
            this.studentsService.updateStudentById(action.studentId,action.studentData),
            this.coursesService.updateCourseById(action.courseId,action.courseData)
          ])
            .pipe(
              map(([students, courses]) => {
                  const studentsFull = students.map(student => {
                    student.courses = []
                    student.coursesId.map(id => 
                    {
                      let courseFilter : any
                      courseFilter = courses.find(course => course.id === id.toString()) // filtrar estudiantes por id                
                      student.courses?.push(courseFilter)
                    }
                  )
                return {...student};
               });
                
              return StudentActions.changeStudentFromCourseSuccess({ data : studentsFull });
              }),
              //Error
              catchError((error) => of(StudentActions.changeStudentFromCourseFailure({ error })))
            )
          )
        )
    });

    this.changeStudentFromCourseSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StudentActions.changeStudentFromCourseSuccess),
        map(() => StudentActions.loadStudents())
      );
    });


    

  }
}
