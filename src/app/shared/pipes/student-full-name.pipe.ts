import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../../features/dashboard/students/models';

@Pipe({
  name: 'studentFullName'
})
export class StudentFullNamePipe implements PipeTransform {

  transform(value: IStudent, ...args: unknown[]): unknown {
    return value.firstName + " " + value.lastName;
  }

}
