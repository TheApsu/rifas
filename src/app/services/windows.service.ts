import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowsService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  getWindow() {
    if (isPlatformBrowser(this.platformId)) {
      return window;
    }
    return null;
  }
}
