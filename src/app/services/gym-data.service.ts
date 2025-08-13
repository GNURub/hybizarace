import { Injectable } from '@angular/core';
import type { Area, Station } from '../models/gym.models';

@Injectable({
  providedIn: 'root',
})
export class GymDataService {
  getStations(): Station[] {
    return [
      {
        id: 1,
        name: 'Entrada Principal',
        description: 'Punto de acceso al área de entrenamiento',
        equipment: ['Control de acceso', 'Información'],
        color: 'bg-green-500',
      },
      {
        id: 2,
        name: 'Zona de Fuerza Básica',
        description: 'Equipos fundamentales para entrenamiento de fuerza',
        equipment: ['Mancuernas', 'Barras', 'Discos'],
        color: 'bg-blue-500',
      },
      {
        id: 3,
        name: 'Área de Cardio',
        description: 'Espacio amplio para ejercicios cardiovasculares',
        equipment: ['Espacio libre', 'Colchonetas'],
        color: 'bg-purple-500',
      },
      {
        id: 4,
        name: 'Estación de Pesas',
        description: 'Equipos especializados para levantamiento',
        equipment: [
          'Rack de sentadillas',
          'Banco de press',
          'Barras olímpicas',
        ],
        color: 'bg-orange-500',
      },
      {
        id: 5,
        name: 'Zona Funcional',
        description: 'Entrenamiento funcional y crossfit',
        equipment: ['TRX', 'Kettlebells', 'Cuerdas de batalla'],
        color: 'bg-red-500',
      },
      {
        id: 6,
        name: 'Máquinas de Fuerza',
        description: 'Equipos de musculación guiada',
        equipment: ['Máquinas multiestación', 'Poleas', 'Prensa'],
        color: 'bg-indigo-500',
      },
      {
        id: 7,
        name: 'Zona de inicio',
        description: 'Aquí comienza tu aventura',
        equipment: [],
        color: 'bg-teal-500',
      },
      {
        id: 8,
        name: 'Entrada después de la carrera',
        description: '',
        equipment: [],
        color: 'bg-lime-500',
      },
      {
        id: 9,
        name: 'Salida después de completar la estación',
        description: '',
        equipment: [],
        color: 'bg-yellow-500',
      }
    ];
  }

  getAreas(): Area[] {
    return [
      {
        id: 'guardarropa',
        name: 'Guardarropa',
        description: 'Vestuarios y casilleros para guardar pertenencias',
        color: 'bg-slate-400',
      },
      {
        id: 'suplementos',
        name: 'Suplementos',
        description: 'Tienda de suplementos nutricionales y deportivos',
        color: 'bg-emerald-400',
      },
      {
        id: 'willin',
        name: 'Willin',
        description: 'Área especializada de entrenamiento personalizado',
        color: 'bg-cyan-400',
      },
      {
        id: 'preso',
        name: 'Preso',
        description: 'Afloja tus músculos con nuestra máquina de presoterapia',
        color: 'bg-yellow-400',
      },
      {
        id: 'hybiza',
        name: 'Hybiza Athletes',
        description: 'Área exclusiva para atletas de alto rendimiento',
        color: 'bg-pink-400',
      },
    ];
  }
}
