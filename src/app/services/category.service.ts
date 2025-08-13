import { computed, effect, Injectable, signal, untracked } from "@angular/core";
import { GenderGroup, ParticipationType, WorkoutLevel } from "../components/timeline-exercises.component";

type PaymentInfo = Record<ParticipationType, Record<GenderGroup, Record<WorkoutLevel, { price: number; description: string; stripeLink: string }>>>;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public readonly participantType = signal<ParticipationType>('individual');
  public readonly genderGroup = signal<GenderGroup>('men');
  public readonly workoutLevel = signal<WorkoutLevel>('open');
  private readonly info: PaymentInfo = {
    individual: {
      men: {
        open: {
          price: 45,
          description: 'Inscripción individual masculina - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 50,
          description: 'Inscripción individual masculina - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 60,
          description: 'Inscripción individual masculina - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      women: {
        open: {
          price: 45,
          description: 'Inscripción individual femenina - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 50,
          description: 'Inscripción individual femenina - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 60,
          description: 'Inscripción individual femenina - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      mix: {
        open: {
          price: 45,
          description: 'Inscripción individual mixta - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 50,
          description: 'Inscripción individual mixta - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 60,
          description: 'Inscripción individual mixta - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      }
    },
    duo: {
      men: {
        open: {
          price: 80,
          description: 'Inscripción duo masculino - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 90,
          description: 'Inscripción duo masculino - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 110,
          description: 'Inscripción duo masculino - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      women: {
        open: {
          price: 80,
          description: 'Inscripción duo femenino - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 90,
          description: 'Inscripción duo femenino - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 110,
          description: 'Inscripción duo femenino - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      mix: {
        open: {
          price: 80,
          description: 'Inscripción duo mixto - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 90,
          description: 'Inscripción duo mixto - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 110,
          description: 'Inscripción duo mixto - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      }
    },
    team: {
      men: {
        open: {
          price: 120,
          description: 'Inscripción equipo masculino - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 135,
          description: 'Inscripción equipo masculino - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 160,
          description: 'Inscripción equipo masculino - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      women: {
        open: {
          price: 120,
          description: 'Inscripción equipo femenino - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 135,
          description: 'Inscripción equipo femenino - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 160,
          description: 'Inscripción equipo femenino - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      },
      mix: {
        open: {
          price: 120,
          description: 'Inscripción equipo mixto - Categoría abierta',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        pro: {
          price: 135,
          description: 'Inscripción equipo mixto - Categoría pro',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        },
        elite: {
          price: 160,
          description: 'Inscripción equipo mixto - Categoría élite',
          stripeLink: 'https://book.stripe.com/test_00w00kflM0QF7Ez6UAfrW00'
        }
      }
    }
  };

  public readonly paymentInfo = computed(() => {
    return this.info[this.participantType()][this.genderGroup()][this.workoutLevel()];
  });

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
