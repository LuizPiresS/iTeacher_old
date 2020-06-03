import { Schedule } from '../common/schedule.interface';

// Aulas marcadas estudante
export interface StudentSchedule {
  id: string;
  description: string;
  schedule: Schedule;
}
