import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: ``
})
export class CoursesComponent {

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

}
