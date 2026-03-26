import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CellState } from '../../../../core/models/game.model';

@Component({
  selector: 'app-cell',
  standalone: true,
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  readonly state = input<CellState>('default');
  readonly index = input.required<number>();
  readonly clicked = output<number>();

  onClick(): void {
    this.clicked.emit(this.index());
  }
}
