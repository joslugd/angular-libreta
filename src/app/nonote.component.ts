import { Component } from '@angular/core';

@Component({
    selector: 'app-nonote',
    template: `
      <div class="nonote">
        <p>Selecciona una nota en el panel de la izquierda para verla o
           editarla.</p>
      </div>
    `,
    styles: [
        '.nonote { width: 100%; height: 100vh; background: lightgray; text-align: center; }',
        '.nonote p { font-size: 18pt; color: darkgray; margin: 0; padding-top: 40vh; }'
    ]
})
export class NoNoteComponent {
}
