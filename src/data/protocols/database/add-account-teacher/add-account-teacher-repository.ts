import { AddAccountTeacherModel } from '@/domain/models/account-teacher/add-account-teacher-model'
import { AddAccountTeacherParams } from '@/domain/usecases/account-teacher/add-account-teacher'

export interface AddAccountTeacherRepository {
  add (accountData: AddAccountTeacherParams): Promise<AddAccountTeacherModel>
}
