import { Component } from '@angular/core';
import { EventCardComponent } from '../../../shared/components/cards/event-card/event-card.component';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';

@Component({
  selector: 'app-m01-event-schedule',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './m01-event-schedule.component.html',
  styleUrl: './m01-event-schedule.component.css',
})

export class M01EventScheduleComponent {
  weddingInfo = WEDDING_INFO;
}
