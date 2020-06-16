import { Subject } from '../../subject/subject';
import { WeekDays } from '../enums/week-days.enum';

export interface AvailableTimeRequest {
  day: WeekDays;
  description: string;
  subject: Subject;
  startTime: string;
  endTime: string;
}
