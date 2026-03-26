import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [TranslateModule, ModalComponent, ButtonComponent],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultModalComponent {
  readonly isOpen = input(false);
  readonly winner = input<'player' | 'computer' | null>(null);
  readonly playerScore = input(0);
  readonly computerScore = input(0);
  readonly playAgain = output<void>();
  readonly exitHub = output<void>();

  readonly xpGained = computed(() => this.playerScore() * 100 + 50);
  readonly creditsEarned = computed(() => this.playerScore() * 50 + 20);

  readonly playerWon = computed(() => this.winner() === 'player');
}
