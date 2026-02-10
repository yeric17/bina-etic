import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData, EmailResponse } from '../interfaces/email.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = environment.apiHost + '/emails/contact';

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: ContactFormData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, {
      name: formData.name,
      to: formData.email,
      subject: formData.subject,
      body: formData.message
    });
  }
}