import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RolTypes } from '../../constants/rol-type';
import { ChangeAvatarComponent } from '../../general-components/change-avatar/change-avatar.component';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChangeAvatarComponent,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent {
  public formGroup!: FormGroup;
  public register = false;
  public rolType = 1;
  public rolTypes = RolTypes;

  constructor(
    private _fb: FormBuilder,
    private _authSv: AuthService,
    public locationSv: LocationService,
  ) {
    this.formGroup = this._fb.group({
      avatar: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\.g]+@+[\w]+[.]+[\D]{2,10}$/),
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: [{ value: '', disabled: true }, Validators.required],
      location: [{ value: '', disabled: true }, Validators.required],
      rolType: [{ value: 1, disabled: true }, Validators.required],
    });
  }

  async signIn(ev: Event) {
    ev.preventDefault();
    if (this.register) {
      await this._authSv.createUser(this.formGroup.value, ev);
    } else {
      await this._authSv.signIn(this.formGroup.value, ev);
    }
  }

  setRol(rol: number) {
    this.formGroup.get('rolType')?.setValue(rol);
  }

  toggleRegistration() {
    this.register = !this.register;
    this.manageFormControlStatus([
      'name',
      'confirmPassword',
      'avatar',
      'phoneNumber',
      'rolType',
      'location',
    ]);
  }

  manageFormControlStatus(controls: string[]) {
    controls.forEach((item) => {
      if (this.register) {
        this.formGroup.get(item)?.enable();
      } else {
        this.formGroup.get(item)?.disable();
      }
    });
  }
}
