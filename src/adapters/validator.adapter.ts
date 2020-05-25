import {
  isValidCPF,
  isValidEmail,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';

import { Validator } from '../core/common/validator';

export class ValidatorAdapter implements Validator {
  isUsername(value: string): boolean {
    if (!value || !value.trim()) {
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
      return false;
    }

    return true;
  }

  isEmail(email: string): boolean {
    return isValidEmail(email);
  }

  isCPF(cpf: string): boolean {
    return isValidCPF(cpf);
  }

  isPassword(password: string): boolean {
    if (!password) {
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    return true;
  }

  isDate(date: string): boolean {
    return !Number.isNaN(new Date(date).valueOf());
  }

  isCellphone(cellphone: string): boolean {
    return isValidPhone(cellphone);
  }
}
