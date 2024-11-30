import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../../dashboard/users/store/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  userForm: FormGroup;

  constructor(
    private store: Store, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) 
  {

    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      //console.log({...this.userForm.value})
      this.store.dispatch(UserActions.createUser({...this.userForm.value}))
      this.router.navigate(['/auth/login'])
      
    }
  }

}
