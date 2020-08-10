export const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn()
}

export const userRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  updateUser: jest.fn(),
  delete: jest.fn(),
  findEmail: jest.fn(),
  findCPF: jest.fn(),
  deactivateUser: jest.fn()
}

export const validationMock = {
  isEmail: jest.fn(),
  isCPF: jest.fn(),
  isPassword: jest.fn(),
  isDate: jest.fn(),
  isCellphone: jest.fn()
}

export const securityMock = {
  encryptPassword: jest.fn(),
  validateToken: jest.fn(),
  encodeToken: jest.fn(),
  decodeToken: jest.fn()
}
