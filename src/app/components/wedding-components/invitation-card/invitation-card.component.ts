import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.css',
})
export class InvitationCardComponent implements OnChanges {
  /** URL absoluta de la invitación (con token). Se abre en iframe con preview=1. */
  @Input() invitationUrl = '';

  isOpen = false;
  /** Hasta un clic, una capa tapa el iframe para que el scroll sea de la página. */
  iframeInteractive = false;
  safeIframeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.safeIframeUrl = this.invitationUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.buildPreviewUrl(this.invitationUrl))
      : null;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.iframeInteractive = false;
    }
  }

  enableIframeInteraction(): void {
    this.iframeInteractive = true;
  }

  get openInNewTabUrl(): string {
    return this.buildPreviewUrl(this.invitationUrl);
  }

  private buildPreviewUrl(url: string): string {
    if (!url) {
      return '';
    }

    try {
      const parsed = new URL(url, window.location.origin);
      parsed.searchParams.set('preview', '1');
      return parsed.toString();
    } catch {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}preview=1`;
    }
  }
}
