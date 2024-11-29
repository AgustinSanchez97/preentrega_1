import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // Cargar Usuarios
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),    
    'Load Users Failure': props<{ error: Error }>(),


    // Crear Usuario
    'Create User': props<{firstName:string, lastName:string, email:string, password:string, role:string}>(),
    'Create User Success': props<{ data: User }>(),
    'Create User Failure': props<{ error: Error }>(),


    // Eliminar Usuario
    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ data: User[]}>(),
    'Delete User Failure': props<{ error: Error }>(),
    
    
    // Cambiar Usuario
    'Change User': props<{ id: string; data:User }>(),
    'Change User Success': props<{ data: User[]}>(),
    'Change User Failure': props<{ error: Error }>(),

    
    
  }
});
