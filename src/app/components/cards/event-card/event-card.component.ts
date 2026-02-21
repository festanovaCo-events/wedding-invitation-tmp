import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  @Input() titulo!: string;
  @Input() path!: string;
  @Input() date: string = 'Sábado 15 de Mayo - 17hs';
  @Input() place: string = 'Parroquia Nuestra Señora de Lujan';
  @Input() address: string = 'Av. Pergamino 203 - Bogotá';
  @Input() calendarRef: string =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Jorge+y+Yina+(Ceremonia)&dates=20260912T220000Z/20260912T230000Z&details=¡Acompáñanos+a+celebrar+este+momento+especial!&location=Parroquia+Cristo+Sacerdote+-+Los+Alpes,+Tv.+73,+Los+Alpes,+Cartagena+de+Indias,+Provincia+de+Cartagena,+Bolívar&sf=true&output=xml';
  @Input() location: string =
    'Parroquia+Cristo+Sacerdote+-+Los+Alpes,+Cartagena+de+Indias,+Bolívar';
  @Input() mapsUrl: string = '';
  options!: AnimationOptions;
  animationItem?: AnimationItem;

  ngOnInit(): void {
    this.options = {
      path: this.path,
      loop: true,
      autoplay: true,
    };
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
