import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse} from '../models';
import { CoursesService } from '../../../../core/services/courses.service';
import { map, Observable } from 'rxjs';
import { on, Store } from '@ngrx/store';
import { selectCourses, selectIsLoadingCourses, selectLoadCoursesError } from '../store/course.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseActions } from '../store/course.actions';
import { IStudent } from '../../students/models';
import { selectStudents } from '../../students/store/student.selectors';
import { StudentActions } from '../../students/store/student.actions';
import { IRegistration } from '../../registrations/models';
import { RegistrationActions } from '../../registrations/store/registration.actions';
import { selectRegistrations } from '../../registrations/store/registration.selectors';
import { User } from '../../users/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styles: ``
})
export class CourseDetailComponent implements OnInit{

  idCourse: string;

  course?: ICourse;
  student?:IStudent

  //componente
  displayedColumns: string[] = ['id', 'name', 'Students', "actions"];  
  dataSource: IStudent[];
  
  registrations$: Observable<IRegistration[]>
  students$ : Observable<IStudent[]>
  courses$: Observable<ICourse[]>;
  loadCoursesError$: Observable<Error | null>;
  isLoadingCourses$: Observable<boolean>;

  //selectData: ICourse[];
  selectData: IStudent[];
  
  
  registrationList: IRegistration[] = [];
  studentList: IStudent[] = [];
  //courseList: ICourse[] = [];
  currentRegistration: IRegistration = {} as IRegistration;
  //currentStudent: IStudent = {} as IStudent;
  //currentCourse: ICourse={} as ICourse;

  authUser$: Observable<User | null>;
  userData : User= {} as User
  
  studentForm: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(RegistrationActions.loadRegistrations());
    this.store.dispatch(CourseActions.loadCourses());
    this.store.dispatch(StudentActions.loadStudents());
  }

  constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private authService: AuthService) {

    this.studentForm = this.formBuilder.group({
      studentId: [null, [Validators.required]],
    });
    
    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe((value) =>{ this.userData = value as User; })

    this.registrations$ = this.store.select(selectRegistrations)
    this.registrations$.subscribe((value) =>{ this.registrationList=value })
    this.students$ = this.store.select(selectStudents)
    this.students$.subscribe((value) =>{ this.studentList=value })


    this.courses$ = this.store.select(selectCourses);
    this.isLoadingCourses$ = this.store.select(selectIsLoadingCourses);
    this.loadCoursesError$ = this.store.select(selectLoadCoursesError);
    this.dataSource = []
    this.selectData = []
    this.idCourse = activatedRoute.snapshot.params['id'];

    this.courses$.pipe(map(courses => courses.find(course => course.id == this.idCourse)))
    .subscribe(course=>{
      let courseStudents = course?.students as IStudent[]
      this.dataSource = courseStudents
      this.course = course
    })

    this.buildSelectList()
    
  }
  //CONSTRUIR DATOS PARA LA TABLA Y DATOS PARA EL SELECT
  buildSelectList(){
    this.courses$ = this.store.select(selectCourses);
    this.isLoadingCourses$ = this.store.select(selectIsLoadingCourses);
    this.loadCoursesError$ = this.store.select(selectLoadCoursesError);

    this.courses$.pipe(map(courses => courses.find(course => course.id == this.idCourse)))
    .subscribe(course=>{
      let courseStudents = course?.students as IStudent[]
      this.dataSource = courseStudents
      this.course = course
      this.students$.subscribe((value) =>{
        this.selectData = value
        this.course?.studentsId.forEach(studentInCourse=> {
          let filteredUsers = this.selectData.filter((student)=> {
            return student.id != studentInCourse
        })
        this.selectData = filteredUsers
      })
    })
  })
}
  //BORRAR ESTUDIANTE
  onDelete(studentId: string) {
    if (confirm('Esta seguro?')) {
      this.currentRegistration = this.registrationList.find(registration=>registration.courseId === this.idCourse && registration.studentId === studentId) as IRegistration
      //console.log(this.currentRegistration)

      
      this.course = this.course as ICourse
      let newCourse = {...this.course}      
      newCourse.studentsId = newCourse.studentsId.filter(student => student.toString() !== studentId)
      newCourse.students = []

      this.findStudent(studentId)

      this.student = this.student as IStudent
      let newStudent = {...this.student}      
      newStudent.coursesId = newStudent.coursesId.filter(course => course.toString() !== this.course?.id)
      newStudent.courses= []

      this.store.dispatch(RegistrationActions.deleteRegistration({id:this.currentRegistration?.id}))
      this.store.dispatch(StudentActions.changeStudent({id:studentId,data:newStudent}))
      this.store.dispatch(CourseActions.changeCourse({id:this.idCourse,data:newCourse}))

      //FUNCIONABA PERO QUEDO DEPRECADO POR DAR DUPLICADOS. ERA UN INTENTO DE QUE NO GENERE DUPLICADOS
      //this.store.dispatch(CourseActions.changeStudentFromCourse({studentId:studentId,studentData:newStudent,courseId:this.idCourse,courseData:newCourse}))
      this.store.dispatch(CourseActions.loadCourses());
    }
  }
  //AGREGAR ESTUDIANTE
  onSubmit(studentId: string): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.findStudent(studentId)

      this.course = this.course as ICourse
      let newCourse = {...this.course}
      let newStudentsList = []
      newStudentsList.push(...newCourse.studentsId,studentId)
      newCourse.studentsId = newStudentsList

      //CREA LISTA UNICA SIN DUPLICADOS
      let newStudentsListUnique = new Set(newStudentsList);
      newCourse.studentsId = [...newStudentsListUnique]
      newCourse.students= []
      

      this.student = this.student as IStudent
      let newStudent = {...this.student}
      let newCoursesList = []
      newCoursesList.push(...newStudent.coursesId, this.course.id)
      //CREA LISTA UNICA SIN DUPLICADOS
      let newCoursesListUnique = new Set(newCoursesList);
      newStudent.coursesId = [...newCoursesListUnique]
      newStudent.courses= []
      
      if((this.registrationList.find(registration=>registration.courseId === this.course?.id && registration.studentId === studentId) as IRegistration) == undefined)
      {
        this.store.dispatch(RegistrationActions.createRegistration({studentId,courseId:this.course.id,userId:this.userData.id}));
      }

      this.store.dispatch(StudentActions.changeStudent({id:studentId,data:newStudent}))
      this.store.dispatch(CourseActions.changeCourse({id:this.idCourse,data:newCourse}))
      
      //FUNCIONABA PERO QUEDO DEPRECADO POR DAR DUPLICADOS. ERA UN INTENTO DE QUE NO GENERE DUPLICADOS
      //this.store.dispatch(CourseActions.changeStudentFromCourse({studentId:studentId,studentData:newStudent,courseId:this.idCourse,courseData:newCourse}))
      this.store.dispatch(CourseActions.loadCourses());
      
      //this.buildSelectList()
      this.studentForm.reset();
    }
  }

  findStudent(studentId:string)
  {
    this.student = this.studentList.find((student) => student.id == studentId) as IStudent
  }
}
