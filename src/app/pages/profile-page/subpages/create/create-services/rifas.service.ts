import { Injectable, signal } from '@angular/core';
import { HttpService } from '../../../../../services/http.service';
import { DynamicFormComponent } from '../../../../../general-components/dynamic-form/dynamic-form.component';
import { ToastControllerService } from '../../../../../utilities/toast/toast-controller-service';
import { Rifa } from '../../../../../interfaces/rifa_interface';
import { Option } from '../../../../../interfaces/dynamic_form';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../../../services/location.service';

@Injectable({
  providedIn: 'root',
})
export class RifasService {
  public segment = 'create';

  public createdRifas = signal<Rifa[]>([]);
  public page = 1;
  public search = '';

  public loading = false;

  private _totalPages = 1;

  set totalPages(value) {
    this._totalPages = value;
  }

  get totalPages() {
    return this._totalPages;
  }

  constructor(
    private _httpSv: HttpService,
    private _toastControllerService: ToastControllerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _locationSv: LocationService,
  ) {}

  async getRifas() {
    try {
      this.loading = true;
      const params = {
        page: this.page,
        search: this.search,
      };
      const res = await this._httpSv.get('api/rifa/get', params);
      const rifas: Rifa[] = res.docs;
      this._totalPages = res.totalPages;
      this.createdRifas.update((value) => {
        value = rifas;
        this.loading = false;

        return value;
      });
      return;
    } catch (err) {
      console.error(err);
    }
  }

  async changePage(page: number) {
    return new Promise((resolve) => {
      this.createdRifas.set([]);
      setTimeout(async () => {
        this.page = page;
        await this.getRifas();
        resolve(true);
      }, 1000);
    });
  }

  async doSearch(search: string) {
    this.page = 1;
    this.search = search;
    this.createdRifas.set([]);
    await this.getRifas();
  }

  async showRifa(id: string) {
    try {
      const res = await this._httpSv.get('api/rifa/show', { id });
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async createOrEditRifa(
    dynamicForm?: DynamicFormComponent,
    body?: Rifa,
  ): Promise<Rifa | undefined> {
    try {
      const action = body?._id ? 'update' : 'create';
      const res = await this._httpSv.post(`api/rifa/${action}`, body!);
      dynamicForm?.reset();
      if (res.status) {
        const msg = body?._id
          ? 'Rifa actualizada con éxito'
          : 'Rifa creada con éxito';
        this._toastControllerService.create(3000, msg);
        await this._router.navigate([], {
          relativeTo: this._route,
          queryParams: {
            id: null,
          },
          queryParamsHandling: 'merge',
        });
        window.scroll({
          left: 0,
          top: 0,
          behavior: 'smooth',
        });
      }
      return res;
    } catch (err: any) {
      const errMsg = err.error.message;
      this._toastControllerService.create(
        5000,
        errMsg || 'Ha ocurrido un error',
      );
      console.error(err);
      throw err;
    }
  }

  async getStates(): Promise<Option[]> {
    try {
      return this._locationSv.locations.map((x) => {
        return {
          value: x.id_estado,
          label: x.estado,
        };
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
