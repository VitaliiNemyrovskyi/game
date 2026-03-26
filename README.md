# Kinetic Grid

A fast-paced reaction time mini-game built with Angular 21. Click highlighted cells before time runs out and compete against the System AI. First to 10 points wins.

## Prerequisites

- **Node.js** >= 22
- **npm** >= 10

## Setup

```bash
npm ci
```

## Development

```bash
npx ng serve
```

Open http://localhost:4200/

## Tests

```bash
npx ng test
```

## Production build

```bash
npx ng build --configuration production
```

Build output: `dist/kinetic-grid/browser/`

## Features

- 10x10 interactive grid with color-coded cell states
- Configurable reaction time (100-5000ms)
- Dark / Light theme
- English / Ukrainian language support
- Custom result modal with scores
- Timer progress bar
- Responsive layout (desktop sidebar + mobile bottom nav)

## Tech stack

- Angular 21 (standalone, zoneless, OnPush)
- Vitest
- SCSS with CSS custom properties
- ngx-translate
- GitHub Pages (CI/CD via GitHub Actions)
