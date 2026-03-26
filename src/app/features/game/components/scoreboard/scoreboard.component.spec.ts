import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let fixture: ComponentFixture<ScoreboardComponent>;
  let component: ScoreboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreboardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display scores with zero padding', () => {
    fixture.componentRef.setInput('playerScore', 5);
    fixture.componentRef.setInput('computerScore', 3);
    fixture.detectChanges();

    const scores = fixture.nativeElement.querySelectorAll('.scoreboard__score');
    expect(scores[0].textContent.trim()).toBe('05');
    expect(scores[1].textContent.trim()).toBe('03');
  });

  it('should display default scores as 00', () => {
    fixture.detectChanges();
    const scores = fixture.nativeElement.querySelectorAll('.scoreboard__score');
    expect(scores[0].textContent.trim()).toBe('00');
    expect(scores[1].textContent.trim()).toBe('00');
  });
});
