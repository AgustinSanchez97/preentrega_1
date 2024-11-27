import { ICourse } from "../../courses/models";

export interface IStudent{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdDate?: Date;
    coursesId: string[];
    courses?: ICourse[];

}