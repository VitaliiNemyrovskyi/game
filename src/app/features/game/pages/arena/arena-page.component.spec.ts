import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ArenaPageComponent } from './arena-page.component';
import { GameService } from '../../../../core/services/game.service';
import { ROUND_DELAY } from '../../../../core/models/game.model';

describe('ArenaPageComponent', () => {
  let fixture: ComponentFixture<ArenaPageComponent>;
  let component: ArenaPageComponent;
  let gameService: GameService;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [ArenaPageComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ArenaPageComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  afterEach(() => {
    gameService.destroy();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start game on startGame event', () => {
    component.onStartGame(1000);
    expect(gameService.isRunning()).toBe(true);
  });

  it('should handle cell click', () => {
    gameService.startGame(1000);
    const target = gameService.currentTarget()!;

    component.onCellClick(target);
    expect(gameService.playerScore()).toBe(1);
  });

  it('should show modal when winner is set', () => {
    expect(component.showModal()).toBe(false);

    gameService.startGame(1000);
    for (let i = 0; i < 10; i++) {
      const target = gameService.currentTarget()!;
      gameService.onCellClick(target);
      if (i < 9) vi.advanceTimersByTime(ROUND_DELAY);
    }

    expect(component.showModal()).toBe(true);
  });

  it('should reset game on play again', () => {
    gameService.startGame(1000);
    const target = gameService.currentTarget()!;
    gameService.onCellClick(target);

    component.onPlayAgain();
    expect(gameService.isRunning()).toBe(false);
    expect(gameService.playerScore()).toBe(0);
  });
});
