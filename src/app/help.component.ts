import { Component, HostBinding } from '@angular/core';
import { slideInAnimation } from './right-panel.animation';

@Component({
    selector: 'app-help',
    templateUrl: 'help.component.html',
    styles: [
        '.help-panel { background: lightgray; padding: 20px; }'
    ],
    animations: [slideInAnimation],
})
export class HelpComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
}
