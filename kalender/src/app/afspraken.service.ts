import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AfsprakenService {

  constructor(private http: HttpClient) { }

  logIn(password, username) {
    return this.http.post('/login', { password: password, username: username }, httpOptions);
  }

  addAfspraak(startTijd) {
    // console.log('in addAfspraak() met startTijd: ' + startTijd);
    return this.http.post('/add', { startTijd: startTijd }, httpOptions);
  }

  getAfspraak() {
    return this.http.get<any[]>('/get', httpOptions);
  }

  deleteAfspraak(afspraak) {
    return this.http.post('/delete', { afspraak: afspraak });
  }

  gegevens_doorsturen(gegevens) {
    console.log(gegevens);
    return this.http.post('/formulier', gegevens);
  }

  tijden_ophalen(datum) {
    // console.log(datum);
    return this.http.post<any[]>('/tijd', { datum: datum }, httpOptions);
  }
}
