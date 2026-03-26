import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should render a button element', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.classList).toContain('btn--primary');
  });

  it('should apply disabled attribute', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should apply full-width class', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('btn--full-width');
  });
});
