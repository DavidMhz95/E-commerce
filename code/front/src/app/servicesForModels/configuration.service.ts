import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from '../models/discountCode';
import { globalUrl } from '../app.utils';

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {

    constructor(public _http: HttpClient) {

    }
    
    test(discountCode: DiscountCode): Observable<any> {
        return this._http.post(globalUrl + 'discountCode', discountCode)
    }
    
}