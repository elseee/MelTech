import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import 'rxjs/add/operator/map'

import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AfsprakenService {

	private afsprakenUrl = 'http://localhost:3000/add';

  constructor(private http: HttpClient) { }

  logIn(password, username) {
    console.log(password);
    return this.http.post('http://localhost:3000/kalender', password, httpOptions);
  }

  addAfspraak(startTijd) {
  	// console.log('in addAfspraak() met startTijd: ' + startTijd);
  	return this.http.post('http://localhost:3000/add', {startTijd: startTijd}, httpOptions);
  }

  getAfspraak() {
  	return this.http.get<any[]>('http://localhost:3000/get', httpOptions);
  }

  deleteAfspraak(afspraak) {
  	return this.http.post('http://localhost:3000/delete', {afspraak: afspraak});
  }

}
