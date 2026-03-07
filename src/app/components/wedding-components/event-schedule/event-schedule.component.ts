import { Component } from '@angular/core';
import { EventCardComponent } from '../../cards/event-card/event-card.component';
import { WEDDING_INFO } from '../../../constants/wedding-info';

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
