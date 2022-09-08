import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const FadeAnimation = trigger('fade', [
  transition('void => *', [
    style({opacity: 0}),
  animate('0.5s ease-in-out')
  ]),
]);