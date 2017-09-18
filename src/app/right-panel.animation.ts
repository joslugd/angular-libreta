import {
  trigger, state, transition, style, animate
} from '@angular/animations';

// Representa la animación utilizada para los componentes de ruta.
export const slideInAnimation = trigger('routeAnimation', [
  state('*',
    style({
      transform: 'translateX(0)'
    })
  ),
  transition(':enter', [
    style({
      transform: 'translateX(100%)'
    }),
    animate('0.3s ease-in')
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ])
]);
