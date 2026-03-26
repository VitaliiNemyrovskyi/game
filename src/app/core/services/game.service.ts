import { Injectable, signal } from '@angular/core';
import {
  CellState,
  DEFAULT_LATENCY,
  GRID_SIZE,
  ROUND_DELAY,
  WINNING_SCORE,
} from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly cells = signal<CellState[]>(Array(GRID_SIZE).fill('default'));
  readonly playerScore = signal(0);
  readonly computerScore = signal(0);
  readonly isRunning = signal(false);
  readonly currentTarget = signal<number | null>(null);
  readonly winner = signal<'player' | 'computer' | null>(null);
  readonly round = signal(0);
  readonly latency = signal(DEFAULT_LATENCY);
  readonly timerActive = signal(false);
  readonly timerKey = signal(0);
  readonly timeRemaining = signal(0);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private roundDelayId: ReturnType<typeof setTimeout> | null = null;
  private countdownId: ReturnType<typeof setInterval> | null = null;
  private lastTarget: number | null = null;

  startGame(latencyMs: number): void {
    this.clearTimers();
    this.cells.set(Array(GRID_SIZE).fill('default'));
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.isRunning.set(true);
    this.currentTarget.set(null);
    this.winner.set(null);
    this.round.set(0);
    this.latency.set(latencyMs);
    this.lastTarget = null;
    this.startRound();
  }

  onCellClick(index: number): void {
    if (!this.isRunning() || this.currentTarget() === null) return;
    if (index !== this.currentTarget()) return;

    this.clearTimers();
    this.timerActive.set(false);
    this.updateCell(index, 'success');
    this.currentTarget.set(null);
    this.playerScore.update((s) => s + 1);

    if (this.checkWinCondition()) return;
    this.scheduleNextRound();
  }

  resetGame(): void {
    this.clearTimers();
    this.cells.set(Array(GRID_SIZE).fill('default'));
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.isRunning.set(false);
    this.currentTarget.set(null);
    this.winner.set(null);
    this.round.set(0);
    this.timerActive.set(false);
    this.lastTarget = null;
  }

  destroy(): void {
    this.clearTimers();
  }

  private startRound(): void {
    const target = this.pickRandomCell();
    this.currentTarget.set(target);
    this.updateCell(target, 'highlight');
    this.round.update((r) => r + 1);
    this.timerActive.set(true);
    this.timerKey.update((k) => k + 1);
    this.startCountdown();

    this.timeoutId = setTimeout(() => {
      this.handleMiss();
    }, this.latency());
  }

  private handleMiss(): void {
    const target = this.currentTarget();
    if (target === null) return;

    this.timerActive.set(false);
    this.updateCell(target, 'fail');
    this.currentTarget.set(null);
    this.computerScore.update((s) => s + 1);

    if (this.checkWinCondition()) return;
    this.scheduleNextRound();
  }

  private scheduleNextRound(): void {
    this.roundDelayId = setTimeout(() => {
      if (this.isRunning()) {
        this.startRound();
      }
    }, ROUND_DELAY);
  }

  private checkWinCondition(): boolean {
    if (this.playerScore() >= WINNING_SCORE) {
      this.winner.set('player');
      this.isRunning.set(false);
      this.currentTarget.set(null);
      this.clearTimers();
      return true;
    }
    if (this.computerScore() >= WINNING_SCORE) {
      this.winner.set('computer');
      this.isRunning.set(false);
      this.currentTarget.set(null);
      this.clearTimers();
      return true;
    }
    return false;
  }

  private pickRandomCell(): number {
    const availableIndices: number[] = [];
    const currentCells = this.cells();
    for (let i = 0; i < GRID_SIZE; i++) {
      if (currentCells[i] === 'default' && i !== this.lastTarget) {
        availableIndices.push(i);
      }
    }
    if (availableIndices.length === 0) {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (i !== this.lastTarget) {
          availableIndices.push(i);
        }
      }
    }
    const index =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.lastTarget = index;
    return index;
  }

  private updateCell(index: number, state: CellState): void {
    this.cells.update((cells) => {
      const updated = [...cells];
      updated[index] = state;
      return updated;
    });
  }

  private startCountdown(): void {
    this.stopCountdown();
    const start = Date.now();
    const duration = this.latency();
    this.timeRemaining.set(duration);

    this.countdownId = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, duration - elapsed);
      this.timeRemaining.set(remaining);
      if (remaining <= 0) {
        this.stopCountdown();
      }
    }, 30);
  }

  private stopCountdown(): void {
    if (this.countdownId !== null) {
      clearInterval(this.countdownId);
      this.countdownId = null;
    }
    this.timeRemaining.set(0);
  }

  private clearTimers(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.roundDelayId !== null) {
      clearTimeout(this.roundDelayId);
      this.roundDelayId = null;
    }
    this.stopCountdown();
  }
}
