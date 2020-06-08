import { SubjectRequisite } from './requisites/requisites.enum';
export interface Subject {
  id: string;
  name: string;
  description: string;
  requisites: SubjectRequisite;
}
