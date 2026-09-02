import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { MODEL_02_INFO } from '../../constants/model-02-info';

@Component({
  selector: 'app-m02-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './m02-invitation.component.html',
})
export class M02InvitationComponent {
  readonly weddingInfo = WEDDING_INFO;
  readonly info = MODEL_02_INFO;
  readonly assets = MODEL_02_INFO.assets;
}
