import { AddAccountTeacherParams } from '@/domain/usecases/account-teacher/add-account-teacher'

export interface AddAccountTeacherRepository {
  add (accountData: AddAccountTeacherParams): Promise<boolean>
}
