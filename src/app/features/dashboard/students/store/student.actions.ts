import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent } from '../models';
import { ICourse } from '../../courses/models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    // Cargar Estudiantes
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: Error }>(),

    // Crear Estudiante
    'Create Student': props<{
      firstName: string;
      lastName: string;
      email: string;
      coursesId: string[];
    }>(),
    'Create Student Success': props<{ data: IStudent }>(),
    'Create Student Failure': props<{ error: Error }>(),

    // Eliminar Estudiante
    'Delete Student': props<{ id: string }>(),
    'Delete Student Success': props<{ data: IStudent[]}>(),
    'Delete Student Failure': props<{ error: Error }>(),
    
    
    // Cambiar Estudiante
    'Change Student': props<{ id: string; data:IStudent }>(),
    'Change Student Success': props<{ data: IStudent[]}>(),
    'Change Student Failure': props<{ error: Error }>(),
    
    // Eliminar Curso del Estudiante
    'Change Student From Course': props<{  studentId: string;studentData:IStudent; courseId: string;courseData:ICourse }>(),
    'Change Student From Course Success': props<{ data: IStudent[] }>(),
    'Change Student From Course Failure': props<{ error: Error }>(),
  }
});
