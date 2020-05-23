export interface Hasher {
  hash(data: string): Promise<string>;
}
