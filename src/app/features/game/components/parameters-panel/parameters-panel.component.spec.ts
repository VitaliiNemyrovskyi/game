import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ParametersPanelComponent } from './parameters-panel.component';
import { GameService } from '../../../../core/services/game.service';

describe('ParametersPanelComponent', () => {
  let fixture: ComponentFixture<ParametersPanelComponent>;
  let component: ParametersPanelComponent;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersPanelComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametersPanelComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default latency of 1000', () => {
    expect(component.latency()).toBe(1000);
  });

  it('should update game service latency on change', () => {
    component.onLatencyChange('1500');
    expect(gameService.latency()).toBe(1500);
  });

  it('should clamp latency to min value', () => {
    component.onLatencyChange('50');
    expect(gameService.latency()).toBe(100);
  });

  it('should clamp latency to max value', () => {
    component.onLatencyChange('10000');
    expect(gameService.latency()).toBe(5000);
  });

  it('should disable input when game is running', () => {
    fixture.componentRef.setInput('isRunning', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.params__input');
    expect(input.disabled).toBe(true);
  });
});
