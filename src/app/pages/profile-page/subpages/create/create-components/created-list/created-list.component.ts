import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RifasService } from '../../create-services/rifas.service';
import { RifaCardAdminComponent } from '../rifa-card-admin/rifa-card-admin.component';
import { PagerComponent } from '../../../../../../general-components/pager/pager.component';
import { SearchbarInputComponent } from '../../../../../../general-components/searchbar-input/searchbar-input.component';

@Component({
  selector: 'app-created-list',
  standalone: true,
  imports: [
    CommonModule,
    RifaCardAdminComponent,
    PagerComponent,
    SearchbarInputComponent,
  ],
  templateUrl: './created-list.component.html',
  styleUrl: './created-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreatedListComponent implements OnInit {
  get rifasSv() {
    return this._rifasSv;
  }

  constructor(
    private _rifasSv: RifasService,
    private _changeDetectionRef: ChangeDetectorRef,
  ) {
    effect(() => {
      this._changeDetectionRef.markForCheck();
    });
  }

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    await this._rifasSv.getRifas();
    this._changeDetectionRef.markForCheck();
  }

  async changePage(ev: number) {
    await this._rifasSv.changePage(ev);
    window.scroll({ behavior: 'smooth', left: 0, top: 0 });
    this._changeDetectionRef.markForCheck();
  }

  async setSearch(search: string) {
    await this._rifasSv.doSearch(search);
  }
}
