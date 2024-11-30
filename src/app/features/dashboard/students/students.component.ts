import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { StudentsService } from '../../../core/services/students.service';
import { StudentActions } from './store/student.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoadingStudents, selectLoadStudentsError, selectStudents } from './store/student.selectors';
import { CourseActions } from '../courses/store/course.actions';
import { ICourse } from '../courses/models';
import { selectCourses } from '../courses/store/course.selectors';
import { IRegistration } from '../registrations/models';
import { selectRegistrations } from '../registrations/store/registration.selectors';
import { RegistrationActions } from '../registrations/store/registration.actions';
import { User } from '../users/models';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'name',"email", "actions"];
  dataSource: IStudent[];

  students$: Observable<IStudent[]>;
  loadStudentsError$: Observable<Error | null>;
  isLoadingStudents$: Observable<boolean>;
  
  courses$: Observable<ICourse[]>;
  coursesWithoutStudent: ICourse[];

  registrations$ :Observable<IRegistration[]>;
  registrationList: IRegistration[] = [];
  

  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadRegistrations());
    this.store.dispatch(StudentActions.loadStudents());
    this.store.dispatch(CourseActions.loadCourses());
  }
  
  authUser$: Observable<User | null>;
  userData : User= {} as User
  studentForm: FormGroup;

  constructor(private matDialog: MatDialog, private store: Store, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,private authService: AuthService)
  {

    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe((value) =>{ this.userData = value as User; })

    this.courses$= this.store.select(selectCourses)
    this.coursesWithoutStudent =[]
    this.courses$.subscribe((value) =>{ this.coursesWithoutStudent = [...value]; })

    this.registrations$ = this.store.select(selectRegistrations)
    this.registrations$.subscribe((value) =>{ this.registrationList=value })


    
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectIsLoadingStudents);
    this.loadStudentsError$ = this.store.select(selectLoadStudentsError);
    this.dataSource = []
    this.students$.subscribe((value) =>{ this.dataSource = value; })
    
    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }


/*
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      //console.log(this.studentForm.value)
      this.store.dispatch(StudentActions.createStudent(this.studentForm.value));
      this.studentForm.reset();
    }
  }*/

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      let result = {id}

      this.coursesWithoutStudent?.forEach(course=> {
        let filteredUsers = course.studentsId.filter((studentId)=> 
          {
            return studentId != id
          })
        let newCourse = {...course as ICourse} 
        newCourse.studentsId = filteredUsers
        newCourse.students = []
        this.store.dispatch(CourseActions.changeCourse({id:course.id,data:newCourse}))
    })

    let registrationListToDelete = this.registrationList.filter((registration)=>registration.studentId === id)
    registrationListToDelete.forEach(registration=>{
      this.store.dispatch(RegistrationActions.deleteRegistration({id:registration.id}))
    })

    
    this.store.dispatch(StudentActions.deleteStudent(result))
    this.store.dispatch(StudentActions.loadStudents());
    this.store.dispatch(CourseActions.loadCourses());
    }
  }
  
  
  openModal(editingStudent?: IStudent): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: {
          editingStudent,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingStudent) {
              this.handleUpdate(editingStudent.id, result);
            } else {
              this.store.dispatch(StudentActions.createStudent(result))
              this.store.dispatch(StudentActions.loadStudents());
            }
          }
        },
      });
  }
  
  handleUpdate(id: string, update: IStudent): void {
    this.store.dispatch(StudentActions.changeStudent({id, data:update}));
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }
}
