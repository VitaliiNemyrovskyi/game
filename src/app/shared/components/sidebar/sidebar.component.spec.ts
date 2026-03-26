import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation items', () => {
    const links = fixture.nativeElement.querySelectorAll('.sidebar__link');
    expect(links.length).toBe(1);
  });

  it('should render app title', () => {
    const logo = fixture.nativeElement.querySelector('.sidebar__logo');
    expect(logo).toBeTruthy();
  });

  it('should have theme toggle button', () => {
    const toggle = fixture.nativeElement.querySelector('.sidebar__theme-toggle');
    expect(toggle).toBeTruthy();
  });
});
