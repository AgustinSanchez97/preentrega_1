import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { TeachersComponent } from './features/dashboard/courses/teachers/teachers.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "courses",
        component: CoursesComponent,
        children: [
          {
            path: "teachers",
            component: TeachersComponent
          }
        ]
      }
    ]
  },
  {
    path: "**",
    redirectTo:"dashboard"
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
