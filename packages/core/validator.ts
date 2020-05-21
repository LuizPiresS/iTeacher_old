export interface Validator {
  isEmail(email: string): boolean;
  isCPF(cpf: string): boolean;
  isPassword(password: string): boolean;
  isDate(date: string): boolean;
  isCellphone(cellphone: string): boolean;
}
