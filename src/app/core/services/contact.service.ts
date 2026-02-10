import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData, EmailResponse } from '../interfaces/email.interface';
import { environment } from '../../../environments/environment';
import { env } from 'node:process';
import { EmailTemplateService } from './email-template.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = environment.apiHost + '/emails/contact';
  private readonly emailTemplateService =inject(EmailTemplateService)

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: ContactFormData): Observable<EmailResponse> {

    const emailBody = this.emailTemplateService.generateContactEmailHtml(formData);

    return this.http.post<EmailResponse>(this.apiUrl, {
      name: formData.name,
      contactEmail: formData.email,
      to: environment.contactEmail,
      subject: formData.subject,
      body: emailBody
    });
  }
}