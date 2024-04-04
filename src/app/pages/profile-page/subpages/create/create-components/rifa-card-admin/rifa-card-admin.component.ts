import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRifa } from '../../../../../../interfaces/rifa_interface';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RifasService } from '../../create-services/rifas.service';

@Component({
  selector: 'app-rifa-card-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rifa-card-admin.component.html',
  styleUrl: './rifa-card-admin.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RifaCardAdminComponent {
  @Input() item!: IRifa;
  public url = environment.uploads;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _rifasSv: RifasService,
  ) {}

  async goTo(action: string) {
    if (action === 'edit') {
      this._rifasSv.page = 1;
      await this._router.navigate([], {
        replaceUrl: true,
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this.item._id,
        },
        queryParamsHandling: 'merge',
      });
      this._rifasSv.segment = 'create';
    } else {
    }
  }
}
