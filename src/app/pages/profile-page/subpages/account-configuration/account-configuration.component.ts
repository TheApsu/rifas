import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicForm } from '../../../../interfaces/dynamic_form';
import { DynamicFormComponent } from '../../../../general-components/dynamic-form/dynamic-form.component';
import { ChangeAvatarComponent } from '../../../../general-components/change-avatar/change-avatar.component';
import { UiService } from '../../../../services/ui.service';
import { VerificationComponent } from './components/verification/verification.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-account-configuration',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ChangeAvatarComponent],
  templateUrl: './account-configuration.component.html',
  styleUrl: './account-configuration.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountConfigurationComponent implements OnInit {
  @ViewChild('avatarComponent') avatarComponent!: ChangeAvatarComponent;
  @ViewChild('dynamicForm') set dynamicForm(value: DynamicFormComponent) {
    if (value) {
      setTimeout(() => {
        this.avatarComponent.auxAvatar = this._authSv.user?.avatar ?? '';
      });
      value.patchValue(this._authSv.user);
    }
  }
  public fields: DynamicForm[] = [
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Ricardo...',
      required: false,
      type: 'text',
    },
    {
      fieldName: 'email',
      label: 'Email',
      placeholder: 'example@gmail.com ',
      required: false,
      type: 'email',
    },
    {
      fieldName: 'oldPassword',
      label: 'Contraseña antigua',
      placeholder: '',
      required: false,
      type: 'password',
    },
    {
      fieldName: 'password',
      label: 'Nueva contraseña',
      placeholder: '',
      required: false,
      type: 'password',
    },
    {
      fieldName: 'confirmPassword',
      label: 'Confirmar contraseña ',
      placeholder: '',
      required: false,
      type: 'password',
    },
  ];

  private _authSv = inject(AuthService);

  constructor(private _uiSv: UiService) {}

  ngOnInit(): void {}

  verifyUser() {
    this._uiSv.showModal(VerificationComponent, undefined, 'verification');
  }

  updateProfile(ev: any) {
    ev.avatar = this.avatarComponent.avatar;
    this._authSv.createOrUpdateUser(ev);
  }
}
