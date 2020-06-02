import { Schedule } from '../schedule/schedule';

// Aulas marcadas estudante
export interface StudentSchedule {
  id: string;
  description: string;
  schedule: Schedule;
}
