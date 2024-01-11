import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarInputComponent } from '../searchbar-input/searchbar-input.component';
import { SearchbarInput } from '../../interfaces/searchbar_input_interface';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, SearchbarInputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  private _search = '';
  public config: SearchbarInput = {
    debounce: 0,
    placeholder: 'Busca una rifa...',
  };

  constructor(
    private _router: Router,
    public locationSv: LocationService,
  ) {}

  setSearch(ev: string) {
    this._search = ev;
  }

  async search() {
    const queryParams = {
      search: this._search,
    };
    await this._router.navigate(['/search'], {
      queryParams,
    });
  }

  async changeState() {
    await this.locationSv.changeState();
  }
}
