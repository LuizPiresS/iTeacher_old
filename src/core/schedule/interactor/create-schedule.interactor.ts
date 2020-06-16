import { Presenter } from '../../common/presenter.interface';
import { ScheduleRequest } from '../dto/schedule.request';
import { ScheduleResponse } from '../dto/schedule.response';
import { ScheduleDescriptionInvalidError } from '../errors/schedule-description.error';
import { ScheduleTitleInvalidError } from '../errors/schedule-title.error';
import { ScheduleRepository } from '../schedule.repository';
export class CreateScheduleInteractor {
  constructor(
    private readonly presenter: Presenter<ScheduleResponse>,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async execute(data: ScheduleRequest): Promise<void> {
    try {
      if (!data.title) {
        throw new ScheduleTitleInvalidError('Empty title field');
      }
      if (!data.description) {
        throw new ScheduleDescriptionInvalidError('Empty description field');
      }
      // Data persistence
      const {
        id,
        description,
        title,
        student,
        teacher,
        subject,
        date,
        startTime,
        endTime,
        createdAt,
      } = await this.scheduleRepository.save(data);

      await this.presenter.reply({
        id,
        student,
        teacher,
        subject,
        title,
        date,
        startTime,
        endTime,
        description,
        createdAt,
      });
    } catch (error) {
      this.presenter.throw(error);
    }
  }
}
