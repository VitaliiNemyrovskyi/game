import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GridComponent } from './grid.component';
import { GRID_SIZE } from '../../../../core/models/game.model';

describe('GridComponent', () => {
  let fixture: ComponentFixture<GridComponent>;
  let component: GridComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cells', Array(GRID_SIZE).fill('default'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 100 cells', () => {
    fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll('app-cell');
    expect(cells.length).toBe(GRID_SIZE);
  });

  it('should emit cellClicked on cell click', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.cellClicked.subscribe(spy);

    component.onCellClick(42);
    expect(spy).toHaveBeenCalledWith(42);
  });
});
