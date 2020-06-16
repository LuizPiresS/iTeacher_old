import { ValidationStatus } from './enums/validation-status.enum';
import { Teacher } from './teacher';

export interface RegisterValidation {
  id: string;
  document: Document;
  teacher: Teacher;
  status: ValidationStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
