import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalControllerService } from '../../../../../../utilities/modal/modal-controller-service';
import { PlansType } from '../../../../../../constants/plans-types';
import { DynamicFormComponent } from '../../../../../../general-components/dynamic-form/dynamic-form.component';
import { DynamicForm } from '../../../../../../interfaces/dynamic_form';
import { HttpService } from '../../../../../../services/http.service';
import { UiService } from '../../../../../../services/ui.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VerificationComponent {
  public planType = PlansType;
  public selectedPlanType?: PlansType = undefined;
  public fields: DynamicForm[] = [
    {
      fieldName: 'bank',
      label: 'Banco de emisión',
      type: 'text',
      required: true,
      placeholder: 'Venezuela',
    },
    {
      fieldName: 'reference',
      label: 'Referencia',
      type: 'text',
      required: true,
      placeholder: '123456',
    },
    {
      fieldName: 'dni',
      label: 'Cedula',
      type: 'number',
      required: true,
      placeholder: '123456',
    },
    {
      fieldName: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      placeholder: 'example@gmail.com',
    },
  ];

  private _modalCtrL = inject(ModalControllerService);
  private _httpSv = inject(HttpService);
  private _uiSv = inject(UiService);

  constructor() {}

  async close() {
    await this._modalCtrL.dismiss();
  }

  choosePlan(planType: PlansType) {
    this.selectedPlanType = planType;
  }

  async sendReport(ev: any) {
    try {
      ev.planType = this.selectedPlanType;
      const res = await this._httpSv.post('api/payment/create', ev);
      if (res.status) {
        let message =
          'Holaa!, quiero reportar mi pago de RifasYa, datos del reporte: %0A%0A';
        for (const key in ev) {
          const element = this.fields.find((x) => x.fieldName === key);
          if (element) {
            message += `${element?.label}: ${ev[key]}%0A`;
          }
        }
        const selectedPlan =
          this.selectedPlanType === this.planType.BASIC ? 'Básico' : 'Full';
        message += `Plan seleccionado: ${selectedPlan}`;
        window.open(`https://wa.me/584247218207?text=${message}`);
        await this._uiSv.presentAlert({
          header: 'Nota',
          message:
            'Gracias por preferirnos, su pago esta siendo verificado por uno de nuestros operadores, pronto le comunicaremos del estatus de su verificación',
        });
        await this._modalCtrL.dismiss();
      }
    } catch (err) {
      console.error(err);
      this._uiSv.showToast('Ha ocurrido un error');
    }
  }
}
