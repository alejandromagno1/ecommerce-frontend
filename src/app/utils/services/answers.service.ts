import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Answers } from '../models/ansewrs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  constructor(private http: HttpClient) { }

  path: string = '/answers/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllByQuest(id: Number) {
    return this.http.get(API_URL + this.path + 'quest/' + id);
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Answers): Observable<Answers> {
    return this.http.post<Answers>(API_URL + this.path, data);
  }

  update(data: Answers): Observable<Answers> {
    return this.http.put<Answers>(API_URL + this.path + data.id, data);
  }
}
