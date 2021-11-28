import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Agencies } from '../models/agencies';

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {
  constructor(private http: HttpClient) { }

  path: string = '/agencies/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllActives() {
    return this.http.get(API_URL + this.path + 'actives');
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Agencies): Observable<Agencies> {
    return this.http.post<Agencies>(API_URL + this.path, data);
  }

  update(data: Agencies): Observable<Agencies> {
    return this.http.put<Agencies>(API_URL + this.path + data.id, data);
  }
}
