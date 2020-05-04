import { AddAccountTeacherModel } from '@/domain/models/account-teacher/add-account-teacher-model'
import { AddAccountTeacherParams } from '@/domain/usecases/account-teacher/add-account'

export interface AddAccountTeacherRepository {
  add(account: AddAccountTeacherParams): Promise<AddAccountTeacherModel>
}
