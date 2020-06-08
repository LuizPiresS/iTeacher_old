import { Presenter } from '../../common/presenter.interface';
import { AvailableTimeRepository } from '../available-time.repository';
import { AvailableTimeRequest } from '../dto/available-time.request';
import { AvailableTimeResponse } from '../dto/available-time.response';

export class AvailableTimeInteractor {
  constructor(
    private readonly presenter: Presenter<AvailableTimeResponse>,
    private readonly repository: AvailableTimeRepository,
  ) {}

  async execute(data: AvailableTimeRequest): Promise<void> {
    try {
      // Data testing

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
        day,
        description,
        endTime,
        id,
        startTime,
        subject,
      });
    } catch (error) {
      this.presenter.throw(error);
    }
  }
}
