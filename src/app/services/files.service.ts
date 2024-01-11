import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private _httpSv: HttpService) {}

  async uploadImagesFromDragAndDrop(e: any) {
    const imagesArray: File[] = [];
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match('image')) continue;

      if (imagesArray.every((image) => image.name !== files[i].name))
        imagesArray.push(files[i]);
    }
    return await this.readFiles(imagesArray);
  }

  async uploadImagesFromInput(e: Event) {
    const ev = e.target as HTMLInputElement;
    return await this.readFiles(ev.files);
  }

  readFiles(files: FileList | null | File[]) {
    return new Promise<string[]>(async (resolve) => {
      const imagesFromApi: string[] = await this.uploadFilesToAPI(files);
      resolve(imagesFromApi);
    });
  }

  async uploadFilesToAPI(files: FileList | null | File[]) {
    try {
      if (files) {
        const formData = new FormData();
        for (let index = 0; index < files.length; index++) {
          const value = files[index];
          formData.append('image', value);
        }
        const res = await this._httpSv.post('api/uploads/files', formData);
        return res.images;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
