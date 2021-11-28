import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  path: string = '/products/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllActives() {
    return this.http.get(API_URL + this.path + 'actives');
  }

  getById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Products): Observable<Products> {
    return this.http.post<Products>(API_URL + this.path, data);
  }

  update(data: Products): Observable<Products> {
    return this.http.put<Products>(API_URL + this.path + data.id, data);
  }
}