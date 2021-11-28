import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Wishes } from '../models/wishes';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  constructor(private http: HttpClient) { }

  path: string = '/wishes/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Wishes): Observable<Wishes> {
    return this.http.post<Wishes>(API_URL + this.path, data);
  }

  update(data: Wishes): Observable<Wishes> {
    return this.http.put<Wishes>(API_URL + this.path + data.id, data);
  }
}