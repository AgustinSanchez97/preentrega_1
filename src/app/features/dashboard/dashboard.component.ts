import { Component } from '@angular/core';
import { User } from './users/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  role:string = "user";
  authUser$: Observable<User | null>;
  dataSource : User

  constructor(private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
    this.dataSource = {} as User
    this.authUser$.subscribe((value) =>{ this.dataSource = value as User; })
  }

  logout(): void {
    this.authService.logout();
  }
}
