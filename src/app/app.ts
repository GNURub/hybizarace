import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('landing');
  constructor() {
    // Register Spanish locale
    registerLocaleData(localeEs, 'es-ES');
  }
}
