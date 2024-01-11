import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixPages',
  standalone: true,
})
export class FixPagePipe implements PipeTransform {
  transform(pages: any[], page: any): any[] {
    const startPage = Number(page);
    const maxPositions = 5;
    let fixPages = [];
    let actualPosition = 0;
    let lastPosition = maxPositions;

    let dontMatch = true;
    while (dontMatch) {
      let indexOf = pages.indexOf(startPage);
      if (pages[indexOf] >= lastPosition) {
        actualPosition = lastPosition - 1;
        lastPosition += maxPositions;
      } else {
        fixPages = pages.slice(actualPosition, lastPosition);
        dontMatch = false;
      }
    }

    if (fixPages.includes(pages[pages.length - 1])) {
      if (!fixPages.includes(1)) {
        fixPages.unshift('...');
        fixPages.unshift(1);
      }
      return [fixPages, true];
    } else {
      fixPages.push('...');
      return [fixPages, false];
    }
  }
}
