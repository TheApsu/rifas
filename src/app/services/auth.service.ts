import { Injectable } from '@angular/core';
import { User } from '../interfaces/user_interface';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { AuthPopoverAlertComponent } from '../general-components/auth-popover-alert/auth-popover-alert.component';
import { UiService } from './ui.service';
import { LocationService } from './location.service';

const enum AuthExceptions {
  INVALID_CREDENTIALS = 'Invalid credentials',
}

interface UserResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user?: User;

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  constructor(
    private _storageSv: StorageService,
    private _httpSv: HttpService,
    private _router: Router,
    private _uiSv: UiService,
    private _locationSv: LocationService,
  ) {}

  getLocalUser() {
    this._httpSv.getUserToken();
    const data = this._storageSv.getLocalStorage('user');
    if (data) {
      this.user = JSON.parse(data);
    }
  }

  async createUser(value: User, ev: Event) {
    try {
      ev.preventDefault();
      if (value.password === value.confirmPassword) {
        const res: UserResponse = await this._httpSv.post(
          'api/user/create',
          value,
        );
        await this.controlleUserData(res);
        console.log('res :>> ', res);
      } else {
        await this._uiSv.showPopover(AuthPopoverAlertComponent, undefined, {
          alertTitle: 'Alerta',
          error: 'Las contraseñas no coinciden',
        });
      }
    } catch (err: any) {
      console.log('err :>> ', err);
      if (err.error.message.code === 11000) {
        await this._uiSv.showToast('El correo esta en uso.');
      }
    }
  }

  async getUser() {
    try {
      if (this.user) {
        const res: UserResponse = await this._httpSv.get('api/user/get');
        this.saveUserData(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async signIn(value: User, ev: Event) {
    try {
      ev.preventDefault();
      const res: UserResponse = await this._httpSv.post(
        'api/user/login',
        value,
      );
      await this.controlleUserData(res);
    } catch (err: any) {
      switch (err.error.err) {
        case AuthExceptions.INVALID_CREDENTIALS:
          this._uiSv.showPopover(AuthPopoverAlertComponent, undefined, {
            alertTitle: 'Ha ocurrido un error',
            error: 'Credenciales invalidas.',
          });
          return;
        default:
          alert('Ha ocurrido un error');
          return;
      }
    }
  }

  async controlleUserData(res: UserResponse) {
    this._httpSv.userToken = res.token;
    await this.saveUserData(res);
    await this._router.navigateByUrl('/home', { replaceUrl: true });
    await this._locationSv.verifySavedLocation();
  }

  async saveUserData(res: UserResponse) {
    this._storageSv.createOrUpdateLocalStorage(
      'user',
      JSON.stringify(res.user),
    );
    this._storageSv.createOrUpdateLocalStorage('user_token', res.token);
    this.getLocalUser();
  }

  async logOut() {
    this._httpSv.userToken = '';
    this.user = undefined;
    this._storageSv.removeLocalStorage('user_token');
    this._storageSv.removeLocalStorage('user');
    await this._router.navigateByUrl('signin');
  }
}
