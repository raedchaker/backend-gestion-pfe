import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}
  
  public sendMail(mail,object): void {
    this
      .mailerService
      .sendMail({
        to: mail,     // list of receivers
        from:'pfe_insat@yahoo.com', // sender address
        subject:'Inscription for PFE INSAT', // Subject line
        text: object, // plaintext body
        html: object, // HTML body content
      })
      .then(() => {console.log("ok mail is sent")})
      .catch((e) => {console.log(e)});
  }
  
}