import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';


const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// // Configure middleware for JSON parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Initialize Gmail adapter
// const gmailAdapter = new GmailAdapter(environment.smtp);

// /**
//  * Contact form API endpoint
//  */
// app.post('/api/contact', async (req, res) => {
//   try {
//     const formData: ContactFormData = req.body;
    
//     // Basic validation
//     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//       return res.status(400).json({
//         success: false,
//         error: 'Todos los campos son requeridos'
//       } as EmailResponse);
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       return res.status(400).json({
//         success: false,
//         error: 'Email inválido'
//       } as EmailResponse);
//     }
    
//     // Generate email content
//     const htmlContent = EmailTemplateService.generateContactEmailHtml(formData);
//     const textContent = EmailTemplateService.generateContactEmailText(formData);
    
//     // Send email
//     const result = await gmailAdapter.sendEmail({
//       from: environment.email.from,
//       to: environment.email.to,
//       replyTo: formData.email,
//       subject: `[CONTACTO WEB] ${formData.subject}`,
//       html: htmlContent,
//       text: textContent
//     });
    
//     if (result.success) {
//       return res.json({
//         success: true,
//         messageId: result.messageId
//       } as EmailResponse);
//     } else {
//       return res.status(500).json({
//         success: false,
//         error: 'Error interno del servidor'
//       } as EmailResponse);
//     }
    
//   } catch (error) {
//     console.error('Contact form error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Error interno del servidor'
//     } as EmailResponse);
//   }
// });

// /**
//  * Health check endpoint
//  */
// app.get('/api/health', async (req, res) => {
//   try {
//     const smtpReady = await gmailAdapter.verifyConnection();
//     return res.json({
//       status: 'ok',
//       smtp: smtpReady ? 'connected' : 'disconnected',
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       error: 'Health check failed'
//     });
//   }
// });

// /**
//  * Example Express Rest API endpoints can be defined here.
//  * Uncomment and define endpoints as necessary.
//  *
//  * Example:
//  * ```ts
//  * app.get('/api/{*splat}', (req, res) => {
//  *   // Handle API request
//  * });
//  * ```
//  */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
