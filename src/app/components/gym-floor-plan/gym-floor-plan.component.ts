import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import type { Area, Station } from '../../models/gym.models';
import { GymDataService } from '../../services/gym-data.service';

@Component({
  imports: [NgClass],
  selector: 'app-gym-floor-plan',
  templateUrl: './gym-floor-plan.component.html',
  styleUrls: ['./gym-floor-plan.component.css'],
})
export class GymFloorPlanComponent {
  private gymDataService = inject(GymDataService);
  stations: Station[] = [];
  areas: Area[] = [];

  selectedStation = signal<Station | null>(null);
  selectedArea = signal<Area | null>(null);
  hoveredElement = signal<string | null>(null);

  constructor() {
    this.stations = this.gymDataService.getStations();
    this.areas = this.gymDataService.getAreas();
  }

  onStationClick(station: Station): void {
    this.selectedStation.set(station);
    this.selectedArea.set(null);
  }

  onAreaClick(area: Area): void {
    this.selectedArea.set(area);
    this.selectedStation.set(null);
  }

  onMouseEnter(elementId: string): void {
    this.hoveredElement.set(elementId);
  }

  onMouseLeave(): void {
    this.hoveredElement.set(null);
  }

  getReversedStations(): Station[] {
    return [...this.stations].reverse();
  }

  createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
