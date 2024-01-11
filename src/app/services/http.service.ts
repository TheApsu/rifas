import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { User } from '../interfaces/user_interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _baseApi = environment.api;
  private _userToken?: string;

  set userToken(value: string) {
    this._userToken = value;
  }

  constructor(
    private _http: HttpClient,
    private _storageSv: StorageService,
  ) {}

  getUserToken() {
    const userToken = this._storageSv.getLocalStorage('user_token');
    if (userToken) {
      this._userToken = userToken;
    }
  }

  get(
    uri: string,
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | readonly (string | number | boolean)[];
        }
      | undefined,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http
        .get(`${this._baseApi}/${uri}`, {
          params,
          headers: {
            'x-auth-token': this._userToken || '',
          },
        })
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  post(uri: string, body: Object, params?: HttpParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http
        .post(`${this._baseApi}/${uri}`, body, {
          params,
          headers: {
            'x-auth-token': this._userToken || '',
          },
        })
        .subscribe({
          next: (data) => {
            resolve(data as { user: User; token: string });
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
