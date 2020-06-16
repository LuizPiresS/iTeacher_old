import { User } from '../auth/user';
import { Subject } from '../subject/subject';
import { RegisterValidation } from './register-validation';

export interface Teacher {
  id: string;
  user: User;
  validationDocs: RegisterValidation;
  subjects: Subject;
  rating: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
