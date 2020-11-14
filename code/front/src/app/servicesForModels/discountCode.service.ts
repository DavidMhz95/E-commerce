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
        return this._http.post(globalUrl + 'discountCode', discountCode)
    }
    
    getAll(): Observable<any>{
        return this._http.get(globalUrl + 'discountCodes')
    }

    checkDiscountCode(code:string):Observable<any>{
        return this._http.get(globalUrl + 'checkDiscountCode/'+code )
    }
}