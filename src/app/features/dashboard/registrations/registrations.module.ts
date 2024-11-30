import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './store/registration.effects';

import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { registrationFeature } from './store/registration.reducer';
import { CourseEffects } from '../courses/store/course.effects';
import { StudentEffects } from '../students/store/student.effects';
import { studentFeature } from '../students/store/student.reducer';
import { courseFeature } from '../courses/store/course.reducer';

@NgModule({
  declarations: [
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    StoreModule.forFeature(registrationFeature),
    EffectsModule.forFeature([RegistrationEffects]),
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CourseEffects])

  ],
  exports:[RegistrationsComponent]
})
export class RegistrationsModule { }
