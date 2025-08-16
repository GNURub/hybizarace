import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import {
  GenderGroup,
  ParticipationType,
  WorkoutLevel,
} from '../components/timeline-exercises.component';

type PaymentInfo = Record<
  ParticipationType,
  Record<
    GenderGroup,
    Record<
      WorkoutLevel,
      { price: number; description: string; url: string }
    >
  >
>;
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public readonly participantTypes = [
    {
      value: 'individual' as ParticipationType,
      label: 'Individual',
      src: '/categories/individual_men.jpeg',
    },
    {
      value: 'duo' as ParticipationType,
      label: 'Parejas',
      src: '/categories/duo_mix.jpeg',
    },
    {
      value: 'team' as ParticipationType,
      label: 'Equipo',
      src: '/categories/team_mix.jpeg',
    },
  ];

  private readonly _genderGroup = [
    { value: 'men' as GenderGroup, label: 'Masculino' },
    { value: 'women' as GenderGroup, label: 'Femenino' },
    { value: 'mix' as GenderGroup, label: 'Mixto' },
  ];

  private readonly _workoutLevels = [
    {
      value: 'open' as WorkoutLevel,
      label: 'Open',
      src: '/categories/open.jpeg',
    },
    {
      value: 'pro' as WorkoutLevel,
      label: 'Pro',
      src: '/categories/pro.jpeg',
    },
    {
      value: 'elite' as WorkoutLevel,
      label: 'Élite',
      src: '/categories/elite.jpeg',
    },
  ];

  public readonly participantType = signal<ParticipationType>('individual');
  public readonly genderGroup = signal<GenderGroup>('men');


  public readonly genderGroups = computed(() => {
    const activeParticipantType = this.participantType();
    let genderGroups = this._genderGroup;
    if (activeParticipantType === 'individual') {
      genderGroups = genderGroups.filter((type) => !type.value.includes('mix'));
    }

    return genderGroups.map((type) => ({
      ...type,
      src: `/categories/${activeParticipantType}_${type.value}.jpeg`,
    }));
  });

  public readonly workoutLevels = computed(() => {
    const activeParticipantType = this.participantType();
    let workoutLevels = this._workoutLevels;
    if (activeParticipantType === 'individual') {
      workoutLevels = workoutLevels.filter((type) => type.value.includes('elite'));
    } else {
      workoutLevels = workoutLevels.filter((type) => !['pro', 'elite'].includes(type.value));
    }

    return workoutLevels;
  });

  public readonly workoutLevel = signal<WorkoutLevel>(this.workoutLevels()[0].value);

  private readonly info: PaymentInfo = {
    individual: {
      men: {
        open: {
          price: 0,
          description: 'Inscripción individual masculina - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción individual masculina - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción individual masculina - Categoría élite',
          url: '',
        },
      },
      women: {
        open: {
          price: 0,
          description: 'Inscripción individual femenina - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción individual femenina - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción individual femenina - Categoría élite',
          url: '',
        },
      },
      mix: {
        open: {
          price: 0,
          description: 'Inscripción individual mixta - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción individual mixta - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción individual mixta - Categoría élite',
          url: '',
        },
      },
    },
    duo: {
      men: {
        open: {
          price: 80,
          description: 'Inscripción duo masculino - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción duo masculino - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción duo masculino - Categoría élite',
          url: '',
        },
      },
      women: {
        open: {
          price: 80,
          description: 'Inscripción duo femenino - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción duo femenino - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción duo femenino - Categoría élite',
          url: '',
        },
      },
      mix: {
        open: {
          price: 80,
          description: 'Inscripción duo mixto - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción duo mixto - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción duo mixto - Categoría élite',
          url: '',
        },
      },
    },
    team: {
      men: {
        open: {
          price: 80,
          description: 'Inscripción equipo masculino - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción equipo masculino - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción equipo masculino - Categoría élite',
          url: '',
        },
      },
      women: {
        open: {
          price: 80,
          description: 'Inscripción equipo femenino - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción equipo femenino - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción equipo femenino - Categoría élite',
          url: '',
        },
      },
      mix: {
        open: {
          price: 80,
          description: 'Inscripción equipo mixto - Categoría abierta',
          url: '',
        },
        pro: {
          price: 0,
          description: 'Inscripción equipo mixto - Categoría pro',
          url: '',
        },
        elite: {
          price: 0,
          description: 'Inscripción equipo mixto - Categoría élite',
          url: '',
        },
      },
    },
  };

  public readonly paymentInfo = computed(() => {
    if (this.workoutLevel() === 'elite') return null;
    return this.info[this.participantType()][this.genderGroup()][
      this.workoutLevel()
    ];
  });

  constructor() {
    effect(() => {
      const participantType = this.participantType();
      const genderGroup = untracked(() => this.genderGroup());
      if (participantType === 'individual' && genderGroup === 'mix') {
        this.genderGroup.set('men');
      }
    });

    effect(() => {
      const workoutsLevels = this.workoutLevels();
      this.workoutLevel.set(workoutsLevels[0].value);
    });
  }
}
