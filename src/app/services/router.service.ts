import { DestroyRef, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WindowsService } from './windows.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private _excludedRoutesForHeaderAndFooter = ['/signin', '/signup'];

  private _hiddeHeaderAndFooter = true;

  get hiddeHeaderAndFooter() {
    return this._hiddeHeaderAndFooter;
  }

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
    private _windowRef: WindowsService,
  ) {}

  setRouter() {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const location = this._windowRef.getWindow()?.location.pathname;
        if (
          location &&
          this._excludedRoutesForHeaderAndFooter.includes(location)
        ) {
          this._hiddeHeaderAndFooter = true;
        } else {
          this._hiddeHeaderAndFooter = false;
        }
      });
  }
}
