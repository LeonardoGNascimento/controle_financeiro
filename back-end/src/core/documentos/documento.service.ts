import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import Handlebars from 'handlebars';

@Injectable()
export class DocumentoService {
  async gerarDocumento(dados: object, templateUrl: string): Promise<Buffer> {
    const template = Handlebars.compile(
      fs.readFileSync(templateUrl, {
        encoding: 'utf-8',
      }),
    );

    const html = template(dados);

    return await new Promise((res, rej) => {
      pdf
        .create(html, { type: 'pdf', format: 'A4', orientation: 'portrait' })
        .toBuffer((err, buffer) => {
          res(buffer);
        });
    });
  }
}
