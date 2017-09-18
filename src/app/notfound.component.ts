import { Component } from '@angular/core';

@Component({
    selector: 'app-notfound',
    template: `
      <div class="notfound">
        <h1>:(</h1>
        <p>La nota o página a la que has accedido no existe.</p>
      </div>
    `,
    styles: [
        '.notfound { width: 100%; height: 100vh; background: lightgray; text-align: center; padding-top: 40vh; }',
        '.notfound p { font-size: 18pt; color: darkgray; margin: 0; }'
    ]
})
export class NotFoundComponent {
}
