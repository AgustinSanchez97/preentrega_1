import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../features/dashboard/courses/models';

@Pipe({
  name: 'studentsInCourse'
})
export class StudentsInCoursePipe implements PipeTransform {

  transform(value: ICourse, ...args: unknown[]): unknown {
    //console.log(value.studentsId)
    return value
    //return value.studentsId.join(", ");
  }

}
