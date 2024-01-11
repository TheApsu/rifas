import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrEditComponent } from './create-components/create-or-edit/create-or-edit.component';
import { CreatedListComponent } from './create-components/created-list/created-list.component';
import { RifasService } from './create-services/rifas.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, CreateOrEditComponent, CreatedListComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateComponent {
  constructor(public rifasSv: RifasService) {}

  toggleView() {
    this.rifasSv.segment =
      this.rifasSv.segment === 'create' ? 'list' : 'create';
  }
}
