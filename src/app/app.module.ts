import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ReactiveFormStudentsComponent } from './components/reactive-form-students/reactive-form-students.component';
import { StudentDialogComponent } from './features/dashbord/students/student-dialog/student-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormStudentsComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
