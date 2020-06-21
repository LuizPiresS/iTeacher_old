import { Student } from '../student/student';
import { Subject } from '../subject/subject';
import { Teacher } from '../teacher/teacher';
// Horarios marcados
export interface Schedule {
  id: string;
  student: Student;
  teacher: Teacher;
  subject: Subject;
  title: string;
  date: number;
  startTime: string;
  endTime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
