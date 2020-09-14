import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class userService {
    public users: User[]
    public url: string

    constructor(private _http: HttpClient) {
        this.url="urlgenerica.lol"
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

    //Habrá que añadir mas llamadas cuando las tengamos...


    //More llamadas...

}