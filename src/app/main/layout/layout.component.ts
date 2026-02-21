import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderHeartComponent } from '../../components/common/loader-heart/loader-heart.component';
import { SplashMusicComponent } from '../../components/ui/lottie/splash-music/splash-music.component';
import { FooterComponent } from "../../components/common/footer/footer.component";
import { WEDDING_INFO } from '../../constants/wedding-info';
import { ModalFlowService } from '../../services/modal-flow.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    CommonModule,
    RouterModule,
    LoaderHeartComponent,
    SplashMusicComponent,
    FooterComponent
],
})
export class LayoutComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  @ViewChild(SplashMusicComponent) splashComp!: SplashMusicComponent;

  isLoading = true;
  modalDismissed = false;
  showContent = false;
  bounce = false;
  weddingInfo = WEDDING_INFO;

  private audio: HTMLAudioElement | null = null; // Agregado
  private isMusicPlaying = false;
  private minTime = 2000; // 2 segundos
  private startTime = 0;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private modalFlowService: ModalFlowService
  ) {}

  ngOnInit(): void {
    // Primera carga: mostrar loader al entrar
    this.startTime = Date.now();
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
      this.disableScroll(); // Bloquea scroll (modal visible, loader oculto)
    }, this.minTime);

    // Luego escucha navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.startTime = Date.now();
        this.isLoading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const elapsed = Date.now() - this.startTime;
        const remaining = this.minTime - elapsed;

        if (remaining > 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, remaining);
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  onAccept(withMusic: boolean) {
    this.modalDismissed = true;
    this.enableScroll(); // Restaura scroll
    this.modalFlowService.emitWelcomeModalAccepted(); // Abre el modal de confirmación enseguida

    if (withMusic) {
      this.playBackgroundMusic();
    } else {
      setTimeout(() => {
        if (this.splashComp) {
          this.splashComp.pauseAnimation();
        }
      }, 300); // Pausa Lottie inmediatamente
    }
  }

  disableScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  enableScroll() {
    this.renderer.removeStyle(document.body, 'overflow');
  }

  playBackgroundMusic() {
    if (!this.audio) {
      this.audio = new Audio(this.weddingInfo.music.url);
      this.audio.loop = this.weddingInfo.music.loop;
      this.audio.volume = this.weddingInfo.music.volume;
    }

    this.audio.play();
    this.isMusicPlaying = true;
  }

  toggleMusic() {
    if (!this.audio) return;

    if (this.isMusicPlaying) {
      this.audio.pause();
      if (this.splashComp) {
        this.splashComp.pauseAnimation(); // pausa Lottie
      }
    } else {
      this.audio.play();
      if (this.splashComp) {
        this.splashComp.playAnimation(); // reanuda Lottie
      }
    }

    this.isMusicPlaying = !this.isMusicPlaying;
  }

  triggerBounce() {
    const el = this.modalContent?.nativeElement;
    if (!el) return;

    this.renderer.removeClass(el, 'animate__pulse');
    this.renderer.removeClass(el, 'animate__slideInDown');
    // forzar reflow para que la animación se reinicie
    void el.offsetWidth;
    this.renderer.addClass(el, 'animate__pulse');
  }
}
