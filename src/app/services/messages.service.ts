import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // http: any;

  
  constructor(public http: HttpClient) { }

  public apiUrl= "https://carautong.pythonanywhere.com/api/users"

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }


}
