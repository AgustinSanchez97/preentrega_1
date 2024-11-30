import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../shared/shared.module';

import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { StoreModule } from '@ngrx/store';
import { courseFeature } from './store/course.reducer';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { studentFeature } from '../students/store/student.reducer';
import { StudentEffects } from '../students/store/student.effects';
import { RegistrationEffects } from '../registrations/store/registration.effects';
import { registrationFeature } from '../registrations/store/registration.reducer';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,

    StoreModule.forFeature(registrationFeature),
    EffectsModule.forFeature([RegistrationEffects]),
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CourseEffects])
  ],
  exports: [CoursesComponent]
})
export class CoursesModule {}
