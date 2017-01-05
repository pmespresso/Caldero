//TODO: Clean up with Object.prototype, make more modular

/**
* On document ready, initialize fullCalendar and timepicker
*/
$(document).ready(function() {
  $('#calendar').fullCalendar({
    defaultView: 'agendaWeek',
    editable: 'true',
    height: 'parent',
    lazyFetching: false,
    dayClick: function(date, jsEvent, view) {
      createEvent(date, jsEvent, view);
    },
    eventClick: function(calEvent, jsEvent, view) {
      renameEvent(calEvent, jsEvent, view);
    },
    eventRender: function(event, element) {
      element.find('.fc-title').append("<br/>" + event.description);
    }
  });


});


/*
* When user clicks on the calendar,
* Create a default event object from that time
*/
function createEvent(date, jsEvent, view) {
  let evnt_source = [];

  //TODO: Bug; every event has same id.
  // This makes it so deleteing one event deletes all events.
  let evt = {
    title: "Untitled Event",
    start: date.format()
  }
  evnt_source.push(evt);
  $('#calendar').fullCalendar('addEventSource', evnt_source);
}

/*
* When user clicks on an event,
* Prompt the user for a new title and update the title.
*/
function renameEvent(calEvent, jsEvent, view) {
  let form, dialog;
  dialog = $('.mandatories__section').dialog({
     modal: true,
     width: 700,
     height: 700
   });
   initAutocomplete();
   /*
   *  On Submit Dialog
   */
   $('.mandatories__section').find("form").on('submit',
      function(event) {
        event.preventDefault();

        calEvent.title = event.currentTarget[0].value;
        calEvent.description = event.currentTarget[1].value;

        $('#calendar').fullCalendar('updateEvent', calEvent);
        $('.mandatories__section').find("form")[0].reset();
        dialog.dialog("close");
      });

      /*
      * On Delete Event in Dialog
      */
      //TODO: Bug; every event has same id.
      // This makes it so deleteing one event deletes all events.
    $('.mandatories__section').find("#delete").on('click',
      function(event) {
        event.preventDefault();
        $('#calendar').fullCalendar('removeEvents', calEvent.id);
        dialog.dialog("close");
      });
}

/**
* Validate form and submit.
*/
//
$(function() {
  $("form[name='mandatory_entry']").validate({
    debug: true,
    rules: {
      summary: "required"
    },
    messages: {
      summary: "Gonna Need a Title, Pal"
    }
    // submitHandler: submitMandatory
  });
});



/*
 * Given a datetime string, parse out just the date output in string format
 * Input: "2016-12-27T12:00:00"
 * Output: "2016-12-27"
*/
function getDate(datetime) {
		return datetime.substr(0, datetime.indexOf('T'));
}

/*
 * Given a datetime string, parse out just the time output in string format
 * Input: "2016-12-27T12:00:00"
 * Output: "12:00:00"
*/
function getTime(datetime) {
		return datetime.substr(datetime.indexOf('T') + 1, datetime.length);
}

/**
* onClick delete button, remove the relevant <li> element.
* Figure out whether to remove event from gcal_evnt_format or wantto_fields
* @param {Object} e DOM Node corresponding to Delete Button.
*/
function remove(e) {
  e.parentNode.parentNode.removeChild(e.parentNode);
  // Hack: Just ignoring wantto's for now. Just assume it's mandatory event.
  let th = e.id.substr(e.length - 2, e.length);
}


/**
* After validating the form, submitHandler invokes this subtmitMandatory.
* Push data to mandatory_fields array
*/

// function submitMandatory() {
// /* Get input values */
//   let summary = $('form#mandatory_entry').find('input#summary').val();
//   let days_input = $('form#mandatory_entry').find('input.day');
//   let days = [];
//
//   $.each(days_input, function(i, val) {
//     if (val.checked) {days.push(val.id)}
//   });
//
//   let startTime = $('form#mandatory_entry').find('input#startTime').val();
//   let endTime = $('form#mandatory_entry').find('input#endTime').val();
//   let location = $('form#mandatory_entry').find("input#location-input").val();
//
//   /* Create new Event# object and push object to gcal_evnt_format */
//   // let gcal_evnt = {
//   //   summary: summary,
//   //   days: days,
//   //   location: location || 'No Location Specified',
//   //   startTime: startTime,
//   //   endTime: endTimee
//   // }
//   //
//   let iso_format_days = [];
//
//   // go through days, get isoified arrays.
//   // push these arrays to isoify_format_days
//   for (var i = 0; i < days.length; i++) {
//     // an array [startTime, endTime]
//     let e = isoify(days[i], startTime, endTime);
//     console.log("e is: " + e);
//     iso_format_days.push({
//       title: summary,
//       start: e[0],
//       end: e[1]
//     });
//   }
//
//   for (var i = 0; i < iso_format_days.length; i++) {
//     console.log("isoify_format_days: " );
//     console.log(iso_format_days);
//     fullcal_evnt_format.push(iso_format_days[i]);
//   }
//
//
//   // gcal_evnt_format.push(gcal_evnt);
//
//   // {
//   //   title: "Ass",
//   //   start: "2017-01-02T12:00:00",
//   //   end: "2017-01-02T16:00:00"
//   // }
//
//   // console.log("fullcal: ");
//   // console.log(fullcal_evnt_format);
//   // $('#calendar').fullCalendar('addEventSource', gcal_evnt_format);
//
//   $('form#mandatory_entry')[0].reset();
// };


/**
* @param day is a string e.g. "monday"
* find the nearest monday to the current Date()
// */
// function isoify(day, startTime, endTime) {
//
//   let b;
//   console.log("day: " + day);
//   switch (day) {
//     case "monday":
//       b = 1;
//       break;
//     case "tuesday":
//       b = 2;
//       break;
//     case "wednesday":
//       b = 3;
//       break;
//     case "thursday":
//       b = 4;
//       break;
//     case "friday":
//       b = 5;
//       break;
//     case "saturday":
//       b = 6;
//       break;
//     case "sunday":
//       b = 0;
//       break;
//     default:
//       b = 1;
//   }
//   let d = new Date();
//   console.log("d: " + d);
//
//
//
//   ym = getYearMonthFromISO(d.toISOString());
//   console.log("ym: ", ym);
//   return [ym + "T" + startTime, ym + "T" + endTime];
// }
//
// function getYearMonthFromISO(iso_date) {
//   return iso_date.substr(0, iso_date.indexOf("T"));
// }
