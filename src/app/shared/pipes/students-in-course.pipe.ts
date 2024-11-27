import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../features/dashboard/courses/models';
import { IStudent } from '../../features/dashboard/students/models';

@Pipe({
  name: 'studentsInCourse'
})
export class StudentsInCoursePipe implements PipeTransform {

  transform(students: IStudent[], ...args: unknown[]): unknown {
    let result : any = []
    students.forEach(student => {
      result.push(" " + student.lastName)
    });

    
    
    return result
  }

}
