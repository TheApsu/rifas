import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarInputComponent } from '../../../../general-components/searchbar-input/searchbar-input.component';
import { SearchbarInput } from '../../../../interfaces/searchbar_input_interface';
import { IRifa } from '../../../../interfaces/rifa_interface';
import { IComment } from '../../../../interfaces/comment_interface';
import { environment } from '../../../../../environments/environment';
import { RifasService } from '../../../profile-page/subpages/create/create-services/rifas.service';
import { UiService } from '../../../../services/ui.service';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [CommonModule, SearchbarInputComponent],
  templateUrl: './product-comments.component.html',
  styleUrl: './product-comments.component.scss',
})
export class ProductCommentsComponent {
  @ViewChild('seachbarInput') seachbarInput!: SearchbarInputComponent;
  @Input() rifa!: IRifa;
  @Input() comments: IComment[] = [];
  public APIUploads = environment.uploads;
  public config: SearchbarInput = {
    debounce: 0,
    placeholder: 'Escribe tu pregunta...',
  };
  private _comment: string = '';
  private _vRifasSv = inject(RifasService);
  private _vUiSv = inject(UiService);

  setValue(value: string) {
    this._comment = value;
  }

  async send() {
    if (this.rifa._id) {
      const vComment = await this._vRifasSv.createComment({
        comment: this._comment,
        rifaId: this.rifa._id,
      });
      this.comments.unshift(vComment.savedComment);
      this._vUiSv.showToast('El comentario se ha publicado');
      this.seachbarInput.reset();
    }
    console.log('this._comment :>> ', this._comment);
  }
}
