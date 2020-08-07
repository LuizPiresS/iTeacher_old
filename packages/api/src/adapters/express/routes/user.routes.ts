import { UpdateUserRequest } from './../../../core/user/dto/update-user.request'
import { SecurityAdapter } from '../../security.adapter'
import { ValidatorAdapter } from '../../validator.adapter'
import type { CreateUserRequest } from '../../../core/user/dto/create-user.request'
import { CreateUserInteractor } from '../../../core/user/interactor/create-user.interactor'
import { UserDataSource } from '../../../database/data-sources/user.data-source'
import app from '../../../app'
import { CreateUserPresenter } from '../presenters/create-user.presenter'
import { UpdateUserPresenter } from '../presenters/update-user.presenter'
import { UpdateUserInteractor } from '../../../core/user/interactor/update-user.interactor'

export function UserRoutes(): void {
  const repository = new UserDataSource()
  const validator = new ValidatorAdapter()
  const security = new SecurityAdapter()

  // app.get('/users', async () => {})

  app.post('/users', async (req, res) => {
    const presenter = new CreateUserPresenter(res)
    const interactor = new CreateUserInteractor(
      repository,
      presenter,
      validator,
      security
    )

    // Create a Request DTO
    const { name, cpf, birthdate, cellphone, email, password } = req.body
    const data: CreateUserRequest = {
      name,
      cpf,
      birthdate,
      cellphone,
      email,
      password
    }

    // Execute Interactor and Presenter
    await interactor.execute(data)
  })

  app.put('/users', async (req, res) => {
    const presenter = new UpdateUserPresenter(res)
    const interactor = new UpdateUserInteractor(
      repository,
      presenter,
      validator
    )

    // Create a Request DTO
    const { id, name, cpf, birthdate, cellphone, email } = req.body
    const data: UpdateUserRequest = {
      id,
      name,
      cpf,
      birthdate,
      cellphone,
      email
    }

    // Execute Interactor and Presenter
    await interactor.execute(data)
  })
}
