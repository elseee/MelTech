import { Component, OnInit, Input } from '@angular/core';
import {AfsprakenService} from "../afspraken.service";
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@Input()
	password: string;
	username: string;

	loggedIn:boolean = true;

	 isLoggedIn() {
    	let permissionIs = sessionStorage.getItem('user');
    	console.log(permissionIs);

    	if (permissionIs == 'admin') {
    		this.loggedIn = false;
    		console.log(this.loggedIn);
    		this.router.navigate(['/kalender']);
    	}
    }


  constructor( private afsprakenService: AfsprakenService, private router: Router ) { }

  ngOnInit() {
  	this.isLoggedIn();
  }

  error = '';

	getInlog() {
		let password = this.password;
		let username = this.username;

		this.afsprakenService.logIn(password, username).subscribe(
				(response) => { 
					console.log(response);
					sessionStorage.setItem('user', 'admin');
					this.router.navigate(['/kalender']);
				},
				(error) => { 
					console.log(error.error);
					this.error = 'Uw wachtwoord en/of gebruikersnaam zijn onjuist.';
				} 
			);
	}

	canActivate() {
		return true;
	}




}
