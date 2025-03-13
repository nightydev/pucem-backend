import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  private readonly logger = new Logger('PdfService');

  async generatePdf(data: any[], title: string): Promise<Buffer> {
    try {
      this.logger.log(`Iniciando generación de PDF para: ${title}`);
      this.logger.debug(
        `Datos recibidos: ${JSON.stringify(data.length)} registros`,
      );

      const browser = await puppeteer.launch({
        headless: true,
      });
      this.logger.log('Navegador iniciado');

      const page = await browser.newPage();
      this.logger.log('Nueva página creada');

      const tableHtml = this.generateTableHtml(data, title);
      this.logger.debug('HTML generado');

      await page.setContent(tableHtml);
      this.logger.log('Contenido cargado en la página');

      const pdfBuffer = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });
      this.logger.log('PDF generado exitosamente');

      await browser.close();
      this.logger.log('Navegador cerrado');

      return Buffer.from(pdfBuffer);
    } catch (error) {
      this.logger.error(`Error generando PDF: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  private generateTableHtml(data: any[], title: string): string {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const rows = data.map((item) => Object.values(item));

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { 
              text-align: center; 
              color: #333;
              margin-bottom: 20px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f4f4f4; 
              font-weight: bold;
            }
            tr:nth-child(even) { background-color: #f9f9f9; }
            tr:hover { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <body>
              ${rows
                .map(
                  (row) => `
                <tr>
                  ${row.map((cell) => `<td>${cell ?? ''}</td>`).join('')}
                </tr>
              `,
                )
                .join('')}
            </body>
          </table>
        </body>
      </html>
    `;
  }
}
