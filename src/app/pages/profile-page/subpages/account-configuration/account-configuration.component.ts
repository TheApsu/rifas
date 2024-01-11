import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicForm } from '../../../../interfaces/dynamic_form';
import { DynamicFormComponent } from '../../../../general-components/dynamic-form/dynamic-form.component';
import { ChangeAvatarComponent } from '../../../../general-components/change-avatar/change-avatar.component';
import { UiService } from '../../../../services/ui.service';
import { VerificationComponent } from './components/verification/verification.component';

@Component({
  selector: 'app-account-configuration',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, ChangeAvatarComponent],
  templateUrl: './account-configuration.component.html',
  styleUrl: './account-configuration.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountConfigurationComponent {
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
      fieldName: 'password',
      label: 'Contraseña',
      placeholder: '',
      required: false,
      type: 'password',
    },
  ];

  constructor(private _uiSv: UiService) {}

  verifyUser() {
    this._uiSv.showModal(VerificationComponent, undefined, 'verification');
  }
}
