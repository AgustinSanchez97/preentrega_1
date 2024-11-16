import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse } from '../models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    
    // El servidor respondio ok con las ventas...
    'Load Courses Success': props<{ data: ICourse[] }>(),

    // El servidor responde con un error
    'Load Courses Failure': props<{ error: Error }>(),
    
    
  }
});
