import { Injectable } from '@angular/core';

import { delay, map, Observable, of } from 'rxjs';
import { IStudent } from '../../features/dashboard/students/models';

let DATABASE: IStudent[] = [
  {
    id: 'dbv3Da',
    first_Name: 'Goku',
    last_Name: 'Son',
    createdDate: new Date(),
    email: 'gokussj3@gmail.com',
  },
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() {}

  getById(id: string): Observable<IStudent | undefined> {
    return this.getStudents().pipe(map((students) => students.find((u) => u.id === id)));
  }

  getStudents(): Observable<IStudent[]> {
    return new Observable((observer) => {
      setInterval(() => {
        // observer.error('Error al cargar los datos');
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }

  removeStudentsById(id: string): Observable<IStudent[]> {
    DATABASE = DATABASE.filter((student) => student.id != id);
    return of(DATABASE).pipe(delay(1000));
  }

  updateStudentsById(id: string, update: Partial<IStudent>) {
    DATABASE = DATABASE.map((student) =>
      student.id === id ? { ...student, ...update } : student
    );

    return new Observable<IStudent[]>((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }
}
