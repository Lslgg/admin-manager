import { trigger, state, animate, style, transition } from '@angular/animations';

export function routerTransition() {
  return slideToTop();
}

export function slideToTop() {
  return trigger('routerTransition', [
    state('void', style({ position: 'absolute', width: '100%', "max-width": '1200px', height: '100%' })),
    state('*', style({ position: 'absolute', width: '100%', "max-width": '1200px', height: '100%' })),
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0s ease-in-out', style({ display: 'none' }))
    ])
  ]);
}