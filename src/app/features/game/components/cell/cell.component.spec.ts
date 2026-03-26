import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let fixture: ComponentFixture<CellComponent>;
  let component: CellComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('index', 0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default state', () => {
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('.cell');
    expect(cell.classList).toContain('cell--default');
  });

  it('should render highlight state', () => {
    fixture.componentRef.setInput('state', 'highlight');
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('.cell');
    expect(cell.classList).toContain('cell--highlight');
  });

  it('should render success state', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('.cell');
    expect(cell.classList).toContain('cell--success');
  });

  it('should render fail state', () => {
    fixture.componentRef.setInput('state', 'fail');
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('.cell');
    expect(cell.classList).toContain('cell--fail');
  });

  it('should emit clicked with index on click', () => {
    fixture.componentRef.setInput('index', 42);
    fixture.detectChanges();

    const spy = vi.fn();
    component.clicked.subscribe(spy);

    const cell = fixture.nativeElement.querySelector('.cell');
    cell.click();
    expect(spy).toHaveBeenCalledWith(42);
  });
});
