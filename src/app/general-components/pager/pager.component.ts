import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FixPagePipe } from '../../pipes/fixPage.pipe';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  standalone: true,
  imports: [CommonModule, FixPagePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagerComponent implements OnInit {
  @Input() ruta: string = '';
  @Input() actualPage: number = 1;
  @Input() set totalPages(value: number) {
    if (value) {
      this.totalPagesValue = value;
      this.actualPage && (this.actualPage = Number(this.actualPage));
      (async () => {
        await this.comprobeActualPage();
        this.changeDetectionRef.detectChanges();
      })();
    }
  }
  @Output() upPage = new EventEmitter();
  pages = [1];
  expanded = false;
  btnSelected: HTMLButtonElement | undefined = undefined;
  totalPagesValue: number = 1;

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit() {}

  comprobeActualPage() {
    return new Promise((resolve) => {
      setTimeout(async () => {
        this.setPages(this.totalPagesValue);
        resolve(true);
      }, 100);
    });
  }

  setPages(totalPagesValue = 1) {
    this.pages = [1];
    for (let i = 1; i < totalPagesValue; i++) {
      this.pages.push(i + 1);
    }
  }

  changePage(numPage?: number | string | null, page?: number) {
    if (numPage === '...') {
      this.expanded = true;
      return;
    } else {
      let toPage;
      if (page !== undefined) {
        toPage = page;
        this.actualPage = toPage;
      } else {
        toPage = numPage;
        this.actualPage = Number(toPage);
      }

      this.upPage.emit(this.actualPage);
      this.expanded = false;
    }
  }

  changeWithBtn(direction: string) {
    let dct = Number(this.actualPage);
    if (direction === 'next') {
      dct++;

      return dct > this.totalPagesValue
        ? null
        : (this.changePage(null, dct), this.upPage.emit(dct));
    } else {
      dct--;
      return dct === 0
        ? null
        : (this.changePage(null, dct), this.upPage.emit(dct));
    }
  }
}
