import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface Prize {
  place: string;
  color: 'yellow' | 'cyan' | 'gray';
  prize: string;
  items: string[];
}

@Component({
  selector: 'app-prizes-section',
  standalone: true,
  imports: [NgClass, LucideAngularModule],
  template: `
    <section id="premios" class="py-24 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,206,0,0.15),transparent_70%)] animate-pulse"
      ></div>

      <!-- Floating trophy elements -->
      <div class="absolute top-1/4 left-1/4 opacity-10">
        <i-lucide
          class="w-32 h-32 text-yellow-400 animate-float"
          name="trophy"
        ></i-lucide>
      </div>
      <div class="absolute bottom-1/4 right-1/4 opacity-10">
        <i-lucide
          class="w-24 h-24 text-cyan-400 animate-float animation-delay-1000"
          name="medal"
        ></i-lucide>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-20">
          <div
            class="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-black text-xl px-6 py-3 mb-6 animate-pulse shadow-lg shadow-cyan-400/30 inline-block rounded"
          >
            RECOMPENSAS ÉPICAS
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-8 relative">
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-x"
            >
              PREMIOS
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            >
              Y RECONOCIMIENTOS
            </span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          @for (prize of prizes; track prize.place; let i = $index) {
            <div
              [ngClass]="{
                'border-yellow-400/50 hover:border-yellow-400':
                  prize.color === 'yellow',
                'border-cyan-400/50 hover:border-cyan-400':
                  prize.color === 'cyan',
                'border-gray-400/50 hover:border-gray-400':
                  prize.color === 'gray',
              }"
              class="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 group relative overflow-hidden rounded-lg"
            >
              <div
                [ngClass]="{
                  'from-yellow-400/10 to-orange-500/10': prize.color === 'yellow',
                  'from-cyan-400/10 to-blue-500/10': prize.color === 'cyan',
                  'from-gray-400/10 to-gray-600/10': prize.color === 'gray',
                }"
                class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <div
                [ngClass]="{
                  'from-yellow-400 to-orange-500': prize.color === 'yellow',
                  'from-cyan-400 to-blue-500': prize.color === 'cyan',
                  'from-gray-400 to-gray-600': prize.color === 'gray',
                }"
                class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r"
              ></div>

              <div class="p-8 text-center relative z-10">
                <div
                  [ngClass]="{
                    'from-yellow-400 to-orange-500': prize.color === 'yellow',
                    'from-cyan-400 to-blue-500': prize.color === 'cyan',
                    'from-gray-400 to-gray-600': prize.color === 'gray',
                  }"
                  class="w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce shadow-xl"
                >
                  <i-lucide
                    class="w-10 h-10 text-slate-900"
                    name="medal"
                  ></i-lucide>
                </div>

                <h3
                  [ngClass]="{
                    'text-yellow-400': prize.color === 'yellow',
                    'text-cyan-400': prize.color === 'cyan',
                    'text-gray-400': prize.color === 'gray',
                  }"
                  class="text-3xl font-black mb-4"
                >
                  {{ prize.place }} PUESTO
                </h3>

                <div
                  [ngClass]="{
                    'text-yellow-400': prize.color === 'yellow',
                    'text-cyan-400': prize.color === 'cyan',
                    'text-gray-400': prize.color === 'gray',
                  }"
                  class="text-2xl font-black mb-6"
                >
                  {{ prize.prize }}
                </div>

                <ul
                  class="text-gray-300 space-y-2 group-hover:text-white transition-colors duration-300"
                >
                  @for (item of prize.items; track item) {
                    <li class="flex items-center justify-center">
                      <i-lucide
                        class="w-3 h-3 mr-2 text-yellow-400"
                        name="star"
                      ></i-lucide>
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>

        <!-- Additional info section (commented out in original) -->
        <!-- <div class="text-center">
          <div
            class="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 max-w-3xl mx-auto"
          >
            <i-lucide
              name="flame"
              class="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-bounce"
            ></i-lucide>
            <p class="text-2xl text-gray-300 mb-4">
              <span
                class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black"
              >
                ¡TODOS LOS FINISHERS
              </span>
              recibirán medalla conmemorativa y camiseta oficial!
            </p>
          </div>
        </div> -->
      </div>
    </section>
  `,
  styles: ``,
})
export class PrizesSectionComponent {
  // Prizes data
  prizes: Prize[] = [
    {
      place: '1º',
      color: 'yellow',
      prize: '500€',
      items: [
        'Trofeo Hybiza Race',
        '500€ en premios',
        'Medalla de oro',
        'Kit exclusivo',
      ],
    },
    {
      place: '2º',
      color: 'cyan',
      prize: '300€',
      items: [
        'Trofeo Hybiza Race',
        '300€ en premios',
        'Medalla de plata',
        'Kit exclusivo',
      ],
    },
    {
      place: '3º',
      color: 'gray',
      prize: '200€',
      items: [
        'Trofeo Hybiza Race',
        '200€ en premios',
        'Medalla de bronce',
        'Kit exclusivo',
      ],
    },
  ];
}
