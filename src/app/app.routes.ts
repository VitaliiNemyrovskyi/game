import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./features/game/game.routes').then((m) => m.GAME_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'game',
  },
];
