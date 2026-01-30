export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export interface EmailOptions {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface IEmailProvider {
  sendEmail(options: EmailOptions): Promise<EmailResponse>;
}