import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  homepage() {
    this.router.navigate(['/home']);
  }

}
