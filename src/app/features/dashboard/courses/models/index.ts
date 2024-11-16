
import { IStudent } from '../../students/models';


export interface ICourse {
  id: string;
  name: string;
  studentsId: object[];
  students?: IStudent[];
}