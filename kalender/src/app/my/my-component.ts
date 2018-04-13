import { Component, OnInit } from '@angular/core';
import {MomentModule} from 'angular2-moment';
import * as $ from 'jquery';
import * as moment from 'moment';
import {AfsprakenService} from "../afspraken.service";
import {Router} from '@angular/router';

@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html'
})
export class MyComponent{
    constructor ( private afsprakenService: AfsprakenService, private router: Router ) { 
    	
    }

    permission:boolean = true;

    hasPermission() {
    	let permissionIs = sessionStorage.getItem('user');
    	console.log(permissionIs);

    	if (permissionIs != 'admin') {
    		this.permission = false;
    		console.log(this.permission);
    		this.router.navigate(['/admin']);
    	}
    	else {

    	}
    }

    afspraakOphalen(startTijd) {
    	this.afsprakenService.addAfspraak(startTijd).subscribe((startTijd) => { console.log(startTijd) })
    }

    afsprakenInladen() {
    	this.afsprakenService.getAfspraak().subscribe(
			afspr => {
				let afsprTijd = [];
				for (let i = 0; i < afspr.length; i++) { 
				    afsprTijd.push(afspr[i].startTijd);
				}
				this.afsprakenToevoegen(afsprTijd);
			}
    	);
    }	

    existingEvents = [];

    afsprakenToevoegen(afsprTijd) {
    	for (let i = 0; i < afsprTijd.length; i++) {
    		var start = moment(afsprTijd[i]);
    		var end = moment(afsprTijd[i]).add(30, 'minutes');

    		let event = {
    			title: 'afspraak mogelijkheid',
    			end: end,
    			start: start,
    			allDay: false
    		}
    		this.existingEvents.push(event);
    	}
    }

    afspraakVerwijderen(afspraak) {
    	this.afsprakenService.deleteAfspraak(afspraak).subscribe();
    }
    
    calendarOptions:Object 





    ngOnInit() : void {
        let self = this;

        this.hasPermission();

        this.afsprakenInladen()

        this.calendarOptions = {
			defaultView: 'agendaWeek',
			nowIndicator: true,
			minTime: "07:00:00",
			maxTime: "19:00:00",
			aspectRatio: 1.5,
			selectable: true,
			events: self.existingEvents,
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
						customer: '',
						customerTel: '',
						customerEmail: '',
						customerProblem: ''
			        });

			       self.afspraakOphalen(startDate.format());	 

			       startDate = moment(end);
				}
			},
			eventRender: function(event, element) {
	            element.append( "<span class='closeon'><i class='fas fa-trash-alt'></i></span>" );
	            element.find(".closeon").click(function() {
	            	self.afspraakVerwijderen(event.start.format());
	                $('#calendar').fullCalendar('removeEvents',event._id);
	            });
	        }
    	}
     }

    
}
