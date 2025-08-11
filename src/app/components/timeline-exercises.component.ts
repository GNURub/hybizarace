import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-exercises',
  imports: [NgClass],
  template: `
    <div class="max-w-6xl mx-auto">
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent transform -translate-x-1/2"></div>

        <!-- Exercises -->
        <div class="space-y-16">
          @for (exercise of exercises; track exercise.name; let i = $index) {
            <div
              [ngClass]="{'md:flex-row-reverse': i % 2 === 1}"
              class="relative flex flex-col md:flex-row items-center">

              <!-- Exercise number (center) -->
              <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-black text-slate-900 text-xl shadow-lg shadow-yellow-400/50">
                {{ i + 1 }}
              </div>

              <!-- Exercise content -->
              <div [ngClass]="{'md:pr-16': i % 2 === 0, 'md:pl-16': i % 2 === 1}" class="w-full md:w-1/2 p-6">
                <div class="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 group">
                  <div class="flex items-center mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-bounce">
                      <i [class]="exercise.icon + ' w-6 h-6 text-slate-900'"></i>
                    </div>
                    <h3 class="text-2xl font-black text-yellow-400">{{ exercise.name }}</h3>
                  </div>

                  <p class="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {{ exercise.description }}
                  </p>

                  <div class="space-y-3">
                    <div class="flex items-center text-cyan-400">
                      <i class="lucide-clock w-4 h-4 mr-2"></i>
                      <span class="font-bold">{{ exercise.duration }}</span>
                    </div>
                    <div class="flex items-center text-yellow-400">
                      <i class="lucide-target w-4 h-4 mr-2"></i>
                      <span class="font-bold">{{ exercise.target }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Running segment (opposite side) -->
              @if (i < exercises.length - 1) {
                <div [ngClass]="{'md:pl-16': i % 2 === 0, 'md:pr-16': i % 2 === 1}" class="w-full md:w-1/2 p-6">
                  <div class="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-center text-center">
                      <div class="text-cyan-400">
                        <i class="lucide-zap w-8 h-8 mx-auto mb-2 animate-pulse"></i>
                        <p class="font-black text-lg">+500m Run</p>
                        <!-- <p class="text-sm text-gray-300">Por las calles de Ibiza</p> -->
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TimelineExercisesComponent {
  exercises = [
    {
      name: 'SANDBAG',
      description: 'Comienza el desafío trabajando brazos, core y piernas.',
      duration: '500m',
      target: 'Resistencia cardiovascular',
      icon: 'lucide-move'
    },
    {
      name: 'Assault Bike',
      description: '',
      duration: '20Cal',
      target: 'Fuerza explosiva',
      icon: 'lucide-arrow-up'
    },
    {
      name: 'Farmers Carry',
      description: '',
      duration: '100m',
      target: 'Fuerza de tracción',
      icon: 'lucide-repeat'
    },
    {
      name: 'ROWING',
      description: '',
      duration: '20Cal',
      target: 'Potencia y resistencia',
      icon: 'lucide-activity'
    },
    {
      name: 'HUSSAFELL CARRY',
      description: '',
      duration: '500m',
      target: 'Cardio y fuerza',
      icon: 'lucide-move'
    },
    {
      name: 'SKI ERG',
      description: '',
      duration: '20cal',
      target: 'Fuerza funcional',
      icon: 'lucide-dumbbell'
    },
    {
      name: 'WALKING LUNGES',
      description: '',
      duration: '100m',
      target: 'Fuerza unilateral',
      icon: 'lucide-timer'
    },
    {
      name: 'BEAR CRAWL',
      description: '',
      duration: '100m',
      target: 'Resistencia muscular',
      icon: 'lucide-crosshair'
    },
    {
      name: 'BURPEE WALL BALLS',
      description: '',
      duration: '20',
      target: 'Resistencia muscular',
      icon: 'lucide-crosshair'
    }
  ];
}
