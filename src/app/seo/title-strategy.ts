import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly siteSuffix = 'Hybiza Race — Evento de fitness en Ibiza';

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const builtTitle = this.buildTitle(snapshot);
    const finalTitle = builtTitle ? builtTitle : this.siteSuffix;
    this.title.setTitle(finalTitle);
  }
}
