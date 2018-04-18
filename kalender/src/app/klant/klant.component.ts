import { Component, OnInit } from '@angular/core';
import { AfsprakenService } from '../afspraken.service';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';


@Component({
  selector: 'app-klant',
  templateUrl: './klant.component.html',
  styleUrls: ['./klant.component.css']
})
export class KlantComponent implements OnInit {

  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  
  myDatePickerOptions: IMyDpOptions = {
      inline: true,
      dateFormat: 'yyyy-mm-dd',
      dayLabels: {su: 'Zo', mo: 'Ma', tu: 'Di', we: 'Wo', th: 'Do', fr: 'Vr', sa: 'Za'},
      monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'Mei', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Okt', 11: 'Nov', 12: 'Dec' },
      showTodayBtn: false,
      yearSelector: false,
      disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1},
      sunHighlight: false
  };

  constructor(private afsprakenService: AfsprakenService, private router: Router) {
    let d: Date = new Date();
    this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
  }

  datum: string;

  onDateChanged(event: IMyDateModel) {
      this.datum = event.formatted.replace("/", "-").replace("/", "-");
      this.getTijden(this.datum);
  }

  ngOnInit() {
    let self = this;
    let d: Date = new Date();
    let month = d.getMonth() + 1;
    let datumVandaag = moment(d.getFullYear() + "-" + month + "-" + d.getDate(), "YYYY-MM-DD").format("YYYY-MM-DD");
    
    self.getTijden(datumVandaag);
  }

  tijden;

  ophalen_gegevens() {
    var dag = $('.ui-datepicker-current-day').find("a").html();

    var tijd = (<HTMLInputElement>document.querySelector('input[name="tijd"]:checked')).value;

    // var datumgekozen = moment(jaar + "-" + maand + "-" + dag, "YYYY-MM-DD").format("YYYY-MM-DD");
    var datumgekozen = this.datum;
    console.log(datumgekozen)

    var startTijd = datumgekozen + "T" + tijd;
    console.log(startTijd);

    var gegevens = {
      startTijd: startTijd,
      naam: (<HTMLInputElement>document.getElementById('name')).value,
      email: (<HTMLInputElement>document.getElementById('mail')).value,
      telefoonnummer: (<HTMLInputElement>document.getElementById('telefoonnummer')).value,
      probleem: (<HTMLInputElement>document.querySelector('input[name="reden"]:checked')).value,
      opmerkingen: (<HTMLInputElement>document.getElementById('opmerkingen')).value
    };
    // console.log(gegevens);

    this.afsprakenService.gegevens_doorsturen(gegevens).subscribe()

    this.router.navigate(['/succes']);    
  }

  getTijden(datum) {
    var maand = parseInt($('.ui-datepicker-current-day').attr("data-month")) + 1;
    var jaar = $('.ui-datepicker-current-day').attr("data-year");
    var dag = $('.ui-datepicker-current-day').find("a").html();

    // var datum = moment(jaar + "-" + maand + "-" + dag, "YYYY-MM-DD").format("YYYY-MM-DD");

    this.afsprakenService.tijden_ophalen(datum).subscribe(
      beschikbaar => {

        let beschikbare_tijden = []

        for (let i = 0; i < beschikbaar.length; i++) {
          let de_tijd = beschikbaar[i].startTijd.substring(11, 16);
          // console.log(de_tijd)
          beschikbare_tijden.push(de_tijd)
        }

        this.tijden = beschikbare_tijden;

        // console.log(this.tijden);
      }
    )
  }

}
