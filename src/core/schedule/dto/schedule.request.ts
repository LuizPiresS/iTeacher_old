import { Student } from '../../student/student';
import { Subject } from '../../subject/subject';
import { Teacher } from '../../teacher/teacher';

export interface ScheduleRequest {
  title: string;
  description: string;
  student: Student;
  teacher: Teacher;
  subject: Subject;
  date: number;
  startTime: string;
  endTime: string;
}
