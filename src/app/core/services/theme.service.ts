import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('dark');

  constructor() {
    this.loadSavedTheme();
  }

  toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kg-theme', theme);
  }

  private loadSavedTheme(): void {
    const saved = localStorage.getItem('kg-theme') as Theme | null;
    if (saved && (saved === 'dark' || saved === 'light')) {
      this.setTheme(saved);
    }
  }
}
