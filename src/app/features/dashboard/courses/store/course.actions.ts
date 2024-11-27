import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse } from '../models';
import { IStudent } from '../../students/models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    
    // Cargar Cursos
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),    
    'Load Courses Failure': props<{ error: Error }>(),

    // Cargar Curso
    /*
    'Load Course': props<{ id: string }>(),
    'Load Course Success': props<{ data: ICourse }>(),
    'Load Course Failure': props<{ error: Error }>(),
    */
    // Crear Curso
    'Create Course': props<{ name: string}>(),
    'Create Course Success': props<{ data: ICourse }>(),
    'Create Course Failure': props<{ error: Error }>(),


    // Eliminar Curso
    'Delete Course': props<{ id: string }>(),
    'Delete Course Success': props<{ data: ICourse[]}>(),
    'Delete Course Failure': props<{ error: Error }>(),
    
    
    // Cambiar Curso
    'Change Course': props<{ id: string; data:ICourse }>(),
    'Change Course Success': props<{ data: ICourse[]}>(),
    'Change Course Failure': props<{ error: Error }>(),

    // Eliminar Estudiante de Curso
    'Change Student From Course': props<{ studentId: string;studentData:IStudent; courseId: string;courseData:ICourse }>(),
    'Change Student From Course Success': props<{ data: ICourse[]}>(),
    'Change Student From Course Failure': props<{ error: Error }>(),
    
  }
});
