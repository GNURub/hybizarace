import { Component, inject, input, output } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategorySelectorComponent } from './category-selector.component';

export interface RegistrationModalConfig {
  stripeUrl: string;
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-registration-modal',
  imports: [CategorySelectorComponent],
  template: `
    @if (isOpen()) {
      <!-- Modal Backdrop -->
      <div
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        (click)="onBackdropClick($event)"
      >
        <!-- Modal Content -->
        <div
          class="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/20"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div
            class="sticky top-0 bg-slate-900 border-b border-yellow-400/30 p-6 rounded-t-3xl"
          >
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-3xl font-black text-white mb-2">
                  {{ title() }}
                </h2>
                @if (description()) {
                  <p class="text-gray-300">{{ description() }}</p>
                }
              </div>
              <button
                (click)="closeModal()"
                class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
                aria-label="Cerrar modal"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-6">
            <!-- Warning Banner -->
            <div
              class="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6"
            >
              <div class="flex items-start gap-3">
                <div class="text-yellow-400 mt-0.5">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-yellow-400 font-bold mb-1">Importante</h4>
                  <p class="text-gray-300 text-sm">
                    Selecciona tu categoría y modalidad antes de proceder al
                    pago. Esta información será necesaria para completar tu
                    inscripción.
                  </p>
                </div>
              </div>
            </div>

            <!-- Category Selector -->
            <div
              class="bg-slate-800/50 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-6 mb-6"
            >
              <app-category-selector />
            </div>

            <!-- Pricing Info -->
            <div
              class="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6 mb-6"
            >
              <h3 class="text-xl font-bold text-white mb-3 text-center">
                💰 Información de Precio
              </h3>
              <div class="text-3xl font-bold text-yellow-400 text-center mb-4">
                <span>{{ categoryService.paymentInfo().price }} €</span>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="sticky bottom-0 bg-slate-900 border-t border-yellow-400/30 p-6 rounded-b-3xl"
          >
            <div class="flex gap-4">
              <button
                (click)="closeModal()"
                class="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <a
                [href]="categoryService.paymentInfo().stripeLink"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-black text-center rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                Proceder al Pago
              </a>
            </div>
            <p class="text-xs text-gray-400 text-center mt-3">
              Serás redirigido a Stripe para completar el pago de forma segura
            </p>
          </div>
        </div>
      </div>
    }
  `,
})
export class RegistrationModalComponent {
  public readonly categoryService = inject(CategoryService);
  // Inputs
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('🏃‍♂️ Inscripción HYBIZA RACE');
  readonly description = input<string>(
    'Completa tu inscripción para el desafío más épico de Ibiza',
  );

  // Outputs
  readonly close = output<void>();

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    event.stopPropagation();
    this.closeModal();
  }
}
