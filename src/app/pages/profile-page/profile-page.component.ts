import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RolTypes } from '../../constants/rol-type';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePageComponent implements OnInit {
  public buttons = [
    {
      icon: 'person-outline',
      routeName: './settings',
      route: 'Cuenta',
    },
  ];

  constructor(private _authSv: AuthService) {}

  ngOnInit(): void {
    if (this._authSv.user?.rolType === RolTypes.PROMOTOR) {
      const sponsorButtons = [
        {
          icon: 'create-outline',
          routeName: './create',
          route: 'Crear/Editar rifa',
        },
        {
          icon: 'cash-outline',
          routeName: './create',
          route: 'Ventas',
        },
        {
          icon: 'trending-up-outline',
          routeName: './create',
          route: 'Promocionar',
        },
      ];
      this.buttons.push(...sponsorButtons);
    } else {
      const clientButtons = [
        {
          icon: 'calendar-outline',
          routeName: './playing-rifas',
          route: 'Rifas en juego',
        },
      ];
      this.buttons.push(...clientButtons);
    }
  }
}
