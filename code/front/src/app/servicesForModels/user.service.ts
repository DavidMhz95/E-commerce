import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public loggedUser: User

    constructor(public _http: HttpClient) {

    }

    getUsers(): Observable<any> {
        var users = 'users'
        return this._http.get(globalUrl + users);
    }

    getUser(userId): Observable<any> {
        return this._http.get(globalUrl + 'user/' + userId)
    }

    search(searchString): Observable<any> {
        return this._http.get(globalUrl + 'search/' + searchString)
    }

    login(email: string, pass: string) {
        return this._http.post(globalUrl + 'login', { email, pass })
    }

    logout(){
        this.loggedUser = undefined
    }

    create(user: User): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
        return this._http.post(globalUrl + 'user', user, { headers })
    }

    deleteUser(user: User): Observable<any> {
        return this._http.delete(globalUrl + 'user/' + user.email)
    }

    updateUser(user: User){
        return this._http.post(globalUrl + 'updateUser', user)
    }
}