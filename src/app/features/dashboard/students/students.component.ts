import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { StudentsService } from '../../../core/services/students.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'createdDate', 'actions'];
  isLoading = false;
  dataSource: IStudent[] = [];
  
  
  constructor(private matDialog: MatDialog, private studentsService: StudentsService) {}
  
  
  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.dataSource = students;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      // this.dataSource = this.dataSource.filter((user) => user.id !== id);
      this.isLoading = true;
      this.studentsService.removeStudentsById(id).subscribe({
        next: (students) => {
          this.dataSource = students;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
/*
  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }*/

  openModal(editingUser?: IStudent): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: IStudent): void {
    this.isLoading = true;
    this.studentsService.updateStudentsById(id, update).subscribe({
      next: (students) => {
        this.dataSource = students;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }



///////
/*
  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((student) => student.id !== id);
    }
  }*/
/*
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
    */
}
