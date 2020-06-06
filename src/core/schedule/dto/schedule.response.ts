import { Student } from '../../student/student';
import { Subject } from '../../subject/subject';
import { Teacher } from '../../teacher/teacher';
export interface ScheduleResponse {
  id: string;
  student: Student;
  teacher: Teacher;
  subject: Subject;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  createdAt: string;
}
