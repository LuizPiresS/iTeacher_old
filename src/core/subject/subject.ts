import { Requisits } from './requisits/requisits.enum';
export interface Subject {
  id: string;
  name: string;
  description: string;
  requisits: Requisits;
}
