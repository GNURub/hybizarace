import { Component, inject } from '@angular/core';
import { AppStateService } from '../services/state.service';

@Component({
  selector: 'app-hero-section',
  template: `
    <section class="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(254,206,0,0.1),transparent_70%)]"></div>

      <div class="container mx-auto px-4 text-center relative z-10">
        <!-- Hero Content -->
        <div class="max-w-4xl mx-auto">
          <h1 class="text-6xl md:text-8xl font-black mb-6">
            <span class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              HYBIZA
            </span>
            <br />
            <span class="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              RACE
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            El desafío fitness más épico de Ibiza. 9 estaciones de poder que pondrán a prueba tu resistencia.
          </p>

          <!-- Call to Action -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              (click)="appState.openRegistrationModal()"
              class="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-black text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 flex items-center gap-3"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              INSCRÍBETE YA
            </button>

            <button
              class="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 font-bold text-xl rounded-xl transition-all duration-300"
            >
              Ver Recorrido
            </button>
          </div>

          <!-- Event Info -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-yellow-400 text-2xl font-black">📅</div>
              <div class="text-white font-bold">25 AGOSTO</div>
              <div class="text-gray-400">2025</div>
            </div>
            <div class="text-center">
              <div class="text-yellow-400 text-2xl font-black">📍</div>
              <div class="text-white font-bold">IBIZA</div>
              <div class="text-gray-400">España</div>
            </div>
            <div class="text-center">
              <div class="text-yellow-400 text-2xl font-black">⏱️</div>
              <div class="text-white font-bold">9 ESTACIONES</div>
              <div class="text-gray-400">45 min máx.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  public readonly appState = inject(AppStateService);
}
