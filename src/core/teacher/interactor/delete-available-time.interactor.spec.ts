import { defineNow, getNowISO } from '../../../utils/test.util';
import { Presenter } from '../../common/presenter.interface';
import { Subject } from '../../subject/subject';
import { AvailableTime } from '../available-time';
import { AvailableTimeRepository } from '../available-time.repository';
import { AvailableTimeResponse } from '../dto/available-time.response';
import { WeekDays } from '../enums/week-days.enum';
import { DeleteAvailableTimeIDError } from '../error/delete-available-time-id.error';
import { CreateEditAvailableTimeInteractor } from './create-edit-available-time.interactor';
import { DeleteAvailableTimeInteractor } from './delete-available-time.interactor.';
const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const subjectMock = {} as Subject;
const daysMock = {} as WeekDays;

const availableTimeRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('AvailableTimeInteractor', () => {
  let interactorCreate: CreateEditAvailableTimeInteractor;
  let interactorDelete: DeleteAvailableTimeInteractor;

  beforeAll(() => {
    interactorCreate = new CreateEditAvailableTimeInteractor(
      presenterMock as Presenter<AvailableTimeResponse>,
      availableTimeRepositoryMock as AvailableTimeRepository,
    );

    interactorDelete = new DeleteAvailableTimeInteractor(
      presenterMock as Presenter<string>,
      availableTimeRepositoryMock as AvailableTimeRepository,
    );
  });

  test('Espero um throw caso o startTime seja inválido', async () => {
    await interactorDelete.execute('');

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(DeleteAvailableTimeIDError),
    );
  });

  test('Testa se AvailableTime foi removido', async () => {
    defineNow('2020-05-20T00:00:00.000Z');

    // Salva o horário
    availableTimeRepositoryMock.save.mockImplementation(
      (data: DeepPartial<AvailableTime>): AvailableTime => {
        return {
          ...data,
          id: 'uuid',
          description: 'any_description',
          day: daysMock,
          subject: subjectMock,
          startTime: getNowISO(),
          endTime: getNowISO(),
          createdAt: getNowISO(),
        } as AvailableTime;
      },
    );

    await interactorCreate.execute({
      description: 'any_description',
      day: daysMock,
      subject: subjectMock,
      startTime: getNowISO(),
      endTime: getNowISO(),
    });

    expect(presenterMock.throw).not.toBeCalled();
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      day: daysMock,
      description: 'any_description',
      subject: subjectMock,
      startTime: getNowISO(),
      endTime: getNowISO(),
    });

    // Deleta horário

    availableTimeRepositoryMock.delete.mockImplementation(
      (id: string): void => {},
    );
    await interactorDelete.execute('uuid');

    expect(presenterMock.throw).not.toBeCalled();
  });
});
