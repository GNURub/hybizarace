import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private _isRegistrationModalOpen = signal<boolean>(false);
  public readonly isRegistrationModalOpen =
    this._isRegistrationModalOpen.asReadonly();

  openRegistrationModal() {
    this._isRegistrationModalOpen.set(true);
  }

  closeRegistrationModal() {
    this._isRegistrationModalOpen.set(false);
  }
}
