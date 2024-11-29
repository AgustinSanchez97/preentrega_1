import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICourse } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCourses, selectIsLoadingCourses, selectLoadCoursesError } from './store/course.selectors';
import { CourseActions } from './store/course.actions';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { IStudent } from '../students/models';
import { StudentActions } from '../students/store/student.actions';
import { selectStudents } from '../students/store/student.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: ``
})

export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'Students', "actions"];
  dataSource: ICourse[];

  courses$: Observable<ICourse[]>;
  loadCoursesError$: Observable<Error | null>;
  isLoadingCourses$: Observable<boolean>;
  
  students$: Observable<IStudent[]>;
  studentsWithoutCourse: IStudent[];
  

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    this.store.dispatch(StudentActions.loadStudents());
  }
  
  courseForm: FormGroup;

  constructor(private matDialog: MatDialog, private store: Store, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.students$ = this.store.select(selectStudents)
    this.studentsWithoutCourse =[]
    this.students$.subscribe((value) =>{ this.studentsWithoutCourse = [...value]; })
    
    
    this.courses$ = this.store.select(selectCourses);
    this.isLoadingCourses$ = this.store.select(selectIsLoadingCourses);
    this.loadCoursesError$ = this.store.select(selectLoadCoursesError);
    this.dataSource = []
    this.courses$.subscribe((value) =>{ this.dataSource = value; })
    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }


  /*
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.store.dispatch(CourseActions.createCourse(this.courseForm.value));
      this.courseForm.reset();
    }
  }*/

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      let result = {id}

      this.studentsWithoutCourse?.forEach(student=> {
        let filteredUsers = student.coursesId.filter((courseId)=> 
          {
            return courseId != id
          })
        let newStudent = {...student as IStudent} 
        newStudent.coursesId = filteredUsers
        newStudent.courses = []
        console.log(newStudent)
        this.store.dispatch(StudentActions.changeStudent({id:student.id,data:newStudent}))
    })

      this.store.dispatch(CourseActions.deleteCourse(result))
      this.store.dispatch(StudentActions.loadStudents());
      this.store.dispatch(CourseActions.loadCourses());
    }
  }
  
  
  openModal(editingCourse?: ICourse): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingCourse) {
              this.handleUpdate(editingCourse.id, result);
            } else {
              this.store.dispatch(CourseActions.createCourse(result));
              this.store.dispatch(CourseActions.loadCourses());
            }
          }
        },
      });
  }
  
  
  handleUpdate(id: string, update: ICourse): void {
    
    this.store.dispatch(CourseActions.changeCourse({id, data:update}));
    //this.store.dispatch(CourseActions.createCourse(this.courseForm.value));
    
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

}
