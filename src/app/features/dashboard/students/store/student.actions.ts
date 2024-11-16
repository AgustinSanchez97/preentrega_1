import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent } from '../models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    
    // El servidor respondio ok con las ventas...
    'Load Students Success': props<{ data: IStudent[] }>(),

    // El servidor responde con un error
    'Load Students Failure': props<{ error: Error }>(),
    
    
  }
});
