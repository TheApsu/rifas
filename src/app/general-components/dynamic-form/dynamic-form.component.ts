import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicForm } from '../../interfaces/dynamic_form';
import { DynamicFormCarrouselImagesComponent } from '../dynamic-form-carrousel-images/dynamic-form-carrousel-images.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormCarrouselImagesComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @ViewChildren('dynamicFormCarrouselImages')
  dynamicFormCarrouselImages?: QueryList<DynamicFormCarrouselImagesComponent>;
  @Input() fields!: DynamicForm[];
  @Input() uriImage?: string;
  @Output() emitSubmit = new EventEmitter();
  public formGroup!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    const obj: {
      [key: string]: any[];
    } = {};
    this.fields.forEach((item) => {
      if (item.type !== 'imageCarrousel') {
        obj[item.fieldName] = [''];
        if (item.required) {
          obj[item.fieldName].push([Validators.required]);
        }

        if (item.fieldName === 'email') {
          if (!obj[item.fieldName][1]) obj[item.fieldName].push([]);
          obj[item.fieldName][1].push(
            Validators.pattern(/^[\w\.g]+@+[\w]+[.]+[\D]{2,10}$/),
          );
        }
      }
    });
    this.formGroup = this._fb.group(obj);
  }

  patchValue(body: any) {
    this.formGroup.patchValue(body);
    if (this.dynamicFormCarrouselImages?.length) {
      this.dynamicFormCarrouselImages.forEach((dynamicFormCarrouselImage) => {
        const fieldName = dynamicFormCarrouselImage.field.fieldName;
        let images: string[] = body[fieldName];
        images = images.map((image) => {
          image = `${this.uriImage}/${image}`;
          return image;
        });
        dynamicFormCarrouselImage.uploadedImages = images;
        dynamicFormCarrouselImage.auxUploadedImages = body[fieldName];
      });
    }
  }

  async submit(ev: SubmitEvent) {
    ev.preventDefault();
    const imageFiles: string[] = [];
    const value = this.formGroup.value;

    if (this.dynamicFormCarrouselImages?.length) {
      this.dynamicFormCarrouselImages.forEach((item) => {
        item.auxUploadedImages.forEach((image) => {
          imageFiles.push(image);
        });
        value[item.field.fieldName] = imageFiles;
      });
    }
    this.emitSubmit.emit(value);
  }

  reset() {
    this.formGroup.reset();
    if (this.dynamicFormCarrouselImages?.length) {
      this.dynamicFormCarrouselImages.forEach((item) => {
        item.uploadedImages = [];
        item.auxUploadedImages = [];
      });
    }
  }
}
