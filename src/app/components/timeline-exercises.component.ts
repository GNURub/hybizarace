import { NgClass, NgStyle } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ExerciseDurationPipe } from '../pipes/exercise-duration.pipe';
import { ExerciseWeightPipe } from '../pipes/exercise-weight.pipe';
import { CategoryService } from '../services/category.service';

export type ParticipationType = 'individual' | 'duo' | 'team';
export type GenderGroup = 'men' | 'women' | 'mix';
export type WorkoutLevel = 'open' | 'pro' | 'elite';
export interface Exercise {
  name: string;
  description: string;
  duration:
  | string
  | Record<
    ParticipationType,
    Record<GenderGroup, Record<WorkoutLevel, string>>
  >;
  target: string;
  weight?: Record<
    ParticipationType,
    Record<GenderGroup, Record<WorkoutLevel, string>>
  >;
}

@Component({
  selector: 'app-timeline-exercises',
  imports: [
    NgClass,
    NgStyle,
    LucideAngularModule,
    ExerciseDurationPipe,
    ExerciseWeightPipe,
  ],
  template: `
    <div class="max-w-6xl mx-auto">
      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent transform -translate-x-1/2"
        ></div>

        <!-- Exercises -->
        <div class="space-y-16">
          @for (exercise of exercises; track exercise.name; let i = $index) {
            <div
              #exerciseElement
              [ngClass]="{ 'md:flex-row-reverse': i % 2 === 1 }"
              class="relative flex flex-col md:flex-row items-center opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              <!-- Exercise number (center) -->
              <div
                class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-black text-slate-900 text-xl shadow-lg shadow-yellow-400/50"
              >
                {{ i + 1 }}
              </div>

              <!-- Exercise content -->
              <div
                [ngClass]="{ 'md:pr-16': i % 2 === 0, 'md:pl-16': i % 2 === 1 }"
                class="w-full md:w-1/2 p-6 z-20"
              >
                <div
                  class="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 group"
                >
                  <div class="flex items-center mb-6">
                    <div
                      class="size-24 aspect-square bg-cover bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-bounce"
                      [ngStyle]="{
                        'background-image':
                          'url(/ejercicios/' + (i + 1) + '.jpg)',
                      }"
                    ></div>
                    <h3 class="text-2xl font-black text-yellow-400">
                      {{ exercise.name }}
                    </h3>
                  </div>

                  <p
                    class="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300"
                  >
                    {{ exercise.description }}
                  </p>

                  <div class="space-y-3">
                    @if (
                      exercise
                        | exerciseWeight
                          : categoryService.participantType()
                          : categoryService.genderGroup()
                          : categoryService.workoutLevel();
                      as weight
                    ) {
                      <div class="flex items-center ">
                        <span class="mr-2">🏋️ Peso: </span>
                        <span class="font-bold text-cyan-400">{{
                          weight
                        }}</span>
                      </div>
                    }
                    <div class="flex items-center">
                      <span class="mr-2">🎯 Objetivo: </span>
                      <span class="font-bold text-cyan-400">
                        {{
                          exercise
                            | exerciseDuration
                              : categoryService.participantType()
                              : categoryService.genderGroup()
                              : categoryService.workoutLevel()
                        }}</span
                      >
                    </div>
                    <div class="flex items-center text-yellow-400">
                      <i-lucide name="target" class="w-4 h-4 mr-2" />
                      <span class="font-bold">{{ exercise.target }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Running segment (opposite side) -->
              @if (i < exercises.length - 1) {
                <div
                  [ngClass]="{
                    'md:pl-16': i % 2 === 0,
                    'md:pr-16': i % 2 === 1,
                  }"
                  class="w-auto p-6 md:mt-50"
                >
                  <div
                    class="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
                  >
                    <div class="flex items-center justify-center text-center">
                      <div class="text-cyan-400">
                        <i
                          class="lucide-zap w-8 h-8 mx-auto mb-2 animate-pulse"
                        ></i>
                        <p class="font-black text-lg">+ 🏃 500m Run</p>
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
export class TimelineExercisesComponent implements OnDestroy {
  protected readonly categoryService = inject(CategoryService);
  exerciseElements = viewChildren<ElementRef<HTMLElement>>('exerciseElement');
  private observer?: IntersectionObserver;

  exercises: Exercise[] = [
    {
      name: 'SANDBAG',
      description: 'Comienza el desafío trabajando brazos, core y piernas.',
      duration: '500 metros',
      target: 'Resistencia cardiovascular',
      weight: {
        individual: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x20 kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '30 kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x20 kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '30 kg' },
          mix: { open: '25 kg', pro: '30 kg', elite: '2x20 kg' },
        },
        team: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x20 kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '30 kg' },
          mix: { open: '25 kg', pro: '30 kg', elite: '2x20 kg' },
        },
      },
    },
    {
      name: 'Assault Bike',
      description: 'Pedalea con fuerza para activar todo el cuerpo.',
      duration: {
        individual: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
        team: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
      },
      target: 'Fuerza explosiva',
    },
    {
      name: 'Farmers Carry',
      description: 'Transporta los discos a lo largo de 100 metros.',
      duration: '100 metros',
      target: 'Fuerza de tracción',
      weight: {
        individual: {
          men: { open: '2x10kg', pro: '2x12.5kg', elite: '2x15kg' },
          women: { open: '2x5kg', pro: '2x7.5kg', elite: '2x10kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '2x10kg', pro: '2x12.5kg', elite: '2x15kg' },
          women: { open: '2x5kg', pro: '2x7.5kg', elite: '2x10kg' },
          mix: { open: '2x10kg', pro: '2x7.5kg', elite: '2x15kg' },
        },
        team: {
          men: { open: '2x10kg', pro: '2x12.5kg', elite: '2x15kg' },
          women: { open: '2x5kg', pro: '2x7.5kg', elite: '2x10kg' },
          mix: { open: '2x10kg', pro: '2x7.5kg', elite: '2x15kg' },
        },
      },
    },
    {
      name: 'ROWING',
      description:
        'Remar con fuerza para activar la parte superior del cuerpo.',
      duration: {
        individual: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
        duo: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
        team: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
      },
      target: 'Potencia y resistencia',
    },
    {
      name: 'HUSSAFELL CARRY',
      description: 'Transporta el saco a lo largo de 500 metros.',
      duration: '500 metros',
      target: 'Cardio y fuerza',
      weight: {
        individual: {
          men: { open: '30 kg', pro: '40 kg', elite: '50 kg' },
          women: { open: '20 kg', pro: '30 kg', elite: '40 kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '30 kg', pro: '40 kg', elite: '50 kg' },
          women: { open: '20 kg', pro: '30 kg', elite: '40 kg' },
          mix: { open: '30 kg', pro: '40 kg', elite: '50 kg' },
        },
        team: {
          men: { open: '30 kg', pro: '40 kg', elite: '50 kg' },
          women: { open: '20 kg', pro: '30 kg', elite: '40 kg' },
          mix: { open: '30 kg', pro: '40 kg', elite: '50 kg' },
        },
      },
    },
    {
      name: 'SKI ERG',
      description:
        'Deslízate hacia atrás y hacia adelante para activar todo el cuerpo.',
      duration: {
        individual: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
        duo: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
        team: {
          men: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          women: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
          mix: {
            open: '20 Calorías',
            pro: '50 Calorías',
            elite: '50 Calorías',
          },
        },
      },
      target: 'Fuerza funcional',
    },
    {
      name: 'WALKING LUNGES',
      description:
        'Da un paso hacia adelante y baja la rodilla trasera hacia el suelo.',
      duration: '100 metros',
      target: 'Fuerza unilateral',
      weight: {
        individual: {
          men: { open: '2x12.5kg', pro: '2x15kg', elite: '2x20kg' },
          women: { open: '2x7.5kg', pro: '2x10kg', elite: '2x15kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '2x12.5kg', pro: '2x15kg', elite: '2x20kg' },
          women: { open: '2x7.5kg', pro: '2x10kg', elite: '2x15kg' },
          mix: { open: '2x12.5kg', pro: '2x15kg', elite: '2x20kg' },
        },
        team: {
          men: { open: '2x12.5kg', pro: '2x15kg', elite: '2x20kg' },
          women: { open: '2x7.5kg', pro: '2x10kg', elite: '2x15kg' },
          mix: { open: '2x12.5kg', pro: '2x15kg', elite: '2x20kg' },
        },
      },
    },
    {
      name: 'BEAR CRAWL',
      description: 'Desplázate en cuatro patas mientras desplazas una pelota.',
      duration: '100 metros',
      target: 'Resistencia muscular',
      weight: {
        individual: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x25kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '2x20kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x25kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '2x20kg' },
          mix: { open: '25 kg', pro: '30 kg', elite: '2x25kg' },
        },
        team: {
          men: { open: '25 kg', pro: '30 kg', elite: '2x25kg' },
          women: { open: '20 kg', pro: '25 kg', elite: '2x20kg' },
          mix: { open: '25 kg', pro: '30 kg', elite: '2x25kg' },
        },
      },
    },
    {
      name: 'BURPEE WALL BALLS',
      description: 'Realiza un burpee y lanza la pelota contra la pared.',
      duration: {
        individual: {
          men: {
            open: '20 repeticiones',
            pro: '30 repeticiones',
            elite: '50 repeticiones',
          },
          women: {
            open: '20 repeticiones',
            pro: '30 repeticiones',
            elite: '50 repeticiones',
          },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
          women: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
          mix: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
        },
        team: {
          men: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
          women: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
          mix: {
            open: '50 repeticiones',
            pro: '50 repeticiones',
            elite: '50 repeticiones',
          },
        },
      },
      target: 'Resistencia muscular',
      weight: {
        individual: {
          men: { open: '6 kg', pro: '9 kg', elite: '12 kg' },
          women: { open: '4 kg', pro: '6 kg', elite: '9 kg' },
          mix: { open: '', pro: '', elite: '' },
        },
        duo: {
          men: { open: '6 kg', pro: '9 kg', elite: '12 kg' },
          women: { open: '4 kg', pro: '6 kg', elite: '9 kg' },
          mix: { open: '6 kg', pro: '9 kg', elite: '12 kg' },
        },
        team: {
          men: { open: '6 kg', pro: '9 kg', elite: '12 kg' },
          women: { open: '4 kg', pro: '6 kg', elite: '9 kg' },
          mix: { open: '6 kg', pro: '9 kg', elite: '12 kg' },
        },
      },
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.remove('opacity-0', 'translate-y-8');
            element.classList.add('opacity-100', 'translate-y-0');
            this.observer?.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    // Observar todos los elementos cuando estén disponibles
    setTimeout(() => {
      this.exerciseElements().forEach((elementRef) => {
        this.observer?.observe(elementRef.nativeElement);
      });
    }, 0);
  }
}
