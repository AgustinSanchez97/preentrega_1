import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRegistration } from './models';
import { map, Observable } from 'rxjs';
import { RegistrationActions } from './store/registration.actions';
import { selectIsLoadingRegistrations, selectLoadRegistrationsError, selectRegistrations } from './store/registration.selectors';
import { IStudent } from '../students/models';
import { ICourse } from '../courses/models';
import { selectCourses } from '../courses/store/course.selectors';
import { selectStudents } from '../students/store/student.selectors';
import { StudentActions } from '../students/store/student.actions';
import { CourseActions } from '../courses/store/course.actions';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../users/models';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.scss'
})
export class RegistrationsComponent {

  displayedColumns: string[] = ['id', 'studentId', 'courseId',"userId","registrationDate","actions"];


  dataSource: IRegistration[] = [];

  
  registrations$: Observable<IRegistration[]>;
  loadRegistrationsError$: Observable<Error | null>;
  isLoadingRegistrations$: Observable<boolean>;
  students$ : Observable<IStudent[]>
  courses$: Observable<ICourse[]>;

  registrationList: IRegistration[] = [];
  studentList: IStudent[] = [];
  courseList: ICourse[] = [];

  currentRegistration: IRegistration = {} as IRegistration;
  currentStudent: IStudent = {} as IStudent;
  currentCourse: ICourse={} as ICourse;

  authUser$: Observable<User | null>;
  userData : User= {} as User

  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadRegistrations());
    this.store.dispatch(StudentActions.loadStudents());
    this.store.dispatch(CourseActions.loadCourses());
  }
  
  registrationForm: FormGroup;


  constructor(private store: Store, private formBuilder: FormBuilder, private authService: AuthService) {


    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe((value) =>{ this.userData = value as User; })

    this.registrations$ = this.store.select(selectRegistrations)
    this.isLoadingRegistrations$ = this.store.select(selectIsLoadingRegistrations);
    this.loadRegistrationsError$ = this.store.select(selectLoadRegistrationsError);
    

    this.courses$ = this.store.select(selectCourses);
    this.students$ = this.store.select(selectStudents)

    this.registrations$.subscribe((value) =>{ this.dataSource = value;this.registrationList=value })
    this.courses$.subscribe((value) =>{ this.courseList = value; })
    this.students$.subscribe((value) =>{ this.studentList = value; })

    
    this.registrationForm = this.formBuilder.group({
      studentId: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
    });
  }
  buildSelectList(){
    this.courses$ = this.store.select(selectCourses);
    this.students$ = this.store.select(selectStudents)
    this.registrations$ = this.store.select(selectRegistrations)
    this.isLoadingRegistrations$ = this.store.select(selectIsLoadingRegistrations);
    this.loadRegistrationsError$ = this.store.select(selectLoadRegistrationsError);
}

  onDelete(registrationId:string) {
    if (confirm('Esta seguro?')) {
      this.currentRegistration = this.registrationList.find((registration)=> registration.id == registrationId) as IRegistration
      this.currentCourse = this.courseList.find((course) => course.id == this.currentRegistration.courseId) as ICourse
      this.currentStudent = this.studentList.find((student) => student.id == this.currentRegistration.studentId) as IStudent
      
      let newCourse = {...this.currentCourse}
      newCourse.studentsId = newCourse.studentsId.filter(student => student.toString() !== this.currentStudent.id)
      newCourse.students = []
      
      let newStudent = {...this.currentStudent}
      newStudent.coursesId = newStudent.coursesId.filter(course => course.toString() !== this.currentCourse.id)
      newStudent.courses= []
      
      this.store.dispatch(CourseActions.changeCourse({id:this.currentCourse.id,data:newCourse}))
      this.store.dispatch(StudentActions.changeStudent({id:this.currentStudent.id,data:newStudent}))
      this.store.dispatch(RegistrationActions.deleteRegistration({id:registrationId}))
    }
    this.buildSelectList()
  }

  onSubmit(courseId:string,studentId: string): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
    } 
    else 
    {
      this.currentCourse = this.courseList.find((course) => course.id == courseId) as ICourse
      this.currentStudent = this.studentList.find((student) => student.id == studentId) as IStudent
      
      if(this.currentCourse.studentsId.find(id => id == studentId) != undefined) return
      if(this.currentStudent.coursesId.find(id => id == courseId) != undefined) return

      
      let newCourse = {...this.currentCourse}
      let newStudentsList = []
      newStudentsList.push(...newCourse.studentsId,studentId)
      newCourse.studentsId = newStudentsList
      newCourse.students = []
      //ME ASEGURO QUE NO HAYA DUPLICADOS
      let newStudentsListUnique = new Set(newStudentsList);
      newCourse.studentsId = [...newStudentsListUnique]
      
      let newStudent = {...this.currentStudent}
      newStudent.coursesId = newStudent.coursesId.filter(course => course.toString() !== courseId)
      let newCoursesList = []
      newCoursesList.push(...newStudent.coursesId,courseId)
      newStudent.coursesId = newCoursesList
      newStudent.courses= []
      //ME ASEGURO QUE NO HAYA DUPLICADOS
      let newCoursesListUnique = new Set(newCoursesList);
      newStudent.coursesId = [...newCoursesListUnique]
      
      
      this.store.dispatch(CourseActions.changeCourse({id:this.currentCourse.id,data:newCourse}))
      this.store.dispatch(StudentActions.changeStudent({id:this.currentStudent.id,data:newStudent}))
      this.store.dispatch(RegistrationActions.createRegistration({studentId,courseId,userId:this.userData.id}));
      
      //SI HACIA ESTO MISMO PERO ELIMINANDO EN ONDELETE SE BUGEABA Y HACIA UN BUCLE INFINITO DE LLAMADAS. ERA EN EL MOMENTO DE LLAMAR A 1 Y DESPUES AL OTRO
      /*
      this.courses$.pipe(map(courses => courses.find(course => course.id == courseId)))
      .subscribe(course=>{
        //SI SOLO HAGO UN RETURN A VECES GENERA 2 VECES EL REGISTRO
        if(course?.studentsId.find(id => id == studentId) == undefined)
        {
        this.store.dispatch(RegistrationActions.createRegistration({studentId,courseId,userId:this.userData.id}));
        let newCourse = {...course} as ICourse
        let newStudentsList = []
        newStudentsList.push(...newCourse.studentsId,studentId)
        newCourse.studentsId = newStudentsList
        newCourse.students = []
        this.store.dispatch(CourseActions.changeCourse({id:courseId,data:newCourse}))
        
        this.students$.pipe(map(students => students.find(student => student.id == studentId)))
        .subscribe(student=>{
          let newStudent = {...student}as IStudent
          let newCoursesList = []
          newCoursesList.push(...newStudent.coursesId,courseId)
          newStudent.coursesId = newCoursesList
          let newCoursesListUnique = new Set(newCoursesList);
          newStudent.coursesId = [...newCoursesListUnique]
          newStudent.courses = []
          this.store.dispatch(StudentActions.changeStudent({id:studentId,data:newStudent}))
          })
        }
      })
      */
    }
    this.buildSelectList()
  }
}
