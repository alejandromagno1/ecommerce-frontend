import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) { }

  path: string = '/roles/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllActives() {
    return this.http.get(API_URL + this.path + 'actives');
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Roles): Observable<Roles> {
    return this.http.post<Roles>(API_URL + this.path, data);
  }

  update(data: Roles): Observable<Roles> {
    return this.http.put<Roles>(API_URL + this.path, data);
  }
}