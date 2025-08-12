import { Component } from '@angular/core';
import { TimelineExercisesComponent } from './timeline-exercises.component';

@Component({
  selector: 'app-timeline-section',
  imports: [TimelineExercisesComponent],
  template: `
    <!-- Timeline Section -->
    <section class="py-32 relative overflow-hidden bg-slate-950">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(254,206,0,0.05),transparent_70%)]"
      ></div>

      <!-- Central Timeline Line -->
      <div
        class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent transform -translate-x-1/2 shadow-lg shadow-yellow-400/50"
      >
        <div class="absolute inset-0 bg-yellow-400 animate-pulse blur-sm"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-20">
          <div
            class="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black text-xl px-6 py-3 mb-6 animate-pulse shadow-lg shadow-yellow-400/30 inline-block rounded"
          >
            EL RECORRIDO ÉPICO
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-8 relative">
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-x"
            >
              9 ESTACIONES
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            >
              DE PODER
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Cada estación es un desafío único que pondrá a prueba diferentes
            aspectos de tu condición física
          </p>
        </div>

        <app-timeline-exercises />

        <div class="text-center mt-16">
          <div class="relative inline-block">
            <div
              class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"
            ></div>
            <span
              class="inline-flex items-center justify-center rounded-md border w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&amp;]:hover:bg-primary/90 relative bg-gradient-to-r from-cyan-400 to-yellow-400 text-slate-900 font-black text-xl px-8 py-4"
              >🏆 ¡FINISHER HYBIZA RACE! 🏆</span
            >
          </div>
          <p class="text-gray-300 mt-4 text-lg">
            <span class="text-cyan-400 font-bold">¡Felicidades!</span> Has
            completado el desafío más épico de Ibiza
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

      @keyframes gradient-x {
        0%,
        100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
    `,
  ],
})
export class TimelineSectionComponent { }
