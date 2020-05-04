import { AddAccountTeacherModel } from '../models/account-teacher/add-account-teacher-model'

export type AddAccountTeacherParams = Omit<AddAccountTeacherModel, 'id'>

export interface AddAccountTeacherController {
  add (account: AddAccountTeacherParams): Promise<AddAccountTeacherModel>
}
