export interface SendEmail {
  send(email: string, name: string, uuid: string): Promise<boolean>
}
