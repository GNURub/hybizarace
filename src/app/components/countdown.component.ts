import { DatePipe, DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { EVENT_DATE } from '../tokens/EVENT_DATE';

@Component({
  selector: 'app-countdown',
  imports: [LucideAngularModule, DecimalPipe, DatePipe],
  template: `
    <section
      class="py-16 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <!-- Animated background -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,242,0.1),transparent_70%)] animate-pulse"
        ></div>
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/5 to-transparent rounded-full blur-3xl animate-float"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-full blur-3xl animate-float animation-delay-1000"
        ></div>
      </div>

      <!-- Floating particles -->
      <div
        class="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40"
      ></div>
      <div
        class="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60 animation-delay-500"
      ></div>
      <div
        class="absolute bottom-16 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-30"
      ></div>
      <div
        class="absolute bottom-10 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-50 animation-delay-1000"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <!-- Countdown Badge -->
          <div
            class="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black text-lg px-8 py-4 rounded-full mb-8 animate-pulse shadow-2xl shadow-yellow-400/50"
          >
            <lucide-icon
              name="clock"
              class="w-6 h-6 animate-spin"
            ></lucide-icon>
            <span>CUENTA REGRESIVA</span>
          </div>

          <h2 class="text-4xl md:text-6xl font-black mb-4 relative">
            <span
              class="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent animate-gradient-x"
            >
              EL DESAFÍO
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-x"
            >
              COMIENZA EN
            </span>

            <!-- Lightning effects -->
            <div
              class="absolute -top-2 -right-2 w-8 h-8 border-2 border-yellow-400 rotate-45 animate-spin-slow opacity-60"
            ></div>
            <div
              class="absolute -bottom-2 -left-2 w-6 h-6 bg-cyan-400 rotate-45 animate-pulse opacity-60"
            ></div>
          </h2>
        </div>

        <!-- Countdown Timer -->
        @if (timeLeft(); as timeLeft) {
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <!-- Days -->
              <div class="group relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
                ></div>
                <div
                  class="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-2xl"
                  ></div>

                  <div
                    class="text-4xl md:text-6xl font-black text-cyan-400 mb-2 group-hover:animate-pulse"
                  >
                    {{ timeLeft.days | number: '2.0-0' }}
                  </div>
                  <div
                    class="text-lg md:text-xl font-bold text-gray-300 uppercase tracking-wider"
                  >
                    DÍAS
                  </div>

                  <!-- Decorative elements -->
                  <div
                    class="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
                  ></div>
                </div>
              </div>

              <!-- Hours -->
              <div class="group relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
                ></div>
                <div
                  class="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 border-yellow-400/30 hover:border-yellow-400 rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl"
                  ></div>

                  <div
                    class="text-4xl md:text-6xl font-black text-yellow-400 mb-2 group-hover:animate-pulse"
                  >
                    {{ timeLeft.hours | number: '2.0-0' }}
                  </div>
                  <div
                    class="text-lg md:text-xl font-bold text-gray-300 uppercase tracking-wider"
                  >
                    HORAS
                  </div>

                  <!-- Decorative elements -->
                  <div
                    class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
                  ></div>
                </div>
              </div>

              <!-- Minutes -->
              <div class="group relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
                ></div>
                <div
                  class="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-2xl"
                  ></div>

                  <div
                    class="text-4xl md:text-6xl font-black text-cyan-400 mb-2 group-hover:animate-pulse"
                  >
                    {{ timeLeft.minutes | number: '2.0-0' }}
                  </div>
                  <div
                    class="text-lg md:text-xl font-bold text-gray-300 uppercase tracking-wider"
                  >
                    MINUTOS
                  </div>

                  <!-- Decorative elements -->
                  <div
                    class="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
                  ></div>
                </div>
              </div>

              <!-- Seconds -->
              <div class="group relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
                ></div>
                <div
                  class="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 border-yellow-400/30 hover:border-yellow-400 rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl"
                  ></div>

                  <div
                    class="text-4xl md:text-6xl font-black text-yellow-400 mb-2 animate-pulse"
                  >
                    {{ timeLeft.seconds | number: '2.0-0' }}
                  </div>
                  <div
                    class="text-lg md:text-xl font-bold text-gray-300 uppercase tracking-wider"
                  >
                    SEGUNDOS
                  </div>

                  <!-- Decorative elements -->
                  <div
                    class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Event Date Display -->
        <div class="text-center mt-12">
          <div
            class="inline-flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-full px-8 py-4 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
          >
            <lucide-icon
              name="calendar"
              class="w-6 h-6 text-cyan-400 animate-pulse"
            ></lucide-icon>
            <span class="text-xl font-bold text-white">
              {{ targetDate | date: 'fullDate' }}
            </span>
            <div class="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <span class="text-lg text-gray-300"> IBIZA, ESPAÑA </span>
            <lucide-icon
              name="map-pin"
              class="w-5 h-5 text-yellow-400 animate-bounce"
            ></lucide-icon>
          </div>
        </div>

        <!-- Motivational Text -->
        <div class="text-center mt-8">
          <p
            class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Cada segundo cuenta. Cada momento te acerca al
            <span
              class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black"
            >
              desafío más épico
            </span>
            de tu vida.
            <br />
            <span
              class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-black"
            >
              ¿Estás preparado para hacer historia?
            </span>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }

      .animation-delay-500 {
        animation-delay: 500ms;
      }

      .animation-delay-1000 {
        animation-delay: 1000ms;
      }

      @keyframes gradient-x {
        0%,
        100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class CountdownComponent implements AfterViewInit, OnDestroy {
  readonly targetDate = inject(EVENT_DATE);
  protected readonly timeLeft = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  private intervalId: any;

  ngAfterViewInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance > 0) {
      this.timeLeft.set({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    } else {
      this.timeLeft.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }
}
