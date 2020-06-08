import { Subject } from '../subject/subject';
import { WeekDays } from './enums/days.enum';

export interface AvailableTime {
  id: string;
  day: WeekDays;
  subject: Subject;
  startTime: string;
  endTime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
