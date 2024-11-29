import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { ICourse } from '../models';



interface courseDialogData {
  editingCourse?: ICourse;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styles: ``
})
export class CourseDialogComponent {

  courseForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: courseDialogData
  )
  {
    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }
  private get isEditing() {
    return !!this.data?.editingCourse;
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.isEditing
          ? this.data!.editingCourse!.id
          : generateRandomString(8),
      });
    }
  }
    
}
