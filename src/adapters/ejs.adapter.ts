import * as ejs from 'ejs';
import * as fs from 'fs';

import { RenderFile } from '../render-files/render.interface';

export class EJSAdapter implements RenderFile {
  renderHtml(file: string, data: object): string {
    const template = fs.readFileSync(file, {
      encoding: 'utf-8',
      flag: 'r',
    });

    return ejs.render(template, data);
  }
}
