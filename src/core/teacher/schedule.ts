import { Schedule } from '../schedule/schedule';

// Aulas marcada professor
export interface TeacherSchedule {
  id: string;
  description: string;
  schedule: Schedule;
}
