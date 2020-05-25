export function defineNow(value: string) {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementation(() => new Date(value).valueOf());
}

export function getNowISO() {
  return new Date(Date.now()).toISOString();
}
