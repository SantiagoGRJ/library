import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksServicesService {

  private _http = inject(HttpClient)
  

  private url_Base : string = 'http://localhost:3000/books'
   
   token = localStorage.getItem('token')
   header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)


   getAllBooks() : Observable<Ibook[]>{
    return this._http.get<Ibook[]>(`${this.url_Base}`,{headers: this.header })
  }

  getBook(id:string) : Observable<Ibook> {
    return this._http.get<Ibook>(`${this.url_Base}/${id}`,{headers: this.header })
  }

  newBook(book:Ibook) : Observable<Ibook>{
    return this._http.post<Ibook>(`${this.url_Base}`,book,{headers: this.header })
  }

  updateBook(id:string | undefined, book:Ibook) : Observable<Ibook> {
    return this._http.put<Ibook>(`${this.url_Base}/${id}`,book,{headers: this.header })
  }

  deleteBook(id:any) : Observable<Ibook> {
    return this._http.delete<Ibook>(`${this.url_Base}/${id}`,{headers: this.header })
  }




}
