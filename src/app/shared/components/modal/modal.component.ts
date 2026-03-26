import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  onBackdropClick(): void {
    this.closed.emit();
  }

  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}
