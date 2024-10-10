import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserFullNamePipe } from './pipes/user-full-name.pipe';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserFullNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    UserFullNamePipe
  ]
})
export class SharedModule { }
