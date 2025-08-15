import { DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CountdownComponent } from '../../components/countdown.component';
import { GymFloorPlanComponent } from '../../components/gym-floor-plan/gym-floor-plan.component';
import { SponsorsComponent } from '../../components/sponsors.component';
import { TimelineSectionComponent } from '../../components/timeline-section.component';
import { AppStateService } from '../../services/state.service';
import { EVENT_DATE } from '../../tokens/EVENT_DATE';

@Component({
  selector: 'app-home',
  imports: [
    CountdownComponent,
    TimelineSectionComponent,
    SponsorsComponent,
    NgClass,
    RouterLink,
    GymFloorPlanComponent,
    LucideAngularModule,
    DatePipe,
    NgOptimizedImage,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public readonly appState = inject(AppStateService);
  protected readonly EVENT_DATE = inject(EVENT_DATE);
  private readonly router = inject(Router);
  mousePosition = { x: 0, y: 0 };
  scrollY = 0;

  // Estado del menú desplegable
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string) {
    // Normalize section ID by removing accents and converting to lowercase
    const normalizedId = sectionId
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics

    let elementId = normalizedId;

    // Handle special cases
    if (normalizedId === 'contacto') {
      // For contact, scroll to footer since there's no dedicated contact section
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  // Navigation items for the header - main sections
  navItems = ['EVENTO', 'WORKOUTS', 'CATEGORÍAS', 'PREMIOS'];

  // Additional navigation items for dropdown
  dropdownItems = [
    {
      name: 'Normativa en PDF',
      action: () => {
        const a = document.createElement('a');
        a.download = 'normativa_hybizarace:2026.pdf';
        a.href = '/assets/docs/normativa_hybizarace:2026.pdf';
        a.click();
        a.remove();
      },
    },
    {
      name: 'GUÍA DEL ATLETA',
      action: () => this.scrollToSection('guia-atleta'),
    },
    {
      name: 'PATROCINADORES',
      action: () => this.scrollToSection('patrocinadores'),
    },
    { name: 'TIENDA', action: () => this.navigateToShop() },
    { name: 'VOLUNTARIOS', action: () => this.navigateToVolunteers() },
    {
      name: 'MAPA COMPETICIÓN',
      action: () => this.scrollToSection('mapa-competicion'),
    },
    {
      name: 'ALOJAMIENTO',
      url: 'https://bookings.vibrahotels.com/es/?arrival=2026-05-06&departure=2026-05-12&adults=2&children=0&babies=0&promo=26GRP0002&view=list'
    },
    {
      name: 'SOLICITUD ÉLITE',
      action: () => this.scrollToSection('solicitud-elite'),
    },
    {
      name: 'CENTROS DEPORTIVOS',
      action: () => this.scrollToSection('centros-deportivos'),
    },
    { name: 'CONTACTO', action: () => this.scrollToSection('contacto') },
  ];

  // Método para navegar a la página de voluntarios
  navigateToVolunteers() {
    this.router.navigate(['/voluntarios']);
  }

  // Método para navegar a la tienda
  navigateToShop() {
    this.router.navigate(['/tienda']);
  }

  // Métodos para manejar el dropdown
  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  // Manejar clics en enlaces del footer
  handleFooterLinkClick(link: string) {
    const linkActions: { [key: string]: () => void } = {
      Información: () => this.scrollToSection('evento'),
      Categorías: () => this.scrollToSection('categorias'),
      Premios: () => this.scrollToSection('premios'),
      Normativa: () => this.scrollToSection('normativa'),
      Workouts: () => this.scrollToSection('workouts'),
      'Guía del Atleta': () => this.scrollToSection('guia-atleta'),
      'Solicitud Élite': () => this.scrollToSection('solicitud-elite'),
      'Centros Deportivos': () => this.scrollToSection('centros-deportivos'),
      Ropa: () => this.navigateToShop(),
      Tienda: () => this.navigateToShop(),
      Patrocinadores: () => this.scrollToSection('patrocinadores'),
      Voluntarios: () => this.navigateToVolunteers(),
      'Mapa Competición': () => this.scrollToSection('mapa-competicion'),
    };

    const action = linkActions[link];
    if (action) {
      action();
    } else if (link.includes('@')) {
      // Es un email
      window.location.href = `mailto:${link}`;
    }
  }

  // Event info data
  eventInfo = [
    {
      icon: 'target',
      title: '9 WORKOUTS',
      description:
        'Supera 9 workouts que pondrán a prueba tu fuerza, resistencia y determinación.',
      color: 'cyan',
      delay: '0',
    },
    {
      icon: 'clock',
      title: '5 KILÓMETROS RUNNING',
      description: 'Entre cada estación, corre 500 metros.',
      color: 'yellow',
      delay: '200',
    },
    {
      icon: 'trophy',
      title: 'GLORIA ETERNA',
      description:
        'Conviértete en leyenda y únete al selecto grupo de finishers de Hybiza Race.',
      color: 'cyan',
      delay: '400',
    },
  ];

  // Categories data
  categories = [
    {
      name: 'RX',
      title: 'ÉLITE',
      desc: 'Para atletas experimentados que buscan el máximo desafío',
      color: 'cyan',
    },
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
  ];

  // Prizes data
  prizes = [
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

  // Footer sections
  footerSections = [
    {
      title: 'EVENTO',
      links: ['Información', 'Categorías', 'Premios', 'Normativa', 'Workouts'],
    },
    {
      title: 'ATLETAS',
      links: [
        'Guía del Atleta',
        'Solicitud Élite',
        'Centros Deportivos',
        'Ropa',
      ],
    },
    {
      title: 'INFORMACIÓN',
      links: ['Patrocinadores', 'Voluntarios', 'Mapa Competición'],
    },
    {
      title: 'CONTACTO',
      links: ['info@hybizarace.es', 'Ibiza, España'],
    },
  ];
}
