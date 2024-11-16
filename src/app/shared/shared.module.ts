import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StudentFullNamePipe } from './pipes/student-full-name.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontmodifyDirective } from './directives/fontmodify.directive';
import { UserFullNamePipe } from './pipes/user-full-name.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentsInCoursePipe } from './pipes/students-in-course.pipe';


@NgModule({
  declarations: [
    StudentFullNamePipe,
    FontmodifyDirective,
    UserFullNamePipe,
    StudentsInCoursePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    StudentFullNamePipe,
    UserFullNamePipe,
    FontmodifyDirective,
    StudentsInCoursePipe
  ]
})
export class SharedModule { }
