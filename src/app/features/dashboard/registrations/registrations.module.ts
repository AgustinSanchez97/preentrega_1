import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './store/registration.effects';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([RegistrationEffects])
  ],
  exports:[RegistrationsComponent]
})
export class RegistrationsModule { }
