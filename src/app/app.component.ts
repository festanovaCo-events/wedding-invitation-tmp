import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ACTIVE_THEME } from './themes/active-theme';
import { applyThemeStyleProperties } from './themes/theme-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'wedding-invitation-tmp';

  ngOnInit(): void {
    applyThemeStyleProperties(ACTIVE_THEME, document.documentElement);
  }
}
