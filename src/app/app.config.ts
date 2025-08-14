import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy, withViewTransitions } from '@angular/router';
import { icons } from 'lucide-angular';

import {
  provideClientHydration,
  Title,
  withEventReplay,
} from '@angular/platform-browser';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { routes } from './app.routes';
import { AppTitleStrategy } from './seo/title-strategy';
import { EVENT_DATE } from './tokens/EVENT_DATE';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: EVENT_DATE,
      useValue: new Date('2026-05-09T00:00:00Z'), // Set the event date
    },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    Title,
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(icons),
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
  ],
};
