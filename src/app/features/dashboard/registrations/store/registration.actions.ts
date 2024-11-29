import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRegistration } from '../models';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    
    'load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: IRegistration[] }>(),
    'Load Registrations Failure': props<{ error: Error }>(),

    // Crear Registro
    'Create Registration': props<{
      studentId: string;
      courseId: string;
      userId: string;
    }>(),
    'Create Registration Success': props<{ data: IRegistration }>(),
    'Create Registration Failure': props<{ error: Error }>(),

    // Eliminar Registro
    'Delete Registration': props<{ id: string }>(),
    'Delete Registration Success': props<{ data: IRegistration[]}>(),
    'Delete Registration Failure': props<{ error: Error }>(),
    
    
  }
});
