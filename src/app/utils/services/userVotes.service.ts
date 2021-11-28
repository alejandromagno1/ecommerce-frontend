import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { UserVotes } from '../models/userVotes';

@Injectable({
  providedIn: 'root'
})
export class UserVotesService {
  constructor(private http: HttpClient) { }

  path: string = '/userVotes/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  getCountVotes(id: Number) {
    return this.http.get(API_URL + this.path + 'count/' + id);
  }

  getOnline(id: Number) {
    return this.http.get(API_URL + this.path + 'online/' + id);
  }

  getByUsrQuest(idUsr: Number, idQuest: Number) {
    return this.http.get(API_URL + this.path + 'validate?idUsr='+ idUsr + '&idQuest=' + idQuest);
  }

  add(data: UserVotes): Observable<UserVotes> {
    return this.http.post<UserVotes>(API_URL + this.path, data);
  }

  update(data: UserVotes): Observable<UserVotes> {
    return this.http.put<UserVotes>(API_URL + this.path + data.id, data);
  }
}
