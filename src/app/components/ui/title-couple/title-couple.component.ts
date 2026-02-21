import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-couple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-couple.component.html',
  styleUrl: './title-couple.component.css',
})
export class TitleCoupleComponent {
  @Input() name_wife: string = 'Yina';
  @Input() name_husband: string = 'Jorge';
  @Input() classHeading1 = 'text-white text-[100px] md:text-[130px] font-bold flex-col md:flex-row gap-3 md:gap-7';
  @Input() classSpan = 'text-navy-dark text-[40px] w-[50px] h-[50px] md:w-[60px] md:h-[60px] leading-[50px] md:leading-[60px]';
}
