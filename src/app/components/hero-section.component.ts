import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AppStateService } from '../services/state.service';
import { EVENT_DATE } from '../tokens/EVENT_DATE';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, LucideAngularModule, DatePipe, NgOptimizedImage],
  template: `
    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden flex-col gap-8"
    >
      <!-- Dynamic background elements -->
      <div
        class="absolute inset-0 opacity-20"
        [style.transform]="'translateY(' + scrollY * 0.5 + 'px)'"
      >
        <div
          class="absolute top-20 left-10 w-32 h-32 border-4 border-cyan-400 rotate-45 animate-spin-slow opacity-30"
        ></div>
        <div
          class="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rotate-12 animate-bounce opacity-40"
        ></div>
        <div
          class="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-50"
        ></div>
        <div
          class="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-yellow-400 rounded-full animate-ping opacity-20"
        ></div>
      </div>

      <!-- Lightning effects -->
      <div
        class="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse opacity-60"
      ></div>

      <div
        class="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-yellow-400 to-transparent animate-pulse opacity-60 animation-delay-500"
      ></div>

      <div class="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
        <div class="mb-12 relative group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse"
          ></div>
          <img
            ngSrc="/hybizarace-logo.svg"
            alt="Hybiza Race Logo"
            width="350"
            height="350"
            priority
            class="mx-auto mb-8 drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10"
          />

          <!-- Orbiting elements -->
          <div
            class="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
          >
            <div
              class="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-spin-orbit"
            ></div>
            <div
              class="absolute bottom-0 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-spin-orbit-reverse"
            ></div>
            <div
              class="absolute left-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-spin-orbit animation-delay-1000"
            ></div>
            <div
              class="absolute right-0 top-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-spin-orbit-reverse animation-delay-1000"
            ></div>
          </div>
        </div>

        <div class="relative mb-8">
          <h1 class="text-7xl md:text-9xl font-black mb-6 leading-none relative">
            <span
              class="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x"
              style="
                text-shadow:
                  0 0 30px rgba(0, 194, 242, 0.5),
                  0 0 60px rgba(0, 194, 242, 0.3);
                filter: drop-shadow(4px 4px 0px #000)
                  drop-shadow(-2px -2px 0px #000);
              "
            >
              HYBIZA
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x"
              style="
                text-shadow:
                  0 0 30px rgba(254, 206, 0, 0.5),
                  0 0 60px rgba(254, 206, 0, 0.3);
                filter: drop-shadow(4px 4px 0px #000)
                  drop-shadow(-2px -2px 0px #000);
              "
            >
              RACE
            </span>
          </h1>

          <!-- Explosive effects around title -->
          <div class="absolute -top-8 -right-8 w-32 h-32">
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-ping"
            ></div>
            <i-lucide
              name="star"
              class="absolute top-1/2 left-1/2 w-8 h-8 text-yellow-400 -translate-x-1/2 -translate-y-1/2 animate-spin"
            ></i-lucide>
          </div>
          <div class="absolute -bottom-8 -left-8 w-24 h-24">
            <div
              class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 animate-ping animation-delay-500"
            ></div>
            <i-lucide
              name="zap"
              class="absolute top-1/2 left-1/2 w-6 h-6 text-cyan-400 -translate-x-1/2 -translate-y-1/2 animate-bounce"
            ></i-lucide>
          </div>
        </div>

        <div class="relative mb-8">
          <p
            class="text-2xl md:text-3xl font-bold text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            El evento de fitness más
            <span
              class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black"
            >
              ÉPICO
            </span>
            de las Islas Baleares llega a Ibiza.
            <br />
            <span
              class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-black"
            >
              Combina fuerza, resistencia y velocidad
            </span>
            en una experiencia única.
          </p>

          <!-- Floating words effect -->
          <div
            class="absolute -top-4 left-0 text-cyan-400/30 text-sm font-bold animate-float"
          >
            POWER
          </div>
          <div
            class="absolute -bottom-4 right-0 text-yellow-400/30 text-sm font-bold animate-float animation-delay-1000"
          >
            SPEED
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <div
            class="flex items-center gap-3 text-xl font-bold bg-slate-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
          >
            <i-lucide
              name="calendar"
              class="w-6 h-6 text-cyan-400 animate-pulse"
            ></i-lucide>
            <span>{{ EVENT_DATE | date: "longDate" }}</span>
          </div>
          <div
            class="flex items-center gap-3 text-xl font-bold bg-slate-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
          >
            <i-lucide
              name="map-pin"
              class="w-6 h-6 text-yellow-400 animate-bounce"
            />
            <span>IBIZA, ESPAÑA</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-8 justify-center">
          <button
            (click)="appState.openRegistrationModal()"
            class="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md has-[>svg]:px-4 relative bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-500 hover:via-cyan-600 hover:to-blue-600 text-slate-900 font-black px-10 py-6 text-xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-400/50 overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            ></div>
            <i-lucide name="zap" class="mr-3 animate-pulse"></i-lucide>
            INSCRIPCIÓN PARTICIPANTE
          </button>

          <a
            routerLink="/voluntarios"
            class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md has-[>svg]:px-4 relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 text-slate-900 font-black px-10 py-6 text-xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer animation-delay-500"
            ></div>
            <i-lucide
              name="hand-helping"
              class="mr-3 size-6! animate-pulse"
            ></i-lucide>
            VOLUNTARIO
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="transform translate-x-1/2">
        <div
          class="w-8 h-16 border-2 border-cyan-400 rounded-full flex justify-center relative overflow-hidden"
        >
          <div
            class="w-1 h-4 bg-gradient-to-b from-cyan-400 to-yellow-400 rounded-full mt-3 animate-scroll-indicator"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse"
          ></div>
        </div>
        <p class="text-xs text-gray-400 mt-2 animate-bounce">SCROLL</p>
      </div>
    </section>
  `,
  styles: ``,
})
export class HeroSectionComponent {
  public readonly appState = inject(AppStateService);
  protected readonly EVENT_DATE = inject(EVENT_DATE);
  scrollY = 0;

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
  }
}
