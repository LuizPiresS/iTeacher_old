import { InMemDataSource } from '../../infra/database/data-source/in-mem.data-source'
import { AccountEntity } from '../entities/account.entity'
import { Account } from './account'

describe('Account usecase', () => {
  const accountDataSource = new InMemDataSource()
  const accountUsecase = new Account(accountDataSource)

  const account: AccountEntity = {
    id: 'any_id',
    name: 'any_name',
    cpf: 'any_cpf',
    birthDate: 'any_birthDate',
    cellphone: 'any_cellphone',
    email: 'any_email',
    password: 'any_password',
    createdAt: 'any_date',
    updatedAt: 'any_date',
    deletedAt: 'any_date'
  }

  test('Test save', async () => {
    const result = await accountUsecase.save(account)
    expect(result).toBe(account.id)
  })

  test('Test delete', async () => {
    const id1 = await accountUsecase.save(account)

    const deleted1 = accountUsecase.delete(id1)
    expect(deleted1).toBeTruthy()
  })
})
