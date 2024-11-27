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

  courses$: Observable<ICourse[]>;
  loadCoursesError$: Observable<Error | null>;
  isLoadingCourses$: Observable<boolean>;

  //selectData: ICourse[];
  selectData: IStudent[];


  students$ : Observable<IStudent[]>
  studentForm: FormGroup;


  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    this.store.dispatch(StudentActions.loadStudents());
  }

  constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private courseService: CoursesService) {

    this.studentForm = this.formBuilder.group({
      studentId: [null, [Validators.required]],
    });
    

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

    this.students$ = this.store.select(selectStudents)
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
      //this.isLoading = true;
      
      this.course = this.course as ICourse
      let newCourse = {...this.course}      
      newCourse.studentsId = newCourse.studentsId.filter(student => student.toString() !== studentId)
      newCourse.students = []

      this.findStudent(studentId)

      this.student = this.student as IStudent
      let newStudent = {...this.student}      
      newStudent.coursesId = newStudent.coursesId.filter(course => course.toString() !== this.course?.id)

      this.store.dispatch(CourseActions.changeStudentFromCourse({studentId:studentId,studentData:newStudent,courseId:this.idCourse,courseData:newCourse}))
      //this.store.dispatch(CourseActions.changeCourse({id: this.idCourse, data:newCourse}));
      this.store.dispatch(CourseActions.loadCourses());
    }
  }
  //AGREGAR ESTUDIANTE
  onSubmit(studentId: string): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.course = this.course as ICourse
      let newCourse = {...this.course}
      let newStudentsList = []
      newStudentsList.push(...newCourse.studentsId,studentId)
      newCourse.studentsId = newStudentsList
      newCourse.students = []
      
      
      this.findStudent(studentId)

      this.student = this.student as IStudent
      let newStudent = {...this.student}
      let newCoursesList = []
      newCoursesList.push(...newStudent.coursesId, this.course.id)
      //CREA LISTA UNICA SIN DUPLICADOS
      let newCoursesListUnique = new Set(newCoursesList);
      newStudent.coursesId = [...newCoursesListUnique]

      this.store.dispatch(CourseActions.changeStudentFromCourse({studentId:studentId,studentData:newStudent,courseId:this.idCourse,courseData:newCourse}))
      //this.store.dispatch(CourseActions.changeCourse({id: this.idCourse, data:newCourse}));
      this.buildSelectList()
      this.studentForm.reset();
    }
  }

  findStudent(studentId:string)
  {
    this.students$.pipe(map(students => students.find(student => student.id == studentId)))
    .subscribe(student=>{
      this.student = student
    })
  }
  /*
  onDisplay() {
    this.store.dispatch(CourseActions.loadCourses());
    this.store.dispatch(StudentActions.loadStudents());
  }
  handleUpdate(id: string, update: ICourse): void {
    this.store.dispatch(CourseActions.changeCourse({id, data:update}));
  }
  */
}
