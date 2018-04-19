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
  tijden;
  error: string;
  onDateChanged(event: IMyDateModel) {
      this.datum = event.formatted.replace("/", "-").replace("/", "-");
      this.getTijden(this.datum);
  }

  ngOnInit() {
    let self = this;
    let d: Date = new Date();
    let month = d.getMonth() + 1;
    this.datum = moment(d.getFullYear() + "-" + month + "-" + d.getDate(), "YYYY-MM-DD").format("YYYY-MM-DD");
    
    self.getTijden(this.datum);
  }


  naam: string;
  mail: string;
  tel: string;
  opmerkingen: string;
  

  ophalen_gegevens() {

    var tijd = (<HTMLInputElement>document.querySelector('input[name="tijd"]:checked'));
    var naam = this.naam;
    var mail = this.mail;
    var tel = this.tel;
    var opmerkingen = this.opmerkingen;
    var datumgekozen = this.datum;

    var startTijd = datumgekozen + "T" + tijd.value;

    if (naam && mail && tel && tijd ) {
      var gegevens = {
        startTijd: startTijd,
        naam: naam,
        email: mail,
        telefoonnummer: tel,
        probleem: (<HTMLInputElement>document.querySelector('input[name="reden"]:checked')).value,
        opmerkingen: opmerkingen
      };

      this.afsprakenService.gegevens_doorsturen(gegevens).subscribe(
            (response) => { 
              // console.log(response);
              this.router.navigate(['/succes']);
            });

      console.log(gegevens);
    }
    else {
      this.error = 'Voer alstublieft alle velden met een * in.';
    }
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
