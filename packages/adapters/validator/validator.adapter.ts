import {
  isValidCPF,
  isValidEmail,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';

import { Validator } from '../../core/validator';

export class ValidatorAdapter implements Validator {
  isEmail(email: string): boolean {
    return isValidEmail(email);
  }

  isCPF(cpf: string): boolean {
    return isValidCPF(cpf);
  }
  isPassword(password: string): boolean {
    return true;
  }
  isDate(date: string): boolean {
    return true;
  }
  isCellphone(cellphone: string): boolean {
    return isValidPhone(cellphone);
  }
}
