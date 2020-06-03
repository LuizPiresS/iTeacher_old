import { Schedule } from '../../common/schedule.interface';

export interface TeacherScheduleResponse {
  id: string;
  description: string;
  schedule: Schedule;
  createdAt: string;
}
