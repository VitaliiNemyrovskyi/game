import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly themeService = inject(ThemeService);
  private readonly translate = inject(TranslateService);
  readonly theme = this.themeService.theme;
  readonly currentLang = signal(localStorage.getItem('kg-lang') || 'en');

  readonly navItems = [
    { label: 'NAV.ARENA', icon: '⊞', route: '/game' },
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('kg-lang', lang);
    this.currentLang.set(lang);
  }
}
