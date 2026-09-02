import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m02-events.component.html',
})
export class M02EventsComponent {
  readonly info = MODEL_02_INFO;
  readonly events = [MODEL_02_INFO.events.ceremony, MODEL_02_INFO.events.reception];

  openLocation(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
