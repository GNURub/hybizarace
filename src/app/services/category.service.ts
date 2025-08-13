import { effect, Injectable, signal, untracked } from "@angular/core";
import { GenderGroup, ParticipationType, WorkoutLevel } from "../components/timeline-exercises.component";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public readonly participantType = signal<ParticipationType>('individual');
  public readonly genderGroup = signal<GenderGroup>('men');
  public readonly workoutLevel = signal<WorkoutLevel>('open');

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
