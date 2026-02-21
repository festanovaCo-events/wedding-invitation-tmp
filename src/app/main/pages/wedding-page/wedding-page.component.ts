import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerHomeComponent } from "../../../components/wedding-components/banner-home/banner-home.component";
import { WeddingCountdownComponent } from "../../../components/wedding-components/wedding-countdown/wedding-countdown.component";
import { EventScheduleComponent } from "../../../components/wedding-components/event-schedule/event-schedule.component";
import { PortraitsComponent } from "../../../components/wedding-components/portraits/portraits.component";
import { InstructionsComponent } from "../../../components/wedding-components/instructions/instructions.component";
import { GiftsComponent } from "../../../components/wedding-components/gifts/gifts.component";
import { BannerInstagramComponent } from "../../../components/wedding-components/banner-instagram/banner-instagram.component";
import { ConfirmationsComponent } from "../../../components/wedding-components/confirmations/confirmations.component";
import { ModalComponent } from "../../../components/common/modal/modal.component";

@Component({
  selector: 'app-wedding-page',
  standalone: true,
  imports: [CommonModule, BannerHomeComponent, WeddingCountdownComponent, EventScheduleComponent, PortraitsComponent, InstructionsComponent, GiftsComponent, BannerInstagramComponent, ConfirmationsComponent, ModalComponent],
  templateUrl: './wedding-page.component.html',
})
export class WeddingPageComponent implements OnInit, AfterViewInit {
  showConfirmationGuide = false;
  private readonly STORAGE_KEY = 'confirmation_guide_shown';

  ngOnInit(): void {
    // Verificar si ya se mostró el modal anteriormente
    const guideShown = localStorage.getItem(this.STORAGE_KEY);
    
    // Esperar un poco después de que se cierre el modal de bienvenida
    // Usamos un timeout para que aparezca después del modal de bienvenida
    setTimeout(() => {
      if (!guideShown) {
        this.showConfirmationGuide = true;
      }
    }, 1500); // Esperar 1.5 segundos después de que se cierre el modal de bienvenida
  }

  ngAfterViewInit(): void {
    // Si el modal ya se mostró antes, no hacer nada
    const guideShown = localStorage.getItem(this.STORAGE_KEY);
    if (guideShown) {
      return;
    }
  }

  scrollToConfirmations(): void {
    const element = document.getElementById('confirmations-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeGuide();
    }
  }

  closeGuide(): void {
    this.showConfirmationGuide = false;
    localStorage.setItem(this.STORAGE_KEY, 'true');
  }
}
