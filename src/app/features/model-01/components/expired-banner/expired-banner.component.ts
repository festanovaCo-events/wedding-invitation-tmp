import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expired-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expired-banner.component.html',
  styleUrl: './expired-banner.component.css',
})
export class ExpiredBannerComponent {
  @Input({ required: true }) deadline!: string;
}
