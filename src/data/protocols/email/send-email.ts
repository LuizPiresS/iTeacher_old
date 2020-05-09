export interface SendEmail {
  send(email: string, name: string): Promise<boolean>
}
