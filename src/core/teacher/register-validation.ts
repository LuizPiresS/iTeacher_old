import { ValidationStatus } from './status/validation-status.enum';
import { Teacher } from './teacher';

export interface RegisterValidation {
  id: string;
  document: Document;
  teacher: Teacher;
  status: ValidationStatus;
}
