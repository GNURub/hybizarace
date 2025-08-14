import { CommonModule, NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.css'
})
export class Volunteers {

  // Señales para el estado del componente
  isLoading = signal(false);

  // URLs para los enlaces
  readonly volunteerSignupUrl = 'https://volunteersignup.org/98CDJ';
  readonly telegramUrl = 'https://t.me/+XtizcOuger43YWRk'; // Aquí se debería agregar el enlace real del grupo de Telegram

  constructor() {
    afterNextRender(() => {
      // Animación de entrada suave
      this.animateOnLoad();
    });
  }

  /**
   * Maneja la animación de entrada de la página
   */
  private animateOnLoad() {
    const elements = document.querySelectorAll('.volunteer-card, .requirement-item, .registration-option');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-float-up');
      }, index * 100);
    });
  }

  /**
   * Abre el enlace de registro de voluntarios
   */
  openVolunteerSignup() {
    window.open(this.volunteerSignupUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre el enlace de Telegram
   */
  openTelegram() {
    window.open(this.telegramUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Copia un enlace al portapapeles
   */
  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.showTemporaryMessage('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      this.showTemporaryMessage('Error al copiar el enlace');
    }
  }

  /**
   * Muestra un mensaje temporal
   */
  private showTemporaryMessage(message: string) {
    // Crear elemento de notificación temporal
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-cyan-400 text-slate-900 px-6 py-3 rounded-lg font-semibold z-50 animate-float-up';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  /**
   * Maneja el scroll suave a secciones
   */
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Información de los turnos de voluntarios
   */
  readonly volunteerShifts = [
    {
      id: 'v1',
      name: 'VOLUNTARIO V1',
      schedule: '7:30H - 13:30H',
      duration: '6 horas',
      color: 'cyan',
      benefits: [
        'Bocadillo + Bebida',
        'Inscripción gratis',
        'Camiseta Staff'
      ],
      note: 'Los voluntarios V1 que quieran competir ese mismo día saldrán en la última tanda de parejas open.',
      icon: 'sun'
    },
    {
      id: 'v2',
      name: 'VOLUNTARIO V2',
      schedule: '13:00H - 19:00H',
      duration: '6 horas',
      color: 'yellow',
      benefits: [
        'Bocadillo + Bebida',
        'Inscripción gratis',
        'Camiseta Staff'
      ],
      note: 'Los voluntarios V2 que quieran la inscripción será para el próximo evento.',
      icon: 'moon'
    }
  ];

  /**
   * Requisitos para ser voluntario
   */
  readonly requirements = [
    {
      id: 'punctuality',
      title: 'Puntualidad',
      description: 'Llegar 20 minutos antes para la reunión previa para poder resolver las dudas y organizar a todos los voluntarios de cada sección.',
      icon: 'clock',
      color: 'cyan'
    },
    {
      id: 'commitment',
      title: 'Compromiso',
      description: 'El turno debe ser completo para lograr los beneficios citados en la tabla.',
      icon: 'check-circle',
      color: 'yellow'
    },
    {
      id: 'policy',
      title: 'Política de cambios',
      description: 'Los códigos usados no son reembolsables y cualquier cambio tiene un coste de 10€ desde la app de elitechip.',
      icon: 'alert-triangle',
      color: 'red'
    },
    {
      id: 'food',
      title: 'Área de competición',
      description: 'No se permite comer en la zona de competición.',
      icon: 'x-circle',
      color: 'orange'
    },
    {
      id: 'location',
      title: 'Permanencia en zona',
      description: 'No se puede abandonar la zona asignada sin previo aviso al encargado de los voluntarios.',
      icon: 'map-pin',
      color: 'purple'
    }
  ];
}
