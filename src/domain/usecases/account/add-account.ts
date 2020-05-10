export interface AddAccountRequest {
  name: string
  cpf: string
  cellphone: string
  email: string
  password: string
}

export interface AddAccount {
  add (account: AddAccountRequest): Promise<boolean>
}
