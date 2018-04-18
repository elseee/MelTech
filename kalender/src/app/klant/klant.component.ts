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

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();

    this.getIncrement(year, month);

  }

  private getIncrement(year:number,month:number): number {
    let date = new Date('' + year + '-' + month + '-1');
    let increment = date.getDay() > 0 ? date.getDay() - 2 : 5;
    console.log(increment);
    return increment;
  }

  private getDate(week: number, dayWeek: number, 
                   year:number,month:number,increment:number) {
        let date:any
        let day = week * 7 + dayWeek - increment;
        if (day <= 0) {
          let fechaAuxiliar = new Date('' + year + '-' + month + '-1');
          date = new Date(fechaAuxiliar.getTime() + ((day - 1) * 24 * 60 * 60 * 1000));
        }
        else {
          date = new Date('' + year + '-' + month + '-' + day);
          if (isNaN(date.getTime())) {
              let fechaAuxiliar = new Date('' + year + '-' + month + '-1');
              date = new Date(fechaAuxiliar.getTime() + ((day + 1 - increment) * 24 * 60 * 60 * 1000));
        }
        console.log(date);
        return date;
    }
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
