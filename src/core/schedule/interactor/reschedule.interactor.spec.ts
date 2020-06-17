import { defineNow, getNowISO } from '../../../utils/test.util';
import { User } from '../../auth/user';
import { DateCalculator } from '../../common/date-calculator.interface';
import { Presenter } from '../../common/presenter.interface';
import { Student } from '../../student/student';
import { Subject } from '../../subject/subject';
import { Teacher } from '../../teacher/teacher';
import { ScheduleRequest } from '../dto/schedule.request';
import { ScheduleResponse } from '../dto/schedule.response';
import { RescheduleDateError } from '../errors/reschedule-date.error';
import { ScheduleDescriptionInvalidError } from '../errors/schedule-description.error';
import { ScheduleTitleInvalidError } from '../errors/schedule-title.error';
import { Schedule } from '../schedule';
import { ScheduleRepository } from '../schedule.repository';
import { RescheduleInteractor } from './reschedule.interactor';

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const teacherMock = {} as Teacher;
const subjectMock = {} as Subject;
const mockUser = {
  id: 'uuid',
  name: 'any_name',
  cpf: '96197626063',
  birthdate: 'any_birthdate',
  cellphone: 'any_cellphone',
  email: 'any_email',
  password: 'any_password',
  createdAt: getNowISO(),
  updatedAt: getNowISO(),
  deletedAt: getNowISO(),
} as User;

const studentMock = {
  id: 'uuid',
  data: mockUser as User,
  rating: 10,
} as Student;

const scheduleRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
const dateCalculatorMock = {
  lessThanTwentyFourHours: jest.fn(),
};

describe('ScheduleInteractor', () => {
  let interactor: RescheduleInteractor;

  beforeAll(() => {
    interactor = new RescheduleInteractor(
      presenterMock as Presenter<ScheduleResponse>,
      scheduleRepositoryMock as ScheduleRepository,
      dateCalculatorMock as DateCalculator,
    );
  });

  beforeEach(() => {
    dateCalculatorMock.lessThanTwentyFourHours.mockReturnValue(true);
  });
  test('Espero um throw caso a data seja inferior a 24h', async () => {
    const mockDataRequest: ScheduleRequest = {
      title: 'any_title',
      student: studentMock,
      teacher: teacherMock,
      subject: subjectMock,
      date: Date.now(),
      startTime: 'any_start_time',
      endTime: 'any_end_time',
      description: '',
    };

    dateCalculatorMock.lessThanTwentyFourHours.mockReturnValue(false);

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWith(expect.any(RescheduleDateError));
  });

  test('Espero um throw caso o description seja invalido', async () => {
    const mockDataRequest: ScheduleRequest = {
      title: 'any_title',
      student: studentMock,
      teacher: teacherMock,
      subject: subjectMock,
      date: Date.now(),
      startTime: 'any_start_time',
      endTime: 'any_end_time',
      description: '',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(ScheduleDescriptionInvalidError),
    );
  });

  test('Espero um throw caso o title seja invalido', async () => {
    const mockDataRequest: ScheduleRequest = {
      title: '',
      student: studentMock,
      teacher: teacherMock,
      subject: subjectMock,
      date: Date.now(),
      startTime: 'any_start_time',
      endTime: 'any_end_time',
      description: 'any_description',
    };

    await interactor.execute(mockDataRequest);

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(ScheduleTitleInvalidError),
    );
  });

  test('Testa se a agenda foi cadastrado no sistema', async () => {
    defineNow('2020-05-20T00:00:00.000Z');

    scheduleRepositoryMock.save.mockImplementation(
      (data: DeepPartial<Schedule>): Schedule => {
        return {
          ...data,
          id: 'uuid',
          student: studentMock,
          teacher: teacherMock,
          subject: subjectMock,
          title: 'any_title',
          date: Date.now(),
          startTime: 'any_start_time',
          endTime: 'any_end_time',
          description: 'any_description',
          createdAt: getNowISO(),
        } as Schedule;
      },
    );

    await interactor.execute({
      title: 'any_title',
      description: 'any_description',
      student: studentMock,
      teacher: teacherMock,
      subject: subjectMock,
      date: Date.now(),
      startTime: 'any_start_time',
      endTime: 'any_end_time',
    });

    expect(presenterMock.throw).not.toBeCalled();
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      title: 'any_title',
      student: studentMock,
      teacher: teacherMock,
      subject: subjectMock,
      date: Date.now(),
      startTime: 'any_start_time',
      endTime: 'any_end_time',
      description: 'any_description',
      createdAt: getNowISO(),
    });
  });
});
