export interface IPresenter<T> {
  reply(data: T): Promise<void>;
  throw(error: Error): Promise<void>;
}
