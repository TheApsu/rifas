import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopoverControllerService } from '../../utilities/popover/popover-controller-service';

interface Button {
  icon: string;
  label: string;
  route?: string;
  action?: string;
}

enum Actions {
  LOGOUT = 'logout',
}

@Component({
  selector: 'app-user-popover',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-popover.component.html',
  styleUrl: './user-popover.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserPopoverComponent {
  public buttons: Button[] = [
    {
      icon: 'person-outline',
      label: 'Mi Perfil',
      route: 'profile',
    },
    {
      icon: 'gift-outline',
      label: 'Rifas en juego',
      route: 'rifas',
    },
    {
      icon: 'exit-outline',
      label: 'Salir',
      action: 'logout',
    },
  ];

  constructor(
    private _authSv: AuthService,
    private _router: Router,
    private _popoverCtrl: PopoverControllerService
  ) {}

  async doAction(button: Button) {
    if (button.route) {
      await this._router.navigateByUrl(button.route);
    } else if (button.action === Actions.LOGOUT) {
      await this._authSv.logOut();
    }

    await this._popoverCtrl.dismiss();
  }
}
