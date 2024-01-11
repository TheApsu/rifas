import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarInputComponent } from '../../general-components/searchbar-input/searchbar-input.component';
import { LocationService } from '../../services/location.service';
import { ILocation } from '../../interfaces/location_interface';
import { ModalControllerService } from '../../utilities/modal/modal-controller-service';

@Component({
  selector: 'app-select-location',
  standalone: true,
  imports: [CommonModule, SearchbarInputComponent],
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectLocationComponent implements OnInit {
  public locations: ILocation[] = [];
  public config = {
    debounce: 200,
    placeholder: 'Buscar un estado...',
  };

  constructor(
    public locationSv: LocationService,
    private _modalControllerSv: ModalControllerService,
  ) {}

  ngOnInit(): void {
    this.locations = this.locationSv.locations;
  }

  setSearch(search: string) {
    const normalizedSearch = this.removeAccents(search.toLowerCase().trim());
    if (!normalizedSearch) {
      this.locations = this.locationSv.locations;
    } else {
      this.locations = this.locationSv.locations.filter((x) => {
        const stateNomralized = this.removeAccents(
          x.estado.toLowerCase().trim(),
        );
        return stateNomralized.includes(normalizedSearch);
      });
    }
  }

  removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async setLocation(location: ILocation) {
    this.locationSv.saveLocation(location);
    await this._modalControllerSv.dismiss();
  }
}
