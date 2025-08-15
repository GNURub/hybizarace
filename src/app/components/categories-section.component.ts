import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface Category {
  name: string;
  title: string;
  desc: string;
  color: 'cyan' | 'yellow';
}

@Component({
  selector: 'app-categories-section',
  imports: [NgClass, LucideAngularModule],
  template: `
    <!-- Categories Section -->
    <section id="categorias" class="py-24 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(0,194,242,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,242,0.05)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-move"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-20">
          <div
            class="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black text-xl px-6 py-3 mb-6 animate-pulse shadow-lg shadow-yellow-400/30 inline-block rounded"
          >
            ELIGE TU BATALLA
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-8 relative">
            <span
              class="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent animate-gradient-x"
            >
              CATEGORÍAS
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            >
              DE COMPETICIÓN
            </span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (category of categories; track category.name; let i = $index) {
            <div
              [ngClass]="{
                'border-cyan-400/50 hover:border-cyan-400':
                  category.color === 'cyan',
                'border-yellow-400/50 hover:border-yellow-400':
                  category.color === 'yellow',
              }"
              class="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-2 transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 group relative overflow-hidden rounded-lg"
            >
              <div
                [ngClass]="{
                  'from-cyan-400/10 to-blue-500/10': category.color === 'cyan',
                  'from-yellow-400/10 to-orange-500/10':
                    category.color === 'yellow',
                }"
                class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <div
                [ngClass]="{
                  'from-cyan-400 to-blue-500': category.color === 'cyan',
                  'from-yellow-400 to-orange-500': category.color === 'yellow',
                }"
                class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r"
              ></div>

              <div class="p-8 text-center relative z-10">
                <div
                  [ngClass]="{
                    'text-cyan-400': category.color === 'cyan',
                    'text-yellow-400': category.color === 'yellow',
                  }"
                  class="text-4xl font-black mb-3 group-hover:animate-pulse"
                >
                  {{ category.name }}
                </div>
                <h3
                  class="text-xl font-bold mb-4 text-white group-hover:text-gray-200 transition-colors duration-300"
                >
                  {{ category.title }}
                </h3>
                <p
                  class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300"
                >
                  {{ category.desc }}
                </p>

                <!-- Decorative corner elements -->
                <div
                  [ngClass]="{
                    'bg-cyan-400': category.color === 'cyan',
                    'bg-yellow-400': category.color === 'yellow',
                  }"
                  class="absolute top-2 right-2 w-3 h-3 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class CategoriesSectionComponent {
  // Categories data
  categories: Category[] = [
    {
      name: 'OPEN',
      title: 'ABIERTA',
      desc: 'Perfecta para tu primera experiencia Hyrox',
      color: 'yellow',
    },
    {
      name: 'DUO',
      title: 'PAREJAS',
      desc: 'Compite junto a tu compañero en esta aventura épica',
      color: 'yellow',
    },
    {
      name: 'TEAM',
      title: 'EQUIPOS',
      desc: 'Compite junto a tu compañero en esta aventura épica',
      color: 'yellow',
    },
    {
      name: 'RX',
      title: 'ÉLITE',
      desc: 'Para atletas experimentados que buscan el máximo desafío',
      color: 'cyan',
    },
  ];
}
