import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CellComponent } from '../cell/cell.component';
import { CellState } from '../../../../core/models/game.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CellComponent, TranslateModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  readonly cells = input.required<CellState[]>();
  readonly isRunning = input(false);
  readonly hasWinner = input(false);
  readonly timerActive = input(false);
  readonly latency = input(1000);
  readonly timerKey = input(0);
  readonly timeRemaining = input(0);
  readonly cellClicked = output<number>();
  readonly startClicked = output<void>();

  onCellClick(index: number): void {
    this.cellClicked.emit(index);
  }

  onStartClick(): void {
    this.startClicked.emit();
  }
}
