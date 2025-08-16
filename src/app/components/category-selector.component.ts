import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import {
  GenderGroup,
  ParticipationType,
  WorkoutLevel,
} from './timeline-exercises.component';

export interface ParticipantTypeOption {
  value: ParticipationType;
  label: string;
  src: string;
}

export interface GenderGroupOption {
  value: GenderGroup;
  label: string;
  src: string;
}

export interface WorkoutLevelOption {
  value: WorkoutLevel;
  label: string;
  src: string;
}

@Component({
  selector: 'app-category-selector',
  template: `
    <div class="selector-category">
      <!-- Selector de Categoría -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-yellow-400 mb-4 text-center">
          Grupo de participación
        </h3>
        <div class="flex gap-4 justify-center">
          @for (pt of categoryService.participantTypes; track pt.value) {
            <div
              class="flex flex-col items-center gap-4"
              [class.opacity-30]="
                categoryService.participantType() !== pt.value
              "
            >
              <button
                (click)="categoryService.participantType.set(pt.value)"
                [class.ring-4]="categoryService.participantType() === pt.value"
                [class.ring-yellow-400]="
                  categoryService.participantType() === pt.value
                "
                [class.scale-110]="
                  categoryService.participantType() === pt.value
                "
                class="group relative cursor-pointer size-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
              >
                <img
                  [src]="pt.src"
                  [alt]="pt.label"
                  class="w-full h-full object-cover rounded-full pointer-events-none"
                />
              </button>
              <span
                class="flex items-center justify-center font-bold text-white"
              >
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
          @for (gg of categoryService.genderGroups(); track gg.value) {
            <div
              class="flex flex-col items-center gap-4"
              [class.opacity-30]="categoryService.genderGroup() !== gg.value"
            >
              <button
                (click)="categoryService.genderGroup.set(gg.value)"
                [class.ring-4]="categoryService.genderGroup() === gg.value"
                [class.ring-yellow-400]="
                  categoryService.genderGroup() === gg.value
                "
                [class.scale-110]="categoryService.genderGroup() === gg.value"
                class="group relative cursor-pointer size-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
              >
                <img
                  [src]="gg.src"
                  [alt]="gg.label"
                  class="w-full h-full object-cover rounded-full pointer-events-none"
                />
              </button>
              <span
                class="flex items-center justify-center font-bold text-white"
              >
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
          @for (wl of categoryService.workoutLevels(); track wl.value) {
            <div
              class="flex flex-col items-center gap-4"
              [class.opacity-30]="categoryService.workoutLevel() !== wl.value"
            >
              <button
                (click)="categoryService.workoutLevel.set(wl.value)"
                [class.ring-4]="categoryService.workoutLevel() === wl.value"
                [class.ring-yellow-400]="
                  categoryService.workoutLevel() === wl.value
                "
                [class.scale-110]="categoryService.workoutLevel() === wl.value"
                class="group cursor-pointer relative size-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center font-black text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
              >
                <img
                  [src]="wl.src"
                  [alt]="wl.label"
                  class="w-full h-full object-cover rounded-full pointer-events-none"
                />
              </button>
              <span
                class="flex items-center justify-center font-bold text-white"
              >
                {{ wl.label }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CategorySelectorComponent {
  protected readonly categoryService = inject(CategoryService);
}
