import { Presenter } from '../../common/presenter.interface';
import { TeacherScheduleResponse } from '../dto/teacher-schedule.response';
import { TeacherScheduleRequest } from '../dto/teacher-schudule.request';
import { TeacherDescriptionInvalidError } from '../errors/teacher-schedule-description.error';
import { TeacherScheduleRepository } from '../teacher-schedule.repository';
export class TeacherScheduleInteractor {
  constructor(
    private readonly presenter: Presenter<TeacherScheduleResponse>,
    private readonly teacherScheduleRepository: TeacherScheduleRepository,
  ) {}

  async execute(data: TeacherScheduleRequest): Promise<void> {
    try {
      if (data.description === '') {
        throw new TeacherDescriptionInvalidError('Empty field');
      }
      // Data persistence
      const {
        id,
        description,
        schedule,
        createdAt,
      } = await this.teacherScheduleRepository.save(data);

      await this.presenter.reply({
        id,
        description,
        schedule,
        createdAt,
      });
    } catch (error) {
      this.presenter.throw(error);
    }
  }
}
