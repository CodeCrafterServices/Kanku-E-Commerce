import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BASE_URL from './base_url';
import { Observable } from 'rxjs';

const USER = "user"
const TOKEN = "token"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {
    return this.http.post(BASE_URL + "/api/service/login", data);
  }




}
