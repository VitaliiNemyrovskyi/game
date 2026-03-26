import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { GRID_SIZE, ROUND_DELAY, WINNING_SCORE } from '../models/game.model';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  afterEach(() => {
    service.destroy();
    vi.useRealTimers();
  });

  it('should have correct initial state', () => {
    expect(service.cells().length).toBe(GRID_SIZE);
    expect(service.cells().every((c) => c === 'default')).toBe(true);
    expect(service.playerScore()).toBe(0);
    expect(service.computerScore()).toBe(0);
    expect(service.isRunning()).toBe(false);
    expect(service.currentTarget()).toBeNull();
    expect(service.winner()).toBeNull();
    expect(service.round()).toBe(0);
  });

  it('should start game and highlight one cell', () => {
    service.startGame(1000);
    expect(service.isRunning()).toBe(true);
    expect(service.currentTarget()).not.toBeNull();
    expect(service.cells()[service.currentTarget()!]).toBe('highlight');
    expect(service.round()).toBe(1);
  });

  it('should score player point on correct cell click', () => {
    service.startGame(1000);
    const target = service.currentTarget()!;

    service.onCellClick(target);
    expect(service.cells()[target]).toBe('success');
    expect(service.playerScore()).toBe(1);
    expect(service.computerScore()).toBe(0);
  });

  it('should ignore click on wrong cell', () => {
    service.startGame(1000);
    const target = service.currentTarget()!;
    const wrongIndex = (target + 1) % GRID_SIZE;

    service.onCellClick(wrongIndex);
    expect(service.playerScore()).toBe(0);
    expect(service.cells()[target]).toBe('highlight');
  });

  it('should score computer point on timeout', () => {
    service.startGame(500);
    const target = service.currentTarget()!;

    vi.advanceTimersByTime(500);
    expect(service.cells()[target]).toBe('fail');
    expect(service.computerScore()).toBe(1);
    expect(service.playerScore()).toBe(0);
  });

  it('should start next round after player scores', () => {
    service.startGame(1000);
    const target1 = service.currentTarget()!;

    service.onCellClick(target1);
    expect(service.round()).toBe(1);

    vi.advanceTimersByTime(ROUND_DELAY);
    expect(service.round()).toBe(2);
    expect(service.currentTarget()).not.toBeNull();
    expect(service.currentTarget()).not.toBe(target1);
  });

  it('should declare player winner at 10 points', () => {
    service.startGame(1000);

    for (let i = 0; i < WINNING_SCORE; i++) {
      const target = service.currentTarget()!;
      service.onCellClick(target);
      if (i < WINNING_SCORE - 1) {
        vi.advanceTimersByTime(ROUND_DELAY);
      }
    }

    expect(service.playerScore()).toBe(WINNING_SCORE);
    expect(service.winner()).toBe('player');
    expect(service.isRunning()).toBe(false);
  });

  it('should declare computer winner at 10 points', () => {
    service.startGame(100);

    for (let i = 0; i < WINNING_SCORE; i++) {
      vi.advanceTimersByTime(100);
      if (i < WINNING_SCORE - 1) {
        vi.advanceTimersByTime(ROUND_DELAY);
      }
    }

    expect(service.computerScore()).toBe(WINNING_SCORE);
    expect(service.winner()).toBe('computer');
    expect(service.isRunning()).toBe(false);
  });

  it('should reset game state', () => {
    service.startGame(1000);
    const target = service.currentTarget()!;
    service.onCellClick(target);

    service.resetGame();
    expect(service.cells().every((c) => c === 'default')).toBe(true);
    expect(service.playerScore()).toBe(0);
    expect(service.computerScore()).toBe(0);
    expect(service.isRunning()).toBe(false);
    expect(service.currentTarget()).toBeNull();
    expect(service.winner()).toBeNull();
    expect(service.round()).toBe(0);
  });

  it('should not process click when game is not running', () => {
    service.onCellClick(0);
    expect(service.playerScore()).toBe(0);
  });

  it('should not repeat same cell consecutively', () => {
    service.startGame(1000);
    const target1 = service.currentTarget()!;
    service.onCellClick(target1);
    vi.advanceTimersByTime(ROUND_DELAY);
    const target2 = service.currentTarget()!;
    expect(target2).not.toBe(target1);
  });
});
