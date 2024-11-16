import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICourse } from './models';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCourses, selectIsLoadingCourses, selectLoadCoursesError } from './store/course.selectors';
import { CourseActions } from './store/course.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: ``
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'Students'];
  isLoading = false;
  dataSource: ICourse[];

  courses$: Observable<ICourse[]>;
  loadCoursesError$: Observable<Error | null>;
  isLoadingCourses$: Observable<boolean>;
  

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }
  


  constructor(private matDialog: MatDialog, private store: Store, private formBuilder: FormBuilder  ) {


    this.courses$ = this.store.select(selectCourses);
    
    this.isLoadingCourses$ = this.store.select(selectIsLoadingCourses);
    this.loadCoursesError$ = this.store.select(selectLoadCoursesError);
    this.dataSource = []
    this.courses$.subscribe((value) =>{ this.dataSource = value; })
    
    //console.log(this.courses$)

  }

}
