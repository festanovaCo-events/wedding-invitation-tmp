import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { GiftIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-gifts',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  templateUrl: './m02-gifts.component.html',
})
export class M02GiftsComponent {
  readonly info = MODEL_02_INFO;
  readonly icons = {
    gift: GiftIcon,
    envelope: Mail01Icon,
  };
}
