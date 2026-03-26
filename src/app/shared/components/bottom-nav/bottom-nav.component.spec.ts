import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BottomNavComponent } from './bottom-nav.component';

describe('BottomNavComponent', () => {
  let fixture: ComponentFixture<BottomNavComponent>;
  let component: BottomNavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 1 tab', () => {
    const tabs = fixture.nativeElement.querySelectorAll('.bottom-nav__tab');
    expect(tabs.length).toBe(1);
  });
});
