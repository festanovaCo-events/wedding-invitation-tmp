import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-m01-expired-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m01-expired-banner.component.html',
  styleUrl: './m01-expired-banner.component.css',
})
export class M01ExpiredBannerComponent {
  @Input({ required: true }) deadline!: string;
}
