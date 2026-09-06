import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-adults-only',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m02-adults-only.component.html',
})
export class M02AdultsOnlyComponent {
  readonly info = MODEL_02_INFO;
}
