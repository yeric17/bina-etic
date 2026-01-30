import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { EmailConfig, EmailOptions, EmailResponse, IEmailProvider } from '../interfaces/email.interface';

export class GmailAdapter implements IEmailProvider {
  private transporter: Transporter;

  constructor(private config: EmailConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    try {
      const mailOptions = {
        from: `"BINA ETIC" <${options.from}>`,
        to: options.to,
        replyTo: options.replyTo || options.from,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Gmail SMTP connection failed:', error);
      return false;
    }
  }
}