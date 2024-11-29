import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { CourseActions } from './course.actions';
import { Action } from '@ngrx/store';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';
import { IStudent } from '../../students/models';


@Injectable()
export class CourseEffects {
  loadCourses$: Actions<Action<string>>;
  createCourse$: Actions<Action<string>>;
  createCourseSuccess$: Actions<Action<string>>;
  deleteCourse$: Actions<Action<string>>;
  deleteCourseSuccess$: Actions<Action<string>>;
  changeCourse$: Actions<Action<string>>;
  changeCourseSuccess$: Actions<Action<string>>;


  changeStudentFromCourse$: Actions<Action<string>>;
  changeStudentFromCourseSuccess$: Actions<Action<string>>;
  
  constructor(private actions$: Actions, private coursesService: CoursesService, private studentsService: StudentsService)
  {
    /*
    this.loadCourse$ = createEffect(() => {
      //console.log("hola")
      return this.actions$.pipe(
        ofType(CourseActions.loadCourse),
        concatMap((action) => 
        forkJoin([
          this.coursesService.getById(action.id), // Traer curso
          this.studentsService.getStudents()  // Traer estudiantes
        ]).pipe(
          //Success
          map(([course, students]) => {
              course.students = []
              course.studentsId.map(id =>
              {
                let studentFilter : any
                studentFilter = students.find(student => student.id === id.toString()) // filtrar estudiantes por id                
                course.students?.push(studentFilter)
              }
            )
            let courseFull = course

            return CourseActions.loadCourseSuccess({ data : courseFull });
            
          }),
          //Error
          catchError((error) => of(CourseActions.loadCourseFailure({ error })))
        )
      )
    )
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
              course.studentsId.map(id => 
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
    
    this.createCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.createCourse),
        concatMap((action) =>
          this.coursesService
            .createCourse({
              name: action.name
            })
            .pipe(
              map((data) => CourseActions.createCourseSuccess({ data })),
              catchError((error) =>
                of(CourseActions.createCourseFailure({ error }))
              )
            )
        )
      );
    });

    this.createCourseSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.createCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });
   

    this.deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.deleteCourse),
        concatMap((action) =>
          this.coursesService
            .removeCourseById(action.id)
            .pipe(
              map((data) => CourseActions.deleteCourseSuccess({ data })),
              catchError((error) =>
                of(CourseActions.createCourseFailure({ error }))
              )
            )
        )
      );
    });

    this.deleteCourseSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.deleteCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });


this.changeCourse$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(CourseActions.changeCourse),
    concatMap((action) =>
      
      this.coursesService
        .updateCourseById(action.id,action.data)
        .pipe(
          map((data) => CourseActions.changeCourseSuccess({ data })),
          catchError((error) =>
            of(CourseActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });
    
    this.changeCourseSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.changeCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });
      
    this.changeStudentFromCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.changeStudentFromCourse),
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
                  const coursesFull = courses.map(course => {
                    course.students = []
                    course.studentsId.map(id => 
                    {
                      let studentFilter : any
                      studentFilter = students.find(student => student.id === id.toString()) // filtrar estudiantes por id                
                      course.students?.push(studentFilter)
                    }
                  )
                return {...course};
               });
                
              return CourseActions.changeStudentFromCourseSuccess({ data : coursesFull });
              }),
              //Error
              catchError((error) => of(CourseActions.changeStudentFromCourseFailure({ error })))
            )
          )
        )
    });

    this.changeStudentFromCourseSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.changeStudentFromCourseSuccess),
        map(() => CourseActions.loadCourses())
      );
    });

/*
    this.changeStudentFromCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.changeStudentFromCourse),
        concatMap((action) =>
          forkJoin([
            this.studentsService.getById(action.studentId),  // Traer estudiante
            this.coursesService.getById(action.courseId), // Traer curso
            this.studentsService.getStudents(),
            this.coursesService.getCourses()
          ])
            .pipe(
              map(([student, course, students, courses]) => {
                if(course.studentsId.length == 0) 
                  {
                    student?.coursesId.push(action.courseId)
                    course.studentsId.push(action.studentId)
                    this.studentsService.updateStudentById(action.studentId,student as IStudent)
                    this.coursesService.updateCourseById(action.courseId, course)
                  }
                  const coursesFull = courses.map(course => {
                    course.students = []
                    course.studentsId.map(id => 
                    {
                      let studentFilter : any
                      studentFilter = students.find(student => student.id === id.toString()) // filtrar estudiantes por id                
                      course.students?.push(studentFilter)
                    }
                  )
                return {...course};
               });
                
              return CourseActions.changeStudentFromCourseSuccess({ data : coursesFull });
              }),
              //Error
              catchError((error) => of(CourseActions.changeStudentFromCourseFailure({ error })))
            )
          )
        )
    });*/



  }
}
