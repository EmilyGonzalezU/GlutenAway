import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Injectable({
  providedIn: 'root'
})
export class EmialjsService {


  constructor() { }

  /**Parametros en emial js */
  private template =  'template_28dw20q';
  private service = 'service_17wi3fs';
  private publicId = 'g95AwvLUNG6gqPxJE';

  sendEmailJs(username: string, userEmail: string): Promise<EmailJSResponseStatus>{
    const templateParams = {
      user_name: username,
      user_email: userEmail,
    }

    return emailjs.send(this.service, this.template, templateParams, this.publicId);
  }
}
