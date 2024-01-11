import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private _uiSv: UiService,
    private _authSv: AuthService,
    private _router: Router
  ) {}

  get authSv() {
    return this._authSv;
  }
  public opened = false;

  async openPopover(ev: MouseEvent) {
    if (this.authSv.user) {
      this._uiSv.showPopover(UserPopoverComponent, ev);
    } else {
      await this._router.navigate(['signin']);
    }
  }
}
