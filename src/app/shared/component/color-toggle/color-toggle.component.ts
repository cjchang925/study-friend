import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ContentService } from '../../service/content.service';

@Component({
  selector: 'app-color-toggle',
  templateUrl: './color-toggle.component.html',
  styleUrls: ['./color-toggle.component.scss'],
  animations: [
    trigger('colorModeChange', [
      state('true', style({ background: 'rgba(255, 255, 255, 0.3)' })),
      state('false', style({ background: 'rgba(255, 255, 255, 0.1)' })),
      transition(
        'true => false',
        animate('0.2s', style({ background: 'rgba(255, 255, 255, 0.1)' }))
      ),
      transition(
        'false => true',
        animate('0.2s', style({ background: 'rgba(255, 255, 255, 0.3)' }))
      ),
    ]),
  ],
})
export class ColorToggleComponent {
  constructor(public contentService: ContentService) {}

  /**
   * 切換背景模式為淺色
   */
  public changeMode(mode: 'light' | 'dark'): void {
    this.contentService.colorMode = mode;
  }
}
