import { defineNow, getNowISO } from '../../../utils/test.util';
import { Presenter } from '../../common/presenter.interface';
import { Subject } from '../../subject/subject';
import { AvailableTime } from '../available-time';
import { AvailableTimeRepository } from '../available-time.repository';
import { AvailableTimeResponse } from '../dto/available-time.response';
import { WeekDays } from '../enums/days.enum';
import { AvailableTimeInteractor } from './available-time.interactor';

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
  let interactor: AvailableTimeInteractor;

  beforeAll(() => {
    interactor = new AvailableTimeInteractor(
      presenterMock as Presenter<AvailableTimeResponse>,
      availableTimeRepositoryMock as AvailableTimeRepository,
    );
  });

  // beforeEach(() => {});

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
