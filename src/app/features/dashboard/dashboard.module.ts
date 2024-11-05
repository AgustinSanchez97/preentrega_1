import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StudentsModule } from './students/students.module';
import { MatListModule } from '@angular/material/list';

import { TeachersComponent } from './courses/teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    StudentsModule
  ],
    
  exports:[DashboardComponent]
})
export class DashboardModule { 
  
}
