import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MomentModule} from 'angular2-moment';
import * as $ from 'jquery';
import * as moment from 'moment';
import {AfsprakenService} from "../afspraken.service";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html',
  styleUrls: ['./my-component.css']

})
export class MyComponent{

    constructor ( private afsprakenService: AfsprakenService, private router: Router, private route: ActivatedRoute, private cdRef:ChangeDetectorRef ) { 
    	
    }

    //Check if user loggedin
    permission:boolean = true;

    hasPermission() {
    	let permissionIs = sessionStorage.getItem('user');

    	if (permissionIs != 'admin') {
    		this.permission = false;
    		this.router.navigate(['/admin']);
    	}
    	else {

    	}
    }

    //check user
    user: string = sessionStorage.getItem('user');
    naam: string ;
    email: string;
    tel: string;
    probleem: string;
    opmerking: string;
    dag: string;
    start: string;
    eind: string;

    //Add afspraken to database
    afspraakInDatabase(startTijd) {
    	this.afsprakenService.addAfspraak(startTijd).subscribe((startTijd) => { console.log(startTijd) })
    }

    //Get afspraken onload
    afsprakenInladen() {
    	this.afsprakenService.getAfspraak().subscribe(
			afspr => {
				
				let afsprTijd = [];
				for (let i = 0; i < afspr.length; i++) { 
				    afsprTijd.push(afspr[i]);
				}
				this.afsprakenToevoegen(afsprTijd);
			}
    	);
    }	

    existingEvents = [];

    afsprakenToevoegen(afsprTijd) {
    	for (let i = 0; i < afsprTijd.length; i++) {
    		var start = moment(afsprTijd[i].startTijd).local();
    		var end = moment(afsprTijd[i].startTijd).add(30, 'minutes').local();

    		if (afsprTijd[i].naam != undefined ) {
    			let event = {
	    			title: afsprTijd[i].naam,
	    			end: end,
	    			start: start,
	    			allDay: false,
	    			className: 'afspraak',
	    			klant: afsprTijd[i].naam,
	    			klantTel: afsprTijd[i].tel,
	    			klantEmail: afsprTijd[i].email,
					klantProbleem: afsprTijd[i].probleem,
					klantOpmerking: afsprTijd[i].opmerkingen
	    		}

	    		this.existingEvents.push(event);
    		}
    		else {
    			let event = {
	    			title: 'afspraak mogelijkheid',
	    			end: end,
	    			start: start,
	    			allDay: false
	    		}

	    		this.existingEvents.push(event);
    		}
    	}
    }

    //delete afspraken
    afspraakVerwijderen(afspraak) {
    	this.afsprakenService.deleteAfspraak(afspraak).subscribe();
    }

   	private fragment: string;


	goToCalendar(id) {
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
	}    


	close() {
    	console.log('in close');
    	$('.meerinfo').addClass('hidden');
    }
    

    calendarOptions:Object 

    ngOnInit() : void {
        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
        
        let self = this;

        this.hasPermission();

        this.afsprakenInladen()

        this.calendarOptions = {
			defaultView: 'agendaWeek',
			nowIndicator: true,
			minTime: "07:00:00",
			maxTime: "22:00:00",
			aspectRatio: 1.5,
			selectable: true,
			weekends: false,
			events: self.existingEvents,
			allDaySlot: false,
			timeFormat: 'H:mm',
			select: function(startDate, endDate) {
				var duration = moment.duration(endDate.diff(startDate)).asHours();
				var slots = duration / 0.5;

				for (var i = 0; i < slots; i++) { 
					var end = moment(startDate).add(30, 'minutes');

				    $('#calendar').fullCalendar('renderEvent', {
						title: 'afspraak mogelijk',
						start: startDate,
						end: end,
						allDay: false,
						klant: '',
						klantTel: '',
						klantEmail: '',
						klantProbleem: '',
						klantOpmerking: ''
			        });

			        self.afspraakInDatabase(startDate.local().format());	 

			        startDate = moment(end);
				}
			},
			eventRender: function(event, element) {
	            element.append( "<span class='closeon'><i class='fas fa-trash-alt'></i></span>" );
	            element.find(".closeon").click(function() {
	            	self.afspraakVerwijderen(event.start.local().format());
	                $('#calendar').fullCalendar('removeEvents',event._id);
	            });
	        }, 
	        eventClick: function(calEvent, jsEvent, view, element) {

			    self.naam = calEvent.title;
			    self.email = calEvent.klantEmail;
			    self.tel = calEvent.klantTel;
			    self.probleem = calEvent.klantProbleem;
			    self.opmerking = calEvent.klantOpmerking;
			    self.dag = calEvent.start.format('dddd, MMMM YY'); 
			    self.start = calEvent.start.format('HH:mm');
			    self.eind = calEvent.end.format('HH:mm');

			    self.cdRef.detectChanges();

			    let posY = jsEvent.pageY + 10;
			    let posX = jsEvent.pageX - 20;

			    $('.meerinfo')
			    	.removeClass('hidden')
			    	.css({'left': posX, 'top': posY});
			}
    	}
    }
		

      
}
