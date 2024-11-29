import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../models';
import { UserActions } from '../store/user.actions';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { selectIsLoadingUsers, selectLoadUsersError, selectUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: ``
})
export class UserDetailComponent implements OnInit{
  
  idUser: string;

  user?: User;
  users$: Observable<User[]>;

  //componente
  displayedColumns: string[] = ['id', 'firstName','lastName', "email", "createdAt","role"];
  dataSource: User[] ;
  
  isLoadingUsers$: Observable<boolean>;
  loadUsersError$: Observable<Error | null>;

  //courseForm: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private authService: AuthService) {
    /*
    this.courseForm = this.formBuilder.group({
      courseId: [null, [Validators.required]],
    });
    */

   this.users$ = this.store.select(selectUsers);
   this.isLoadingUsers$ = this.store.select(selectIsLoadingUsers);
   this.loadUsersError$ = this.store.select(selectLoadUsersError);

   this.dataSource=[]

  this.idUser = activatedRoute.snapshot.params['id'];
  
  this.users$.pipe(map(users => users.find(user => user.id == this.idUser)))
    .subscribe(user=>{
      if(user != undefined) this.dataSource = [user]
      
      this.user = {...user as User}
    })
    
    this.buildSelectList()
    
  }

  //CONSTRUIR DATOS PARA LA TABLA
  buildSelectList(){
    this.users$ = this.store.select(selectUsers);
    this.isLoadingUsers$ = this.store.select(selectIsLoadingUsers);
    this.loadUsersError$ = this.store.select(selectLoadUsersError);

    
    this.users$.pipe(map(users => users.find(user => user.id == this.idUser)))
    .subscribe(user=>{
      if(user != undefined && this.dataSource.length == 0) this.dataSource = [user]
      this.user = {...user as User}
      
    })
  }
}
  