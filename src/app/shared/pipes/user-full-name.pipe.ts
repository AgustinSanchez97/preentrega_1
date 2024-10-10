import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../../features/dashboard/students/models';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: IStudent, ...args: unknown[]): unknown {
    return value.first_Name + " " + value.last_Name;
  }

}
