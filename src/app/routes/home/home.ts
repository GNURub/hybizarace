import { DatePipe, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CountdownComponent } from '../../components/countdown.component';
import { SponsorsComponent } from '../../components/sponsors.component';
import { TimelineSectionComponent } from '../../components/timeline-section.component';
import { EVENT_DATE } from '../../tokens/EVENT_DATE';

@Component({
  selector: 'app-home',
  imports: [
    CountdownComponent,
    TimelineSectionComponent,
    SponsorsComponent,
    NgClass,
    LucideAngularModule,
    DatePipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly EVENT_DATE = inject(EVENT_DATE);
  mousePosition = { x: 0, y: 0 };
  scrollY = 0;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
  }

  // Navigation items for the header
  navItems = ['EVENTO', 'CATEGORÍAS', 'PREMIOS', 'CONTACTO'];

  // Event info data
  eventInfo = [
    {
      icon: 'target',
      title: '9 ESTACIONES',
      description:
        'Supera 9 estaciones de fitness funcional que pondrán a prueba tu fuerza, resistencia y determinación.',
      color: 'cyan',
      delay: '0',
    },
    {
      icon: 'clock',
      title: '1KM RUNNING',
      description:
        'Entre cada estación, corre 1km por los paisajes más espectaculares de Ibiza.',
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
      links: ['Información', 'Categorías', 'Premios', 'Reglamento'],
    },
    {
      title: 'INSCRIPCIONES',
      links: ['Individual', 'Equipos', 'Precios', 'FAQ'],
    },
    {
      title: 'CONTACTO',
      links: ['info@hybizarace.es', '+34 971 XXX XXX', 'Ibiza, España'],
    },
  ];
}
