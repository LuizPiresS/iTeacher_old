import { Lessons } from '../lessons/lessons';
import { Files } from '../storage/files';

export interface Exercicies {
  id: string;
  name: string;
  description: string;
  file: Files;
  lesson: Lessons; // A qual lição pertence
}
