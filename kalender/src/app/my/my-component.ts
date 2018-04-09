import { Component, OnInit } from '@angular/core';
import {MomentModule} from 'angular2-moment';
import * as $ from 'jquery';
import * as moment from 'moment';



@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html'
})
export class MyComponent{
    calendarOptions:Object = {
        
		defaultView: 'agendaWeek',
		nowIndicator: true,
		minTime: "07:00:00",
		maxTime: "19:00:00",
		aspectRatio: 1.5,
		selectable: true,
		select: function(startDate, endDate) {
			var duration = moment.duration(endDate.diff(startDate)).asHours();
			var slots = duration / 0.5;

			console.log(duration);

			for (var i = 0; i < slots; i++) { 
				var end = moment(startDate).add(30, 'minutes');

			    $('#calendar').fullCalendar('renderEvent', {
					title: 'afspraak mogelijk',
					start: startDate,
					end: end,
					allDay: false,
					customer: 'Lisa',
					customerTel: '0612345678',
					customerEmail: 'test@gmail.com',
					customerProblem: 'rede a'
		        }); 

		        startDate = moment(end);
			}

		},
		eventRender: function(event, element) {
			element.append( "<i class='closeon fas fa-trash-alt'></i>" );
			element.find(".closeon").click(function() {
			   $('#calendar').fullCalendar('removeEvents',event._id);
			});
        }
  }
}
