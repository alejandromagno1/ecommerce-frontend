import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Lines } from '../models/lines';

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  constructor(private http: HttpClient) { }

  path: string = '/lines/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllActives() {
    return this.http.get(API_URL + this.path + 'actives');
  }

  getById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Lines): Observable<Lines> {
    return this.http.post<Lines>(API_URL + this.path, data);
  }

  update(data: Lines): Observable<Lines> {
    return this.http.put<Lines>(API_URL + this.path + data.id, data);
  }
}