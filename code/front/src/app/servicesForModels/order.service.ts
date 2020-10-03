import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public orders: Order[]
    public url: string

    constructor(private _http: HttpClient) {
        this.url = "urlgenerica.lol"
    }

    pruebas() {
        return 'Soy el servicio de orders'
    }

    getOrders(): Observable<any> {
        var orders = 'orders'
        return this._http.get(this.url + orders);
    }

    getOrder(orderId): Observable<any> {
        return this._http.get(this.url + 'order/' + orderId)
    }

    search(searchString): Observable<any> {
        return this._http.get(this.url + 'search/' + searchString)
    }

    //Habrá que añadir mas llamadas cuando las tengamos...


    //More llamadas...

}