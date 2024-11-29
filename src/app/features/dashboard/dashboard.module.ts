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


import { CoursesComponent } from './courses/courses.component';
import { StoreModule } from '@ngrx/store';
import { authFeature } from '../auth/store/auth.reducer';
import { RegistrationsModule } from './registrations/registrations.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    StudentsModule,
    StoreModule.forFeature(authFeature),
    RegistrationsModule
  ],
    
  exports:[DashboardComponent]
})
export class DashboardModule { 
  
}
