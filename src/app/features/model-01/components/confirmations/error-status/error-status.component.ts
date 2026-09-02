import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-status.component.html',
  styleUrl: './error-status.component.css',
})
export class ErrorStatusComponent {
  @Input() error: string | null = null;
}
