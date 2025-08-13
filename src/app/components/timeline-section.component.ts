import { Component, effect, signal, untracked } from '@angular/core';
import {
  GenderGroup,
  ParticipationType,
  TimelineExercisesComponent,
  WorkoutLevel,
} from './timeline-exercises.component';

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

        <!-- Selector de categoria/exerciseType -->
        <div class="flex justify-center mb-16">
          <div
            class="bg-slate-900/50 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8"
          >
            <h2 class="text-3xl font-bold text-white mb-6 text-center">
              Selecciona tu categoría y modalidad
            </h2>
            <!-- Selector de Categoría -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-yellow-400 mb-4 text-center">
                Grupo de participación
              </h3>
              <div class="flex gap-4 justify-center">
                @for (pt of participantTypes; track pt.value) {
                  <div
                    class="flex flex-col items-center gap-4"
                    [class.opacity-30]="participantType() !== pt.value"
                  >
                    <button
                      (click)="participantType.set(pt.value)"
                      [class.ring-4]="participantType() === pt.value"
                      [class.ring-yellow-400]="participantType() === pt.value"
                      [class.scale-110]="participantType() === pt.value"
                      class="group relative w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
                    >
                      <img
                        [src]="pt.src"
                        alt="{{ pt.label }}"
                        class="w-full h-full object-cover rounded-full"
                      />
                    </button>
                    <span class="flex items-center justify-center font-bold">
                      {{ pt.label }}
                    </span>
                  </div>
                }
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-xl font-bold text-yellow-400 mb-4 text-center">
                Categoría
              </h3>
              <div class="flex gap-3 justify-center flex-wrap">
                @for (gg of genderGroups; track gg.value) {
                  <div
                    class="flex flex-col items-center gap-4"
                    [class.opacity-30]="genderGroup() !== gg.value"
                  >
                    <button
                      (click)="genderGroup.set(gg.value)"
                      [class.ring-4]="genderGroup() === gg.value"
                      [class.ring-yellow-400]="genderGroup() === gg.value"
                      [class.scale-110]="genderGroup() === gg.value"
                      class="group relative size-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
                    >
                      <img
                        [src]="gg.src"
                        alt="{{ gg.label }}"
                        class="w-full h-full object-cover rounded-full"
                      />
                    </button>
                    <span class="flex items-center justify-center font-bold">
                      {{ gg.label }}
                    </span>
                  </div>
                }
              </div>
            </div>

            <!-- Selector de Tipo de Ejercicio -->
            <div>
              <h3 class="text-xl font-bold text-yellow-400 mb-4 text-center">
                Modalidad
              </h3>
              <div class="flex gap-3 justify-center flex-wrap">
                @for (wl of workoutLevels; track wl.value) {
                  <div
                    class="flex flex-col items-center gap-4"
                    [class.opacity-30]="workoutLevel() !== wl.value"
                  >
                    <button
                      (click)="workoutLevel.set(wl.value)"
                      [class.ring-4]="workoutLevel() === wl.value"
                      [class.ring-yellow-400]="workoutLevel() === wl.value"
                      [class.scale-110]="workoutLevel() === wl.value"
                      class="group relative size-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
                    >
                      <img
                        [src]="wl.src"
                        alt="{{ wl.label }}"
                        class="w-full h-full object-cover rounded-full"
                      />
                    </button>
                    <span class="flex items-center justify-center font-bold">
                      {{ wl.label }}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <app-timeline-exercises
          [participantType]="participantType()"
          [genderGroup]="genderGroup()"
          [workoutLevel]="workoutLevel()"
        />

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
export class TimelineSectionComponent {
  public readonly participantType = signal<ParticipationType>('individual');
  public readonly genderGroup = signal<GenderGroup>('men');
  public readonly workoutLevel = signal<WorkoutLevel>('open');

  public readonly participantTypes = [
    {
      value: 'individual' as ParticipationType,
      label: 'Individual',
      src: '/categories/individual_women.jpeg',
    },
    {
      value: 'duo' as ParticipationType,
      label: 'Duo',
      src: '/categories/duo_men.jpeg',
    },
    {
      value: 'team' as ParticipationType,
      label: 'Equipo',
      src: '/categories/team_women.jpeg',
    },
  ];

  private readonly _genderGroup = [
    { value: 'men' as GenderGroup, label: 'Masculino' },
    { value: 'women' as GenderGroup, label: 'Femenino' },
    { value: 'mix' as GenderGroup, label: 'Mixto' },
  ];

  public readonly workoutLevels = [
    {
      value: 'open' as WorkoutLevel,
      label: 'Abierto',
      src: '/categories/open.jpeg',
    },
    {
      value: 'pro' as WorkoutLevel,
      label: 'Pro',
      src: '/categories/advanced.jpeg',
    },
    {
      value: 'elite' as WorkoutLevel,
      label: 'Élite',
      src: '/categories/elite.jpeg',
    },
  ];

  get genderGroups() {
    const activeParticipantType = this.participantType();
    let genderGroups = this._genderGroup;
    if (activeParticipantType === 'individual') {
      genderGroups = genderGroups.filter((type) => !type.value.includes('mix'));
    }

    return genderGroups.map((type) => ({
      ...type,
      src: `/categories/${activeParticipantType}_${type.value}.jpeg`,
    }));
  }

  constructor() {
    effect(() => {
      const participantType = this.participantType();
      const genderGroup = untracked(() => this.genderGroup());
      if (participantType === 'individual' && genderGroup === 'mix') {
        this.genderGroup.set('men');
      }
    });
  }
}
