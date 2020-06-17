import { Presenter } from '../../common/presenter.interface';
import { AvailableTimeRepository } from '../available-time.repository';
import { AvailableTimeRequest } from '../dto/available-time.request';
import { AvailableTimeResponse } from '../dto/available-time.response';
import { AvailableTimeDescriptionError } from '../error/create-available-time-description.error';
import { AvailableTimeEndTimeError } from '../error/create-available-time-end-time.error';
import { AvailableTimeStartTimeError } from '../error/create-available-time-start-time.error';

export class CreateEditAvailableTimeInteractor {
  constructor(
    private readonly presenter: Presenter<AvailableTimeResponse>,
    private readonly repository: AvailableTimeRepository,
  ) {}

  async execute(data: AvailableTimeRequest): Promise<void> {
    try {
      // Data testing
      if (!data.description) {
        throw new AvailableTimeDescriptionError('Invalid description');
      }

      if (!data.startTime) {
        throw new AvailableTimeStartTimeError('Invalid start time');
      }

      if (!data.endTime) {
        throw new AvailableTimeEndTimeError('Invalid end time');
      }

      // Data persistence
      const {
        id,
        day,
        subject,
        startTime,
        endTime,
        description,
      } = await this.repository.save(data);
      await this.presenter.reply({
        id,
        day,
        description,
        endTime,
        startTime,
        subject,
      });
    } catch (error) {
      this.presenter.throw(error);
    }
  }
}
