import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationModalComponent } from './components/registration-modal.component';
import { AppStateService } from './services/state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public readonly appState = inject(AppStateService);

  constructor() {
    // Register Spanish locale
    registerLocaleData(localeEs, 'es-ES');
  }
}
