import { Subject } from '../subject/subject';

export type Compromise = {
  date: string;
  startTime: string;
  endTime: string;
};

export interface Schedule {
  id: string;
  name: string;
  description: string;
  local: string;
  compromise: Compromise; // Data e hora de inicio e final da aula
  subject: Subject;
}
