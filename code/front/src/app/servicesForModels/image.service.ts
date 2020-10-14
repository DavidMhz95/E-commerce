import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalUrl } from '../app.utils';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) { }

  upload(file: string) {
    return this._http.post(globalUrl + 'images/upload', { file: JSON.stringify(file) })
  }
}
