import { Archive } from '../storage/archive';
import { Lessons } from './lessons';

export interface Exercises {
  id: string;
  name: string;
  description: string;
  file: Archive;
  lesson: Lessons;
}
