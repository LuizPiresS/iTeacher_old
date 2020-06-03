import { Schedule } from '../common/schedule.interface';

// Aulas marcada professor
export interface TeacherSchedule {
  id: string;
  description: string;
  schedule: Schedule;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
