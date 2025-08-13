import { Pipe, PipeTransform } from '@angular/core';
import {
  Exercise,
  GenderGroup,
  ParticipationType,
  WorkoutLevel,
} from '../components/timeline-exercises.component';

@Pipe({
  name: 'exerciseWeight',
})
export class ExerciseWeightPipe implements PipeTransform {
  transform(
    exercise: Exercise,
    participantType: ParticipationType,
    genderGroup: GenderGroup,
    workoutLevel: WorkoutLevel,
  ): string {
    console.log(
      `Getting weight for ${exercise.name} - Participant: ${participantType}, Gender: ${genderGroup}, Level: ${workoutLevel}`,
    );
    if (exercise.weight) {
      const categoryData = exercise.weight[participantType];
      if (categoryData) {
        const subCategoryData = categoryData[genderGroup];
        if (subCategoryData) {
          return subCategoryData[workoutLevel] || '';
        }
      }
    }
    return '';
  }
}
