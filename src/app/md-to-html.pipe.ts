import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mdToHtml'})
export class MdToHtmlPipe implements PipeTransform {
  transform(value: String) {
    const parTexts: String[] = value.split(/\n\s*(\n\s*)+/);

    for (const index in parTexts) {
      parTexts[index] = parTexts[index].replace(/\n/g, ' ');
      parTexts[index] = this.processInlineFormat(parTexts[index]);
      parTexts[index] = this.processParagraphStyle(parTexts[index]);
    }

    return parTexts.join('\n');
  }

  private processInlineFormat(text: String): String {
    text = text.replace(/[*][*]([^*]*)[*][*]/g, '<strong>$1</strong>');
    text = text.replace(/[*]([^*]*)[*]/g, '<em>$1</em>');
    text = text.replace(/`([^`]*)`/, '<code>$1</code>');

    return text;
  }

  private processParagraphStyle(text: String): String {
    // Construir lista de posibles cabeceras.
    const headings = ['######', '#####', '####', '###', '##', '#'];

    text = text.trim();
    for (let headingLevel = 6; headingLevel >= 1; headingLevel--) {
      if (text.startsWith(headings[6 - headingLevel])) {
        return `
          <h${headingLevel}>
            ${text.slice(headingLevel)}
          </h${headingLevel}>`;
      }
    }

    // Si no es un encabezado, es un párrafo normal.
    return `<p>${text}</p>`;
  }
}
