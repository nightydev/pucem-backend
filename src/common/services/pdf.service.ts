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
    // Filtrar columnas que contienen "id" en el nombre
    const filteredData = data.map((item) => {
      const filteredItem: any = {};
      for (const [key, value] of Object.entries(item)) {
        if (!key.toLowerCase().includes('id')) {
          // Mostrar nombres completos para user y patient
          if (key === 'user' && value && typeof value === 'object') {
            const user = value as { name?: string; lastName?: string };
            filteredItem['GESTOR'] = `${user.name ?? ''} ${user.lastName ?? ''}`.toUpperCase();
          } else if (key === 'patient' && value && typeof value === 'object') {
            const patient = value as { name?: string; lastName?: string };
            filteredItem['USUARIO'] = `${patient.name ?? ''} ${patient.lastName ?? ''}`.toUpperCase();
          } else {
            filteredItem[key.toUpperCase()] = (typeof value === 'string' ? value.toUpperCase() : value);
          }
        }
      }
      return filteredItem;
    });
  
    const sectionsHtml = filteredData.map((item, index) => {
      const headers = Object.keys(item);
      const values = Object.values(item);
  
      // Dividir las columnas en grupos para tablas más pequeñas
      const columnsPerTable = 6;  // Máximo de columnas por tabla
      const tablesHtml = [];
  
      for (let i = 0; i < headers.length; i += columnsPerTable) {
        const slicedHeaders = headers.slice(i, i + columnsPerTable);
        const slicedValues = values.slice(i, i + columnsPerTable);
  
        tablesHtml.push(`
          <table>
            <thead>
              <tr>
                ${slicedHeaders.map((header) => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                ${slicedValues.map((value) => `<td>${value ?? ''}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        `);
      }
  
      return `
        <section>
          <h2>CONSULTA #${index + 1}</h2>
          ${tablesHtml.join('')}
          <hr>
        </section>
      `;
    }).join('');
  
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            h1 { 
              text-align: center; 
              color: #333;
              margin-bottom: 20px;
            }
            h2 {
              margin-top: 10px;
              margin-bottom: 5px;
              color: #555;
              text-align: center;
              font-size: 18px;
              background-color: #eee;
              padding: 5px;
              border-radius: 5px;
            }
            section {
              margin-bottom: 20px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 0;
              table-layout: fixed; /* Misma anchura para todas las columnas */
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
              word-wrap: break-word;
              font-size: 12px;
            }
            th {
              background-color: #333;
              color: white;
              font-weight: bold;
            }
            tr {
              margin: 0;
              padding: 0;
            }
            tr:nth-child(even) { background-color: #f2f2f2; }
            tr:hover { background-color: #f5f5f5; }
            hr {
              border: 0;
              border-top: 1px solid #666;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <h1>${title.toUpperCase()}</h1>
          ${sectionsHtml}
        </body>
      </html>
    `;
  }
}  