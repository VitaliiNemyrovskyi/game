import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.translate.addLangs(['en', 'uk']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('kg-lang');
    this.translate.use(savedLang || 'en');

    // Theme is loaded in ThemeService constructor
    void this.themeService;
  }
}
