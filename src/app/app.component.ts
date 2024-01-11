import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './general-components/header/header.component';
import { FooterComponent } from './general-components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { RouterService } from './services/router.service';
import { LoaderService } from './services/loader.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public loaded = false;
  constructor(
    private _authSv: AuthService,
    private _storageSv: StorageService,
    private _routerSv: RouterService,
    private _locationSv: LocationService,
    public loaderSv: LoaderService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  get routerSv() {
    return this._routerSv;
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this._storageSv.window$.subscribe(async (value) => {
        if (value) {
          this._authSv.getLocalUser();
          await this._authSv.getUser();
          await this._locationSv.getStates();
          if (this._authSv.user) {
            await this._locationSv.verifySavedLocation();
          }
          this.loaded = true;
        }
      });
      this._storageSv.setWindow();
      this._routerSv.setRouter();
    }
  }
}
