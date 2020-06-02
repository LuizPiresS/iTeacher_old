import { Subject } from '../subject/subject';
import { Compromise } from './types/compromise.type';
export interface Schedule {
  id: string;
  name: string;
  description: string;
  local: string;
  compromise: Compromise; // Data e hora de inicio e final da aula
  subject: Subject;
}
