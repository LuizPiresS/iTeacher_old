import { Archive } from '../storage/archive';
import { DocumentStatus } from './enums/document-status.enum';
import { Teacher } from './teacher';

export interface Documents {
  id: string;
  file: Archive;
  teacher: Teacher;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
