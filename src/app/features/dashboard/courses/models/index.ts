import { IStudent } from '../../students/models';

export interface ICourse {
  id: string;
  name: string;
  studentsId: string[];
  students?: IStudent[];
}