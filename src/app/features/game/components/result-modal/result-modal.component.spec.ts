import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ResultModalComponent } from './result-modal.component';

describe('ResultModalComponent', () => {
  let fixture: ComponentFixture<ResultModalComponent>;
  let component: ResultModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultModalComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute XP gained based on player score', () => {
    fixture.componentRef.setInput('playerScore', 10);
    fixture.detectChanges();
    expect(component.xpGained()).toBe(1050);
  });

  it('should compute credits earned based on player score', () => {
    fixture.componentRef.setInput('playerScore', 10);
    fixture.detectChanges();
    expect(component.creditsEarned()).toBe(520);
  });

  it('should identify player won', () => {
    fixture.componentRef.setInput('winner', 'player');
    fixture.detectChanges();
    expect(component.playerWon()).toBe(true);
  });

  it('should identify computer won', () => {
    fixture.componentRef.setInput('winner', 'computer');
    fixture.detectChanges();
    expect(component.playerWon()).toBe(false);
  });

  it('should emit playAgain on button click', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('winner', 'player');
    fixture.detectChanges();

    const spy = vi.fn();
    component.playAgain.subscribe(spy);

    const btn = fixture.nativeElement.querySelector('app-button');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit exitHub on exit click', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('winner', 'player');
    fixture.detectChanges();

    const spy = vi.fn();
    component.exitHub.subscribe(spy);

    const exit = fixture.nativeElement.querySelector('.result__exit');
    exit.click();
    expect(spy).toHaveBeenCalled();
  });
});
