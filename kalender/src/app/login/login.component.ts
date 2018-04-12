import { Component, OnInit, Input } from '@angular/core';
import {AfsprakenService} from "../afspraken.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@Input()
	password: string;
	username: string;

  	getInlog() {
		let password = this.password;
		let username = this.username;

		this.afsprakenService.logIn(password, username).subscribe();
	}

  constructor( private afsprakenService: AfsprakenService ) { }

  ngOnInit() {

  }



}
