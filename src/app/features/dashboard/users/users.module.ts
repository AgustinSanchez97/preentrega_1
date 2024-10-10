import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StudentsComponent } from '../students/students.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [StudentsComponent]
})
export class UsersModule { }
