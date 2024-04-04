import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-playing-rifas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playing-rifas.component.html',
  styleUrl: './playing-rifas.component.scss',
})
export class PlayingRifasComponent implements OnInit {
  private _httpSv = inject(HttpService);
  public loading = true;
  public rifas = [];

  constructor() {}

  async ngOnInit() {
    const res = await this._httpSv.get('api/cart/getAll');
    this.loading = false;
    this.rifas = res.docs;
  }
}
