import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  ChurchIcon,
  DrinkIcon,
  FireworksIcon,
  MusicNote01Icon,
  SpoonAndForkIcon,
  Time04Icon,
} from '@hugeicons/core-free-icons';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-timeline',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  templateUrl: './m02-timeline.component.html',
})
export class M02TimelineComponent {
  readonly info = MODEL_02_INFO;

  readonly timelineIcons = {
    church: ChurchIcon,
    cocktail: DrinkIcon,
    fireworks: FireworksIcon,
    dinner: SpoonAndForkIcon,
    party: MusicNote01Icon,
    clock: Time04Icon,
  } as const;
}
