import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should default to dark theme', () => {
    expect(service.theme()).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle from light back to dark', () => {
    service.toggleTheme();
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should persist theme to localStorage', () => {
    service.setTheme('light');
    expect(localStorage.getItem('kg-theme')).toBe('light');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('kg-theme', 'light');
    const freshService = new ThemeService();
    expect(freshService.theme()).toBe('light');
  });

  it('should ignore invalid localStorage values', () => {
    localStorage.setItem('kg-theme', 'invalid');
    const freshService = new ThemeService();
    expect(freshService.theme()).toBe('dark');
  });
});
