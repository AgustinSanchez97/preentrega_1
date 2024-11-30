import { Component } from '@angular/core';
import { ICourse } from '../../courses/models';
import { IStudent } from '../models';
import { map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseActions } from '../../courses/store/course.actions';
import { StudentActions } from '../store/student.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectIsLoadingStudents, selectLoadStudentsError, selectStudents } from '../store/student.selectors';
import { selectCourses, selectIsLoadingCourses, selectLoadCoursesError } from '../../courses/store/course.selectors';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../users/models';
import { IRegistration } from '../../registrations/models';
import { selectRegistrations } from '../../registrations/store/registration.selectors';
import { RegistrationActions } from '../../registrations/store/registration.actions';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  idStudent: string;

  course?: ICourse;
  student?:IStudent
  courses$: Observable<ICourse[]>;
  students$ : Observable<IStudent[]>
  registrations$: Observable<IRegistration[]>


  //componente
  displayedColumns: string[] = ['id', 'name', "actions"];
  
  selectData: ICourse[];
  dataSource: ICourse[];
  
  isLoadingStudents$: Observable<boolean>;
  loadStudentsError$: Observable<Error | null>;

  courseForm: FormGroup;
  
  registrationList: IRegistration[] = [];
  courseList: ICourse[] = [];
  currentRegistration: IRegistration = {} as IRegistration;


  authUser$: Observable<User | null>;
  userData : User= {} as User

  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadRegistrations());
    this.store.dispatch(StudentActions.loadStudents());
    this.store.dispatch(CourseActions.loadCourses());
  }

  constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private authService: AuthService) {
    this.courseForm = this.formBuilder.group({
      courseId: [null, [Validators.required]],
    });
    
    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe((value) =>{ this.userData = value as User; })

    this.registrations$ = this.store.select(selectRegistrations)
    this.registrations$.subscribe((value) =>{ this.registrationList=value })
    this.courses$ = this.store.select(selectCourses)
    this.courses$.subscribe((value) =>{ this.courseList=value })

    
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectIsLoadingStudents);
    this.loadStudentsError$ = this.store.select(selectLoadStudentsError);
    this.dataSource = []
    this.selectData = []
    this.idStudent = activatedRoute.snapshot.params['id'];
    
    this.students$.pipe(map(students => students.find(student => student.id == this.idStudent)))
    .subscribe(student=>{
      let studentCourses = student?.courses as ICourse[]
      this.dataSource = studentCourses
      this.student = student
    })
    this.buildSelectList()
    
  }
  //CONSTRUIR DATOS PARA LA TABLA Y DATOS PARA EL SELECT
  buildSelectList(){
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectIsLoadingStudents);
    this.loadStudentsError$ = this.store.select(selectLoadStudentsError);
    
    this.students$.pipe(map(students => students.find(student => student.id == this.idStudent)))
    .subscribe(student=>{
      let studentCourses = student?.courses as ICourse[]
      this.dataSource = studentCourses
      this.student = student
      this.courses$.subscribe((value) =>{
        this.selectData = value
        this.student?.coursesId.forEach(studentInCourse=> {
          let filteredUsers = this.selectData.filter((course)=> {
            return course.id != studentInCourse
        })
        this.selectData = filteredUsers
      })
    })
  })
}
  //BORRAR ESTUDIANTE
  onDelete(courseId: string) {
    if (confirm('Esta seguro?')) {
      this.currentRegistration = this.registrationList.find(registration=>registration.courseId === courseId && registration.studentId === this.idStudent) as IRegistration
      this.store.dispatch(RegistrationActions.deleteRegistration({id:this.currentRegistration?.id}))
      
      this.student = this.student as IStudent
      let newStudent = {...this.student}      
      newStudent.coursesId = newStudent.coursesId.filter(course => course.toString() !== courseId)
      newStudent.courses= []

      this.findCourse(courseId)

      this.course = this.course as ICourse
      let newCourse = {...this.course}      
      newCourse.studentsId = newCourse.studentsId.filter(student => student.toString() !== this.idStudent)
      newCourse.students= []
      
      this.store.dispatch(CourseActions.changeCourse({id:courseId,data:newCourse}))
      this.store.dispatch(StudentActions.changeStudent({id:this.idStudent,data:newStudent}))
      
      //FUNCIONABA PERO QUEDO DEPRECADO POR DAR DUPLICADOS. ERA UN INTENTO DE QUE NO GENERE DUPLICADOS
      //this.store.dispatch(StudentActions.changeStudentFromCourse({studentId:this.idStudent,studentData:newStudent,courseId:courseId,courseData:newCourse}))
      this.store.dispatch(StudentActions.loadStudents())
      //this.buildSelectList()
    }
  }

  //AGREGAR ESTUDIANTE
  onSubmit(courseId: string): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {

      this.student = this.student as IStudent
      let newStudent = {...this.student}
      let newCoursesList = []
      newCoursesList.push(...newStudent.coursesId,courseId)
      newStudent.coursesId = newCoursesList
      
      //CREA LISTA UNICA SIN DUPLICADOS
      let newCoursesListUnique = new Set(newCoursesList);
      newStudent.coursesId = [...newCoursesListUnique]
      newStudent.courses = []
      
      this.store.dispatch(StudentActions.changeStudent({id:this.idStudent,data:newStudent}))
      
      this.findCourse(courseId)

      this.course = this.course as ICourse
      let newCourse = {...this.course}
      let newStudentsList = []
      newStudentsList.push(...newCourse.studentsId, this.student.id)

      //CREA LISTA UNICA SIN DUPLICADOS
      let newStudentsListUnique = new Set(newStudentsList);
      newCourse.studentsId = [...newStudentsListUnique]
      newCourse.students= []

      if((this.registrationList.find(registration=>registration.courseId === courseId && registration.studentId === this.student?.id) as IRegistration) == undefined)
        {
          this.store.dispatch(RegistrationActions.createRegistration({studentId:this.student.id,courseId,userId:this.userData.id}));
        }
  
      this.store.dispatch(CourseActions.changeCourse({id:courseId,data:newCourse}))
      
      //FUNCIONABA PERO QUEDO DEPRECADO POR DAR DUPLICADOS. ERA UN INTENTO DE QUE NO GENERE DUPLICADOS
      //this.store.dispatch(StudentActions.changeStudentFromCourse({studentId:this.student.id,studentData:newStudent,courseId:courseId,courseData:newCourse}))
      
      this.buildSelectList()
      this.courseForm.reset();
    }
  }

  findCourse(courseId:string)
  {
    this.course = this.courseList.find((course) => course.id == courseId) as ICourse
  }

}
