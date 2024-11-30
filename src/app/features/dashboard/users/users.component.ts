import { Component, Input,OnInit } from '@angular/core';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserActions } from './store/user.actions';
import { Observable } from 'rxjs';
import { selectIsLoadingUsers, selectLoadUsersError, selectUsers } from './store/user.selectors';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: User[] = [];

  users$: Observable<User[]>;
  isLoadingUsers$: Observable<boolean>;
  loadUsersError$: Observable<Error | null>;
  
  authUser$: Observable<User | null>;
  userData : User= {} as User
  userForm: FormGroup;

  constructor(
    private matDialog: MatDialog, 
    private store: Store, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) 
  {
    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe((value) =>{ this.userData = value as User; })

    this.users$ = this.store.select(selectUsers);
    this.isLoadingUsers$ = this.store.select(selectIsLoadingUsers);
    this.loadUsersError$ = this.store.select(selectLoadUsersError);
    
    this.users$.subscribe((value) =>{ this.dataSource = value; })
    
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }


  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      let result = {id}
      this.store.dispatch(UserActions.deleteUser(result))
      this.store.dispatch(UserActions.loadUsers());
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }


  openModal(editingUser?: User): void {
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
              this.store.dispatch(UserActions.createUser(result))
              this.store.dispatch(UserActions.loadUsers());
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: User): void {
    this.store.dispatch(UserActions.changeUser({id, data:update}));
  }
  
}