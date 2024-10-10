import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';



const ELEMENT_DATA: IStudent[] = [
  {
    id: 'dbv3Da',
    first_Name: 'Goku',
    last_Name: 'Son',
    createdDate: new Date(),
    email: 'gokussj3@gmail.com',
  },
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'createdDate', 'actions'];
  dataSource = ELEMENT_DATA;
  isLoading = false;
  
  
  constructor(private matDialog: MatDialog) {}
  

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((student) => student.id !== id);
    }
  }
  openModal(editingStudent?: IStudent): void {
    this.matDialog      
      .open(StudentDialogComponent, {
        data: {
          editingStudent,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          
          if (!!result) {            
            if (editingStudent) {
              this.dataSource = this.dataSource.map((student) =>
                student.id === editingStudent.id ? { ...student, ...result } : student
              );
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });  
    }
}
