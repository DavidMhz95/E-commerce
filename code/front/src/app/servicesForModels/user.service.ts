import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';

@Injectable()
export class userService {
    public users: User[]
    public url: string

    constructor(public _http: HttpClient) {
        this.url= globalUrl
    }

    pruebas() {
        return 'Soy el servicio de users'
    }

    getUsers(): Observable<any> {
        var users = 'users'
        return this._http.get(this.url + users);
    }

    getUser(userId): Observable<any> {
        return this._http.get(this.url + 'user/' + userId)
    }

    search(searchString): Observable<any> {
        return this._http.get(this.url + 'search/' + searchString)
    }

    create(user): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-type', 'application/json') 
        return this._http.post(this.url+'user', params, {headers:headers})
    }

    //Habrá que añadir mas llamadas cuando las tengamos...


    //More llamadas...

}