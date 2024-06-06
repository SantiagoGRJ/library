import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotIdUser, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private _http = inject(HttpClient)

  private url_Base = 'http://localhost:3000/auth'



  constructor() { }

  register (user:INotIdUser) : Observable<any> {
    return this._http.post<any>(`${this.url_Base}/register`,user)
  }

  signIn(user:INotIdUser): Observable<any>{
    return this._http.post(`${this.url_Base}/login`,user)
  }
}
