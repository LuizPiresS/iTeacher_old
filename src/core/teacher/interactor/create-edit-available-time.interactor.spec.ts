import { defineNow, getNowISO } from '../../../utils/test.util';
import { Presenter } from '../../common/presenter.interface';
import { Subject } from '../../subject/subject';
import { AvailableTime } from '../available-time';
import { AvailableTimeRepository } from '../available-time.repository';
import { AvailableTimeRequest } from '../dto/available-time.request';
import { AvailableTimeResponse } from '../dto/available-time.response';
import { WeekDays } from '../enums/week-days.enum';
import { AvailableTimeDescriptionError } from '../error/create-available-time-description.error';
import { AvailableTimeEndTimeError } from '../error/create-available-time-end-time.error';
import { AvailableTimeStartTimeError } from '../error/create-available-time-start-time.error';
import { CreateEditAvailableTimeInteractor } from './create-edit-available-time.interactor';

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
  let interactor: CreateEditAvailableTimeInteractor;

  beforeAll(() => {
    interactor = new CreateEditAvailableTimeInteractor(
      presenterMock as Presenter<AvailableTimeResponse>,
      availableTimeRepositoryMock as AvailableTimeRepository,
    );
  });

  test('Espero um throw caso o description seja inválido', async () => {
    const mockAvailableTimeRequest: AvailableTimeRequest = {
      day: daysMock,
      description: '',
      subject: subjectMock,
      startTime: 'any_time',
      endTime: 'any_time',
    };

    await interactor.execute(mockAvailableTimeRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(AvailableTimeDescriptionError),
    );
  });

  test('Espero um throw caso o startTime seja inválido', async () => {
    const mockAvailableTimeRequest: AvailableTimeRequest = {
      day: daysMock,
      description: 'any_description',
      subject: subjectMock,
      startTime: '',
      endTime: 'any_time',
    };

    await interactor.execute(mockAvailableTimeRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(AvailableTimeStartTimeError),
    );
  });

  test('Espero um throw caso o endTime seja inválido', async () => {
    const mockAvailableTimeRequest: AvailableTimeRequest = {
      day: daysMock,
      description: 'any_description',
      subject: subjectMock,
      startTime: 'any_time',
      endTime: '',
    };

    await interactor.execute(mockAvailableTimeRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(AvailableTimeEndTimeError),
    );
  });
  test('Testa se a agenda foi cadastrado no sistema', async () => {
    defineNow('2020-05-20T00:00:00.000Z');

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

    await interactor.execute({
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
  });
});
