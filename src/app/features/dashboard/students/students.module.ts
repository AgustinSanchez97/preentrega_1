import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';

import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { courseFeature } from '../courses/store/course.reducer';
import { CourseEffects } from '../courses/store/course.effects';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects]),
    
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CourseEffects]),

  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
