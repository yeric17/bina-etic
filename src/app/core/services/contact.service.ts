import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData, EmailResponse } from '../interfaces/email.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: ContactFormData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, formData);
  }
}