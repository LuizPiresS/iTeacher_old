import { Files } from '../storage/files';
import { DocumentStatus } from './status/document-status.enum';
import { Teacher } from './teacher';

export interface Documents {
  id: string;
  file: Files;
  teacher: Teacher;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
