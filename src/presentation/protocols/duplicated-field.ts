export interface DuplicatedField{
  isDuplicated(fied: string): Promise<boolean>
}
