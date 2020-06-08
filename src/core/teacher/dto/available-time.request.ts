import { Subject } from '../../subject/subject';
import { WeekDays } from '../enums/days.enum';

export interface AvailableTimeRequest {
  day: WeekDays;
  description: string;
  subject: Subject;
  startTime: string;
  endTime: string;
}
