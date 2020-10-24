import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';
import { JsonPipe } from '@angular/common';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    orders: string = 'orders/'

    constructor(private _http: HttpClient) { }

    getOrders(): Observable<any> {
        return this._http.get(globalUrl + this.orders);
    }

    getOrderById(order: Order): Observable<any> {
        return this._http.get(globalUrl + this.orders + order.id)
    }

    getOrderByUser(user: User): Observable<any> {
        return this._http.get(globalUrl + 'userOrders/' + user.email)
    }

    search(searchString): Observable<any> {
        return this._http.get(globalUrl + 'search/' + searchString)
    }

    create(order: Order): Observable<any> {
        return this._http.post(globalUrl + 'order/', order)
    }

    update(order: Order): Observable<any> {
        return this._http.post(globalUrl + 'updateOrder/', order)
    }

    delete(order: Order): Observable<any> {
        return this._http.delete(globalUrl + this.orders + order.id)
    }
}