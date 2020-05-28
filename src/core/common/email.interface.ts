import { IRenderFile } from './render.interface';
export interface IEmail {
  sendEmail(
    emailFrom: string,
    toEmail: string,
    subject: string,
    html: IRenderFile,
  ): Promise<boolean>;
}
