import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { webcomponentsReady } from '@codebakery/origami';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Fuente: https://github.com/hotforfeature/origami
webcomponentsReady().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    enableLegacyTemplate: false
  });
}).catch(error => {
  // No WebComponent support and webcomponentsjs is not loaded
  console.error(error);
});
