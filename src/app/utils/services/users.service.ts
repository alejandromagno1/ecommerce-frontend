import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  path: string = '/users/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getLogin(user: string, passwd: string){
    return this.http.get(API_URL + this.path + 'login/' + user + '/' + passwd);
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Users): Observable<Users> {
    return this.http.post<Users>(API_URL + this.path, data);
  }

  update(data: Users): Observable<Users> {
    return this.http.put<Users>(API_URL + this.path, data);
  }
}