export function defineNow (value: string): void {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementation(() => new Date(value).valueOf())
}

export function getNowISO (): string {
  return new Date(Date.now()).toISOString()
}
