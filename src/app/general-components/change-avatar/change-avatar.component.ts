import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesService } from '../../services/files.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-avatar.component.html',
  styleUrl: './change-avatar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChangeAvatarComponent {
  public avatar: string = '';
  public auxAvatar: string = '';
  public url = environment.uploads;

  constructor(private _fileSv: FilesService) {}

  async changeAvatar(ev: Event) {
    const files = (ev.target as HTMLInputElement).files;
    const imagesFromApi = await this._fileSv.uploadFilesToAPI(files);
    this.avatar = imagesFromApi[0];
    this.auxAvatar = imagesFromApi[0];
  }
}
