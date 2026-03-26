import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GameService } from '../../../../core/services/game.service';
import { GridComponent } from '../../components/grid/grid.component';
import { ScoreboardComponent } from '../../components/scoreboard/scoreboard.component';
import { ParametersPanelComponent } from '../../components/parameters-panel/parameters-panel.component';
import { ResultModalComponent } from '../../components/result-modal/result-modal.component';

@Component({
  selector: 'app-arena-page',
  standalone: true,
  imports: [
    TranslateModule,
    GridComponent,
    ScoreboardComponent,
    ParametersPanelComponent,
    ResultModalComponent,
  ],
  templateUrl: './arena-page.component.html',
  styleUrl: './arena-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaPageComponent implements OnDestroy {
  protected readonly game = inject(GameService);

  readonly showModal = () => this.game.winner() !== null;

  onStartGame(latency: number): void {
    this.game.startGame(latency);
  }

  onCellClick(index: number): void {
    this.game.onCellClick(index);
  }

  onPlayAgain(): void {
    this.game.resetGame();
  }

  onExitHub(): void {
    this.game.resetGame();
  }

  ngOnDestroy(): void {
    this.game.destroy();
  }
}
