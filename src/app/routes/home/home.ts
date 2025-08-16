import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CategoriesSectionComponent } from '../../components/categories-section.component';
import { CountdownComponent } from '../../components/countdown.component';
import { GymFloorPlanComponent } from '../../components/gym-floor-plan/gym-floor-plan.component';
import { HeroSectionComponent } from '../../components/hero-section.component';
import { PrizesSectionComponent } from '../../components/prizes-section.component';
import { SponsorsComponent } from '../../components/sponsors.component';
import { TimelineSectionComponent } from '../../components/timeline-section.component';
import { AppStateService } from '../../services/state.service';
import { EVENT_DATE } from '../../tokens/EVENT_DATE';

interface InteractiveItem {
  name: string;
  action?: () => void;
  url?: string;
}
@Component({
  selector: 'app-home',
  imports: [
    CountdownComponent,
    TimelineSectionComponent,
    PrizesSectionComponent,
    HeroSectionComponent,
    CategoriesSectionComponent,
    SponsorsComponent,
    NgClass,
    RouterLink,
    GymFloorPlanComponent,
    LucideAngularModule,
    NgOptimizedImage,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public readonly today = new Date();
  public readonly appState = inject(AppStateService);
  protected readonly EVENT_DATE = inject(EVENT_DATE);
  private readonly router: Router = inject(Router);
  mousePosition = { x: 0, y: 0 };

  // Estado del menú desplegable
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
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
    console.log(`Scrolling to section: ${sectionId}`);
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
  dropdownItems: InteractiveItem[] = [
    {
      name: 'NORMATIVA',
      url: '/documents/normativa_hybizarace_2026.pdf',
    },
    {
      name: 'GUÍA DEL ATLETA',
      url: '/documents/guia_atleta.pdf',
    },
    {
      name: 'PATROCINADORES',
      action: () => this.scrollToSection('sponsors'),
    },
    { name: 'VOLUNTARIOS', action: () => this.router.navigateByUrl('/voluntarios') },
    {
      name: 'MAPA COMPETICIÓN',
      action: () => this.scrollToSection('gym-floor-plan'),
    },
    {
      name: 'ALOJAMIENTO',
      url: 'https://bookings.vibrahotels.com/es/?arrival=2026-05-06&departure=2026-05-12&adults=2&children=0&babies=0&promo=26GRP0002&view=list',
    },
    {
      name: 'SOLICITUD ÉLITE',
      url: 'https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZ__poBFb9URE1EVzlBM1JJUkU4NU9KSVNSNFhTVEE0Sy4u&origin=lprLink&route=shorturl',
    },
    {
      name: 'CENTROS DEPORTIVOS',
      action: () => this.scrollToSection('centros-deportivos'),
    },
    { name: 'CONTACTO', action: () => this.scrollToSection('contacto') },
  ];

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

  // Footer sections
  footerSections: { title: string; links: InteractiveItem[] }[] = [
    {
      title: 'EVENTO',
      links: [
        { name: 'Información' },
        { name: 'Categorías', action: () => this.scrollToSection('categories') },
        { name: 'Premios', action: () => this.scrollToSection('prizes') },
        { name: 'Normativa', url: '/documents/normativa_hybizarace_2026.pdf' },
        { name: 'Workouts', action: () => this.scrollToSection('workouts') },
      ],
    },
    {
      title: 'ATLETAS',
      links: [
        { name: 'Guía del Atleta', url: '/documents/guia_atleta.pdf' },
        { name: 'Solicitud Élite', url: 'https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZ__poBFb9URE1EVzlBM1JJUkU4NU9KSVNSNFhTVEE0Sy4u&origin=lprLink&route=shorturl' },
        { name: 'Centros Deportivos', url: '' },
        { name: 'Tienda', action: () => this.router.navigateByUrl('tienda') },
      ],
    },
    {
      title: 'INFORMACIÓN',
      links: [
        { name: 'Patrocinadores', action: () => this.scrollToSection('sponsors') },
        { name: 'Voluntarios', action: () => this.router.navigateByUrl('voluntarios') },
        { name: 'Mapa Competición', action: () => this.scrollToSection('gym-floor-plan') },
      ],
    },
    {
      title: 'CONTACTO',
      links: [
        { name: 'info@hybizarace.es', url: 'mailto:info@hybizarace.es' },
        { name: 'Ibiza, España', url: 'https://www.google.com/maps/place/Ibiza,+España' },
      ],
    },
  ];
}
