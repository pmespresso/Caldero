//TODO: Clean up with Object.prototype, make more modular

$(document).ready(function() {
  $('#calendar').fullCalendar({
    defaultView: 'agendaWeek',
    editable: 'true',
    height: 'parent',
    dayClick: function(date, jsEvent, view) {
      console.log("date clicked");
    }
  });

  $('#startTime').timepicker();
  $('#endTime').timepicker();
});


/* Array of event objects to be passed to G-Cal
* Get the 3rd event by mandatory_fields[2].
*
* {summary: '', location: '', startDateTime: '', endDateTime: ''}
*
*/
let mandatory_fields = [];


/*TODO: When startDateTime is picked,
 * disable all endDateTime options before and equal to startDateTime
*/
// $('#startDateTime').on('change', function(e) {
//   console.log(e);
// });

/*
 * given a datetime string,
 * parse out just the date
 * output in string format
 * Input: "2016-12-27 12:00"
 * Output: "2016-12-27"
*/
function getDate(datetime) {
		return datetime.substr(0, datetime.indexOf(' '));
}
/**
* onClick delete button, remove the relevant <li> element.
* Figure out whether to remove event from mandatory_fields or wantto_fields
* @param {Object} e DOM Node corresponding to Delete Button.
*/
function remove(e) {
  e.parentNode.parentNode.removeChild(e.parentNode);

  // Hack: Just ignoring wantto's for now. Just assume it's mandatory event.
  let th = e.id.substr(e.length - 2, e.length);
}





/**
* Validate form and submit.
*/
//
$(function() {
  $("form[name='mandatory_entry']").validate({
    rules: {
      startDateTime: "required",
      endDateTime: "required"
    },
    messages: {
      startDateTime: "When Does This Start?",
      endDateTime: "When Does This End?"
    },

    submitHandler: function() {
   /* Get input values */
      let summary = $('form#mandatory_entry').children('#summary').val();
      // TODO: change to location picker
      let location = $('form#mandatory_entry').children('#location').val();
      let startDateTime = $('form#mandatory_entry').children('p.flatpickr').children("#startDateTime").val();
      let endDateTime = $('form#mandatory_entry').children('p.flatpickr').children("#endDateTime").val();

      /* Create new Event# object and push object to mandatory_fields */
      let newEvent = {
        summary: summary || 'Untitled Event',
        location: location || 'No Location Specified',
        startDateTime: startDateTime,
        endDateTime: endDateTime
      }
      mandatory_fields.push(newEvent);

//       /* Display New Input in Inventory */
      let events = $('tr#mandatories'),
          newTd = document.createElement('td'),
          br = document.createElement('br'),
          deleteBtn = document.createElement('button');

      newTd.className = "mandatory_entry";
      deleteBtn.className = "deleteBtn";

      newTd.append(document.createTextNode(newEvent.summary + " from: " + newEvent.startDateTime + " to: " + newEvent.endDateTime));
      newTd.append(br);
      deleteBtn.append(document.createTextNode("Delete"));
      deleteBtn.onclick = function() {
        remove(deleteBtn);
      }
      events.append(newTd, deleteBtn);
        //TODO: clear input fields
      $('form#mandatory_entry')[0].reset();
    }
  });
});
