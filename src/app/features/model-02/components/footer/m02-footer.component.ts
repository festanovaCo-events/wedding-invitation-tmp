import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m02-footer.component.html',
})
export class M02FooterComponent {
  readonly info = MODEL_02_INFO;
  readonly assets = MODEL_02_INFO.assets;
}
