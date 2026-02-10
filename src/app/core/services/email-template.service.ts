import { Injectable } from '@angular/core';
import { ContactFormData } from '../interfaces/email.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  public generateContactEmailHtml(formData: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo mensaje de contacto - BINA ETIC</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            line-height: 1.6;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .header p {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .field {
            margin-bottom: 25px;
          }
          
          .field-label {
            font-size: 14px;
            font-weight: 600;
            color: #4A5568;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
          }
          
          .field-value {
            font-size: 16px;
            color: #2D3748;
            background: #F7FAFC;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
            word-wrap: break-word;
          }
          
          .message-field .field-value {
            white-space: pre-wrap;
            min-height: 80px;
          }
          
          .footer {
            background: #F8F9FA;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #E2E8F0;
          }
          
          .footer p {
            color: #6C757D;
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .footer .contact-info {
            font-size: 13px;
            color: #ADB5BD;
          }
          
          .logo {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 5px;
          }
          
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .header {
              padding: 20px;
            }
            
            .header h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BINA ETIC</h1>
            <p>Nuevo mensaje de contacto</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="field-label">Nombre</span>
              <div class="field-value">${this.escapeHtml(formData.name)}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Email</span>
              <div class="field-value">${this.escapeHtml(formData.email)}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Asunto</span>
              <div class="field-value">${this.escapeHtml(formData.subject)}</div>
            </div>
            
            <div class="field message-field">
              <span class="field-label">Mensaje</span>
              <div class="field-value">${this.escapeHtml(formData.message)}</div>
            </div>
          </div>
          
          <div class="footer">
            <div class="logo">BINA ETIC</div>
            <p>Entendimiento aplicado en propósitos tecnológicos</p>
            <div class="contact-info">
              <p>Email: contacto@binaetic.com | Teléfono: +57 3183974206</p>
              <p>Zipaquirá, Colombia | Lun - Vie: 8:00 - 18:00</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  private generateContactEmailText(formData: ContactFormData): string {
    return `
NUEVO MENSAJE DE CONTACTO - BINA ETIC

Nombre: ${formData.name}
Email: ${formData.email}
Asunto: ${formData.subject}

Mensaje:
${formData.message}

---
BINA ETIC
Entendimiento aplicado en propósitos tecnológicos
Email: contacto@binaetic.com
Teléfono: +57 3183974206
Zipaquirá, Colombia
    `.trim();
  }
  
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}