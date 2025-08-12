import { NgClass, NgStyle } from '@angular/common';
import { afterNextRender, Component, ElementRef, OnDestroy, signal, viewChildren } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

type Category = 'individual' | 'duo' | 'team';
type ExerciseType = 'men' | 'women' | 'mix' | 'pro_men' | 'pro_men' | 'pro_women' | 'pro_mix';
interface Exercise {
  name: string;
  description: string;
  duration: string | Record<Category, Record<Partial<ExerciseType>, string>>;
  target: string;
  weight?: Record<Category, Record<ExerciseType, string>>;
}

@Component({
  selector: 'app-timeline-exercises',
  imports: [NgClass, NgStyle, LucideAngularModule],
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
                class="w-full md:w-1/2 p-6"
              >
                <div
                  class="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 group"
                >
                  <div class="flex items-center mb-6">
                    <div
                      class="size-24 bg-cover bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-bounce"
                      [ngStyle]="{ 'background-image': 'url(/ejercicios/' + (i + 1) + '.jpg)' }"
                    >
                    </div>
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
                    @if ( getWeight(exercise); as weight) {
                      <div class="flex items-center ">
                        <span class="mr-2">🏋️ Peso: </span>
                        <span class="font-bold text-cyan-400">{{ weight }}</span>
                      </div>
                    }
                    <div class="flex items-center">
                     <span class="mr-2">🎯 Objetivo: </span> <span class="font-bold text-cyan-400"> {{ getDuration(exercise) }}</span>
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
                  class="w-auto p-6 mt-50"
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
  exerciseElements = viewChildren<ElementRef<HTMLElement>>('exerciseElement');
  private observer?: IntersectionObserver;

  public readonly category = signal<Category>('individual');
  public readonly exerciseType = signal<ExerciseType>('men');

  exercises: Exercise[] = [
    {
      name: 'SANDBAG',
      description: 'Comienza el desafío trabajando brazos, core y piernas.',
      duration: '500 metros',
      target: 'Resistencia cardiovascular',
      weight: {
        individual: {
          men: '25 kg',
          women: '20 kg',
          mix: '',
          pro_men: '40 kg',
          pro_women: '30 kg',
          pro_mix: ''
        },
        duo: {
          men: '25 kg',
          women: '20 kg',
          mix: '25 kg',
          pro_men: '30 kg',
          pro_women: '25 kg',
          pro_mix: '30 kg'
        },
        team: {
          men: '25 kg',
          women: '20 kg',
          mix: '20-25 kg',
          pro_men: '25 kg',
          pro_women: '20 kg',
          pro_mix: '20-25 kg'
        }
      },
    },
    {
      name: 'Assault Bike',
      description: 'Pedalea con fuerza para activar todo el cuerpo.',
      duration: {
        individual: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '50 Calorías',
          pro_women: '50 Calorías',
          pro_mix: '50 Calorías'
        },
        duo: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '50 Calorías',
          pro_women: '50 Calorías',
          pro_mix: '50 Calorías'
        },
        team: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '50 Calorías',
          pro_women: '50 Calorías',
          pro_mix: '50 Calorías'
        }
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
          men: '2x10kg',
          women: '2x5kg',
          mix: '2x5kg-10kg',
          pro_men: '2x15kg',
          pro_women: '2x10kg',
          pro_mix: '2x10kg-15kg'
        },
        duo: {
          men: '2x10kg',
          women: '2x5kg',
          mix: '2x10kg',
          pro_men: '2x12.5kg',
          pro_women: '2x7.5kg',
          pro_mix: '2x7.5kg'
        },
        team: {
          men: '2x10kg',
          women: '2x5kg',
          mix: '2x5kg-10kg',
          pro_men: '2x12.5kg',
          pro_women: '2x7.5kg',
          pro_mix: '2x7.5kg-12.5kg'
        }
      },
    },
    {
      name: 'ROWING',
      description: 'Remar con fuerza para activar la parte superior del cuerpo.',
      duration: {
        individual: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '20 Calorías',
          pro_women: '20 Calorías',
          pro_mix: '20 Calorías'
        },
        duo: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '50 Calorías',
          pro_women: '50 Calorías',
          pro_mix: '50 Calorías'
        },
        team: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '20 Calorías',
          pro_women: '20 Calorías',
          pro_mix: '20 Calorías'
        }
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
          men: '30 kg',
          women: '20 kg',
          mix: '20-30 kg',
          pro_men: '40 kg',
          pro_women: '30 kg',
          pro_mix: '30-40 kg'
        },
        duo: {
          men: '30 kg',
          women: '20 kg',
          mix: '30 kg',
          pro_men: '40 kg',
          pro_women: '30 kg',
          pro_mix: '40 kg'
        },
        team: {
          men: '30 kg',
          women: '20 kg',
          mix: '20-30 kg',
          pro_men: '40 kg',
          pro_women: '30 kg',
          pro_mix: '30-40 kg'
        }
      },
    },
    {
      name: 'SKI ERG',
      description: 'Deslízate hacia atrás y hacia adelante para activar todo el cuerpo.',
      duration: {
        individual: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '20 Calorías',
          pro_women: '20 Calorías',
          pro_mix: '20 Calorías'
        },
        duo: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '50 Calorías',
          pro_women: '50 Calorías',
          pro_mix: '50 Calorías'
        },
        team: {
          men: '20 Calorías',
          women: '20 Calorías',
          mix: '20 Calorías',
          pro_men: '20 Calorías',
          pro_women: '20 Calorías',
          pro_mix: '20 Calorías'
        }
      },
      target: 'Fuerza funcional',
    },
    {
      name: 'WALKING LUNGES',
      description: 'Da un paso hacia adelante y baja la rodilla trasera hacia el suelo.',
      duration: '100 metros',
      target: 'Fuerza unilateral',
      weight: {
        individual: {
          men: '2x12.5kg',
          women: '2x7.5kg',
          mix: '2x7.5kg-12.5kg',
          pro_men: '2x15kg',
          pro_women: '2x10kg',
          pro_mix: '2x10kg-15kg'
        },
        duo: {
          men: '2x12.5kg',
          women: '2x7.5kg',
          mix: '2x12.5kg',
          pro_men: '2x15kg',
          pro_women: '2x10kg',
          pro_mix: '2x15kg'
        },
        team: {
          men: '2x12.5kg',
          women: '2x7.5kg',
          mix: '2x7.5kg-12.5kg',
          pro_men: '2x15kg',
          pro_women: '2x10kg',
          pro_mix: '2x10kg-15kg'
        }
      },
    },
    {
      name: 'BEAR CRAWL',
      description: 'Desplázate en cuatro patas mientras desplazas una pelota.',
      duration: '100 metros',
      target: 'Resistencia muscular',
      weight: {
        individual: {
          men: '25 kg',
          women: '20 kg',
          mix: '20-25 kg',
          pro_men: '40 kg',
          pro_women: '30 kg',
          pro_mix: '30-40 kg'
        },
        duo: {
          men: '25 kg',
          women: '20 kg',
          mix: '25 kg',
          pro_men: '30 kg',
          pro_women: '25 kg',
          pro_mix: '30 kg'
        },
        team: {
          men: '25 kg',
          women: '20 kg',
          mix: '20-25 kg',
          pro_men: '30 kg',
          pro_women: '25 kg',
          pro_mix: '25-30 kg'
        }
      },
    },
    {
      name: 'BURPEE WALL BALLS',
      description: 'Realiza un burpee y lanza la pelota contra la pared.',
      duration: '20 repeticiones',
      target: 'Resistencia muscular',
      weight: {
        individual: {
          men: '6 kg',
          women: '4 kg',
          mix: '4-6 kg',
          pro_men: '8 kg',
          pro_women: '6 kg',
          pro_mix: '6-8 kg'
        },
        duo: {
          men: '6 kg',
          women: '4 kg',
          mix: '6 kg',
          pro_men: '9 kg',
          pro_women: '6 kg',
          pro_mix: '9 kg'
        },
        team: {
          men: '6 kg',
          women: '4 kg',
          mix: '4-6 kg',
          pro_men: '8 kg',
          pro_women: '6 kg',
          pro_mix: '6-8 kg'
        }
      },
    },
  ];

  getDuration(exercise: Exercise): string {
    if (typeof exercise.duration === 'string') {
      return exercise.duration;
    }
    const categoryData = exercise.duration[this.category()];
    if (categoryData) {
      return categoryData[this.exerciseType()] || 'N/A';
    }
    return 'N/A';
  }

  getWeight(exercise: Exercise): string {
    if (exercise.weight) {
      const categoryData = exercise.weight[this.category()];
      if (categoryData) {
        return categoryData[this.exerciseType()] || 'N/A';
      }
    }
    return '';
  }

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observar todos los elementos cuando estén disponibles
    setTimeout(() => {
      this.exerciseElements().forEach(elementRef => {
        this.observer?.observe(elementRef.nativeElement);
      });
    }, 0);
  }
}
