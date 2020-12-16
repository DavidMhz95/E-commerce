import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';
import { StoreConfiguration } from 'black-market-model';

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {

    constructor(public _http: HttpClient) {
    }
    
    getConfiguration(): Observable<any> {
        return this._http.get(globalUrl + 'getConfig')
    }


    update(configuration: StoreConfiguration): Observable<any> {
        return this._http.post(globalUrl + 'updateConfig/', configuration)
    }

 
    
}