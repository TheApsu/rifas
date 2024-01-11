import { EventEmitter, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { WindowsService } from './windows.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _window: Window | null = null;
  public window$ = new EventEmitter();

  get window() {
    return this._window;
  }

  constructor(
    private storage: StorageMap,
    private _windowRef: WindowsService
  ) {}

  setWindow() {
    this._window = this._windowRef.getWindow();
    if (this._window) {
      this.window$.emit(true);
    }
  }

  createOrUpdateLocalStorage(key: string, value: string) {
    this._window?.localStorage.setItem(key, value);
  }

  getLocalStorage(key: string) {
    return this._window?.localStorage.getItem(key);
  }

  removeLocalStorage(key: string) {
    this._window?.localStorage.removeItem(key);
  }

  createOrUpdate(key: string, value: any) {
    return new Promise((resolve) => {
      this.storage.set(key, value).subscribe(() => {
        resolve(true);
      });
    });
  }

  get(key: string) {
    return new Promise((resolve) => {
      this.storage.get(key).subscribe((value) => {
        resolve(value);
      });
    });
  }

  delete(key: string) {
    return new Promise((resolve) => {
      this.storage.delete(key).subscribe(() => {
        resolve(true);
      });
    });
  }
}
