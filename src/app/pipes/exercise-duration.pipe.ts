import { Pipe, PipeTransform } from '@angular/core';
import { Exercise, GenderGroup, ParticipationType, WorkoutLevel } from '../components/timeline-exercises.component';


@Pipe({
  name: 'exerciseDuration'
})
export class ExerciseDurationPipe implements PipeTransform {
  transform(
    exercise: Exercise,
    participantType: ParticipationType,
    genderGroup: GenderGroup,
    workoutLevel: WorkoutLevel
  ): string {
    if (typeof exercise.duration === 'string') {
      return exercise.duration;
    }

    const categoryData = exercise.duration[participantType];
    if (categoryData) {
      const subCategoryData = categoryData[genderGroup];
      if (subCategoryData) {
        return subCategoryData[workoutLevel] || 'N/A';
      }
    }
    return 'N/A';
  }
}
