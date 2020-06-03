import { Schedule } from '../../common/schedule.interface';

export interface TeacherScheduleRequest {
  description: string;
  schedule: Schedule;
}
