import { User } from '../auth/user';
import { Schedule } from '../schedule/schedule';
import { Subject } from '../subject/subject';
import { RegisterValidation } from './register-validation';

export interface Teacher {
  id: string;
  user: User;
  validationDocs: RegisterValidation; // status da validação
  subjects: Subject;
  schedule: Schedule;
  rating: number;
}
