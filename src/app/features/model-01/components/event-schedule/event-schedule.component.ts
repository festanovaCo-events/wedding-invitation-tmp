import { Component } from '@angular/core';
import { EventCardComponent } from '../../../shared/components/cards/event-card/event-card.component';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';

@Component({
  selector: 'app-event-schedule',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-schedule.component.html',
  styleUrl: './event-schedule.component.css',
})

export class EventScheduleComponent {
  weddingInfo = WEDDING_INFO;
}
