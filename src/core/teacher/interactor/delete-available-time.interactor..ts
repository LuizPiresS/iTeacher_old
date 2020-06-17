import { Presenter } from '../../common/presenter.interface';
import { AvailableTimeRepository } from '../available-time.repository';
import { DeleteAvailableTimeIDError } from '../error/delete-available-time-id.error';

export class DeleteAvailableTimeInteractor {
  constructor(
    private readonly presenter: Presenter<string>,
    private readonly repository: AvailableTimeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      // Data testing
      if (!id) {
        throw new DeleteAvailableTimeIDError('Invalid ID');
      }

      // Data delete
      await this.repository.delete(id);
      await this.presenter.reply(id);
    } catch (error) {
      this.presenter.throw(error);
    }
  }
}
