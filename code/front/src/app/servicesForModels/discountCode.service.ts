import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from '../models/discountCode';
import { globalUrl } from '../app.utils';

@Injectable({
    providedIn: 'root'
})

export class DiscountCodeService {

    constructor(public _http: HttpClient) {

    }
    
    create(discountCode: DiscountCode): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
        return this._http.post(globalUrl + 'discountCode', discountCode, { headers })
    }
    
}