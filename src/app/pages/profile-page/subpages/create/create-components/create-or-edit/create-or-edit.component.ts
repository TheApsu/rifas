import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../../../../../general-components/dynamic-form/dynamic-form.component';
import { DynamicForm } from '../../../../../../interfaces/dynamic_form';
import { IRifa } from '../../../../../../interfaces/rifa_interface';
import { RifasService } from '../../create-services/rifas.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { uris } from '../../../../../../constants/uri-types';
import { LocationService } from '../../../../../../services/location.service';

@Component({
  selector: 'app-create-or-edit',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent implements OnInit {
  @ViewChild('dynamicForm') dynamicForm?: DynamicFormComponent;
  private _rifa?: IRifa = undefined;
  public uriTypes = uris;
  public fields: DynamicForm[] = [
    {
      fieldName: 'images',
      type: 'imageCarrousel',
      label: 'Imagenes de la rifa',
      placeholder: '',
      required: true,
      multiple: true,
    },
    {
      fieldName: 'name',
      type: 'text',
      label: 'Nombre de la rifa',
      placeholder: 'Motocicleta...',
      required: true,
    },
    {
      fieldName: 'description',
      type: 'textarea',
      label: 'Descripción o detalles de la rifa',
      placeholder: 'Motocicleta como nueva...',
      required: true,
    },
    {
      fieldName: 'endDate',
      type: 'date',
      label: 'Fecha de juego',
      placeholder: '',
      required: true,
    },
    {
      fieldName: 'numbersQuantity',
      type: 'number',
      label: 'Cantidad de números',
      placeholder: '100',
      required: true,
    },
    {
      fieldName: 'price',
      type: 'number',
      label: 'Precio',
      placeholder: '5$',
      required: true,
    },
    {
      fieldName: 'location',
      type: 'select',
      label: 'Ubicación',
      options: [
        {
          value: 'Tachira',
          label: 'Táchira',
        },
      ],
      required: true,
    },
  ];

  private _id?: string;
  private _locationSv = inject(LocationService);

  constructor(
    private _rifaSv: RifasService,
    private _route: ActivatedRoute,
    private _destroyRef?: DestroyRef,
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (params) => {
        this._id = params.get('id') || '';
        if (this._id) {
          await this.showRifa();
        }
      });
    const vLocationField = this.fields.find((x) => x.fieldName === 'location')!;
    vLocationField.options = this._locationSv.locations.map((location) => {
      return {
        label: location.estado,
        value: location.estado,
      };
    });
  }

  async showRifa() {
    this._rifa = await this._rifaSv.showRifa(this._id!);
    this._rifa!.endDate = this._rifa!.endDate.split('T')[0];
    const states = await this.getStates();
    const locationField = this.fields.find((x) => x.fieldName === 'location');
    if (locationField) {
      locationField.options = states;
    }
    console.log('this._rifa :>> ', this._rifa);
    this.dynamicForm?.patchValue(this._rifa);
  }

  async createRifa(ev: IRifa) {
    try {
      if (this._rifa) {
        ev._id = this._id;
        ev.availableNumbersQuantity =
          this._rifa?.availableNumbersQuantity !== undefined
            ? this._rifa.availableNumbersQuantity
            : this._rifa!.numbersQuantity;
      }
      const res = await this._rifaSv.createOrEditRifa(this.dynamicForm, ev);
      this._id = '';
      this._rifa = undefined;
      console.log('res :>> ', res);
      console.log('this._id :>> ', this._id);
    } catch (err) {
      console.error(err);
    }
  }

  async getStates() {
    const res = await this._rifaSv.getStates();
    return res;
  }
}
