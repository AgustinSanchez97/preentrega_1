import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: IStudent[] = [];
  isLoading = false;
  
  
  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService
  ) {}
  

  
  openModal(editingUser?: IStudent): void {
    this.matDialog
    .open(UserDialogComponent, {
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
    
    onDelete(id: string) {
      if (confirm('Esta seguro?')) {
        // this.dataSource = this.dataSource.filter((user) => user.id !== id);
        this.isLoading = true;
        this.usersService.removeUserById(id).subscribe({
          next: (users) => {
            this.dataSource = users;
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
    
  handleUpdate(id: string, update: IStudent): void {
    this.isLoading = true;
    this.usersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
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
