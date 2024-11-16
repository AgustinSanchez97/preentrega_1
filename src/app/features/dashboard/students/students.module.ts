import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([StudentEffects])
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
