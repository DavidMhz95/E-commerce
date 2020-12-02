import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';
import { DiscountCode } from 'black-market-model';

@Injectable({
    providedIn: 'root'
})

export class DiscountCodeService {

    constructor(public _http: HttpClient) {

    }
    
    upsert(discountCode: DiscountCode): Observable<any> {
        return this._http.post(globalUrl + 'discountCode', discountCode)
    }
    
    getAll(): Observable<any>{
        return this._http.get(globalUrl + 'discountCodes')
    }

    delete(discountCode: DiscountCode): Observable<any> {
        return this._http.delete(globalUrl + 'discountCode/' + discountCode.code)
      }
    checkDiscountCode(code:string):Observable<any>{
        return this._http.get(globalUrl + 'checkDiscountCode/'+code )
    }
}