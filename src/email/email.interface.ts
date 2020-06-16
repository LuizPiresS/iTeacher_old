export interface Email {
  sendEmail(
    emailFrom: string,
    toEmail: string,
    subject: string,
    html: string,
  ): Promise<boolean>;
}
