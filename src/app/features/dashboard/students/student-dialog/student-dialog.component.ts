import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../models';


interface studentDialogData {
  editingStudent?: IStudent;
}

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
    @Inject(MAT_DIALOG_DATA) public data?: studentDialogData
  )
  {
    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
    //this.patchFormValue();
  }
  private get isEditing() {
    return !!this.data?.editingStudent;
  }


  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentForm.value,
        id: this.isEditing
          ? this.data!.editingStudent!.id
          : "asdf",//cambiar
        createdAt: this.isEditing
          ? this.data!.editingStudent!.createdDate
          : new Date(),
      });
    }
  }
}
