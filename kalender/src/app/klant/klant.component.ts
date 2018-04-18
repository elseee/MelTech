import { Component, OnInit } from '@angular/core';
import { AfsprakenService } from '../afspraken.service';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

@Component({
  selector: 'app-klant',
  templateUrl: './klant.component.html',
  styleUrls: ['./klant.component.css']
})
export class KlantComponent implements OnInit {

  constructor(private afsprakenService: AfsprakenService) { }

  ngOnInit() {
    let self = this;
    setTimeout(function () {
      self.getTijden();
    }, 2000);
    
  }

  tijden;

  ophalen_gegevens() {
    var maand = parseInt($('.ui-datepicker-current-day').attr("data-month")) + 1;
    var jaar = $('.ui-datepicker-current-day').attr("data-year");
    var dag = $('.ui-datepicker-current-day').find("a").html();

    var tijd = (<HTMLInputElement>document.querySelector('input[name="tijd"]:checked')).value;

    var datumgekozen = moment(jaar + "-" + maand + "-" + dag, "YYYY-MM-DD").format("YYYY-MM-DD");

    var startTijd = datumgekozen + "T" + tijd;

    var gegevens = {
      startTijd: startTijd,
      naam: (<HTMLInputElement>document.getElementById('name')).value,
      email: (<HTMLInputElement>document.getElementById('mail')).value,
      telefoonnummer: (<HTMLInputElement>document.getElementById('telefoonnummer')).value,
      probleem: (<HTMLInputElement>document.querySelector('input[name="reden"]:checked')).value,
      opmerkingen: (<HTMLInputElement>document.getElementById('opmerkingen')).value
    };
    console.log(gegevens);

    this.afsprakenService.gegevens_doorsturen(gegevens).subscribe()
  }

  getTijden() {
    var maand = parseInt($('.ui-datepicker-current-day').attr("data-month")) + 1;
    var jaar = $('.ui-datepicker-current-day').attr("data-year");
    var dag = $('.ui-datepicker-current-day').find("a").html();

    var datum = moment(jaar + "-" + maand + "-" + dag, "YYYY-MM-DD").format("YYYY-MM-DD");

    this.afsprakenService.tijden_ophalen(datum).subscribe(
      beschikbaar => {

        let beschikbare_tijden = []

        for (let i = 0; i < beschikbaar.length; i++) {
          let de_tijd = beschikbaar[i].startTijd.substring(11, 16);
          console.log(de_tijd)
          beschikbare_tijden.push(de_tijd)
        }

        this.tijden = beschikbare_tijden;

        console.log(this.tijden);
      }
    )
  }

}
