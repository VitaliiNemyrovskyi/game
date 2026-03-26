import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MAX_LATENCY, MIN_LATENCY } from '../../../../core/models/game.model';
import { GameService } from '../../../../core/services/game.service';

@Component({
  selector: 'app-parameters-panel',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './parameters-panel.component.html',
  styleUrl: './parameters-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametersPanelComponent {
  private readonly game = inject(GameService);
  readonly isRunning = input(false);

  readonly latency = this.game.latency;
  readonly minLatency = MIN_LATENCY;
  readonly maxLatency = MAX_LATENCY;

  onLatencyChange(value: string): void {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      this.game.latency.set(Math.max(this.minLatency, Math.min(this.maxLatency, parsed)));
    }
  }
}
