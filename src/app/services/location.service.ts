import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location_interface';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { ModalControllerService } from '../utilities/modal/modal-controller-service';
import { SelectLocationComponent } from '../generalComponents/select-location/select-location.component';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public locations: ILocation[] = [];
  public selected?: ILocation = undefined;

  constructor(
    private _httpSv: HttpService,
    private _storageSv: StorageService,
    private _modalControllerSv: ModalControllerService,
  ) {}

  async getStates() {
    const res = await this._httpSv.get('api/resources/getStates');
    this.locations = res.map((item: ILocation) => {
      return {
        estado: item.estado,
        id_estado: item.id_estado,
      };
    });
  }

  async verifySavedLocation() {
    const location = this._storageSv.getLocalStorage('location');
    if (location) {
      this.selected = JSON.parse(location);
    } else {
      await this.changeState();
    }
  }

  async changeState() {
    await this._modalControllerSv.create(
      SelectLocationComponent,
      undefined,
      undefined,
      false,
    );
  }

  async saveLocation(location: ILocation) {
    this._storageSv.createOrUpdateLocalStorage(
      'location',
      JSON.stringify(location),
    );
    this.selected = location;
  }
}
