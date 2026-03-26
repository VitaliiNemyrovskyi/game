import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when closed', () => {
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(backdrop).toBeNull();
  });

  it('should render when open', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should emit closed on backdrop click', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const spy = vi.fn();
    component.closed.subscribe(spy);

    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    backdrop.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit closed on content click', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const spy = vi.fn();
    component.closed.subscribe(spy);

    const content = fixture.nativeElement.querySelector('.modal-content');
    content.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
