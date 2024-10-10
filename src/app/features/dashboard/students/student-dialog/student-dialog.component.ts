import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../models';

/*
interface UserDialogData {
  editingUser?: IStudent;
}*/

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: ``
})
export class StudentDialogComponent {

  studentForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    
  )
  {
    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
    //this.patchFormValue();
  }



  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentForm.value,
        id: this.isEditing
          ? this.data!.editingUser!.id
          : 1,
        createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt
          : new Date(),
      });
    }
}
