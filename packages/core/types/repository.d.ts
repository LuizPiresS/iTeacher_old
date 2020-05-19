declare type FindConditions<T> = {
  [P in keyof T]?: T[P] extends never
    ? FindConditions<T[P] | null>
    : FindConditions<T[P] | null>;
};

declare type FindOneOptions<T> = FindConditions<T> | FindConditions<T>[];

declare type FindManyOptions<T> =
  | FindConditions<T>
  | FindConditions<T>[]
  | {
      where: FindConditions<T> | FindConditions<T>[];
      skip?: number;
      take?: number;
    };

declare interface Repository<T> {
  find(conditions?: FindManyOptions<T>): Promise<T[]>;

  findOne(conditions?: FindOneOptions<T>): Promise<T | undefined>;

  save(data: DeepPartial<T>): Promise<T>;

  delete(id: string): Promise<void>;
}
