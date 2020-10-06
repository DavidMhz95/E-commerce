import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public productos: Product[]
    public url: string

    constructor(private _http: HttpClient) {
        this.url = "urlgenerica.lol"
    }

    pruebas() {
        return 'Soy el servicio de Productos'
    }

    getProducts(): Observable<any> {
        var products = 'products'
        return this._http.get(this.url + products);
    }

    getProduct(productId): Observable<any> {
        return this._http.get(this.url + 'product/' + productId)
    }

    search(searchString): Observable<any> {
        return this._http.get(this.url + 'search/' + searchString)
    }
    
    create(product: Product): Observable<any> {
        return this._http.post(globalUrl + 'product', product)
    }
    

    //More llamadas...

}