import { defineNow, getNowISO } from '../../../utils/test.util';
import { Presenter } from '../../common/presenter.interface';
import { Schedule } from '../../common/schedule.interface';
import { TeacherScheduleRequest } from '../dto/teacher-schudule.request';
import { TeacherDescriptionInvalidError } from '../errors/teacher-schedule-description.error';
import { TeacherSchedule } from '../teacher-schedule.entity';
import { TeacherScheduleRepository } from '../teacher-schedule.repository';
import { TeacherScheduleInteractor } from './teacher-schedule.interactor';

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const teacherScheduleRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const scheduleRepositoryMock = {
  save: jest.fn(),
};

const validationMock = {};

const securityMock = {};

describe('TeacherScheduleInteractor', () => {
  let interactor: TeacherScheduleInteractor;

  beforeAll(() => {
    interactor = new TeacherScheduleInteractor(
      presenterMock as Presenter<TeacherSchedule>,
      teacherScheduleRepositoryMock as TeacherScheduleRepository,
    );
  });

  // beforeEach(() => {});
  test('Espero um throw caso o description seja em invalido', async () => {
    const mockDataRequest: TeacherScheduleRequest = {
      description: '',
      schedule: scheduleRepositoryMock.save() as Schedule,
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(TeacherDescriptionInvalidError),
    );
  });

  test('Testa se a agenda foi cadastrado no sistema', async () => {
    defineNow('2020-05-20T00:00:00.000Z');

    teacherScheduleRepositoryMock.save.mockImplementation(
      (data: DeepPartial<TeacherSchedule>): TeacherSchedule => {
        return {
          ...data,
          id: 'uuid',
          description: 'any_description',
          schedule: scheduleRepositoryMock.save() as Schedule,
          createdAt: getNowISO(),
        } as TeacherSchedule;
      },
    );

    await interactor.execute({
      description: 'any_description',
      schedule: scheduleRepositoryMock.save() as Schedule,
    });

    expect(presenterMock.throw).not.toBeCalled();
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      description: 'any_description',
      schedule: scheduleRepositoryMock.save() as Schedule,
      createdAt: getNowISO(),
    });
  });
});
