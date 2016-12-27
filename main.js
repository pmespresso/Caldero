//TODO: Clean up with Object.prototype, make more modular

window.onload = function () {
  console.log("chcek");
}

var mandatory_fields = {
	'event1': {
		summary: 'Untitled Event',
		location: 'Some Location in Some Place',
		startDateTime: 'Datetime Format',
		endDateTime: 'Datetime Format'
	}
}

$(".flatpickr").flatpickr({
	enableTime: true,
	wrap: true
});

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

/*
 * On submit mandatory entry,
 * Create a Google Calendar event object and
 * Display preview in the Inventories section
*/
$('form#mandatory_entry').submit(function(e) {
	e.preventDefault();

	if (validateForm($('form#mandatory_entry'))) {
		/* Get input values */
		mandatory_fields.summary = $('form#mandatory_entry').children('#summary').val();
		// TODO: change to location picker
		mandatory_fields.location = $('form#mandatory_entry').children('#location').val();
		mandatory_fields.startDateTime = $('form#mandatory_entry').children('p.flatpickr').children("#startDateTime").val();
		mandatory_fields.endDateTime = $('form#mandatory_entry').children('p.flatpickr').children("#endDateTime").val();

		/* Display New Input in Inventory */
		var events = $('.mandatory__events ul.events'),
				newLi = document.createElement('li');
		newLi.append(mandatory_fields.summary + " ");
		newLi.append(mandatory_fields.location + " ");
		newLi.append(mandatory_fields.startDateTime + " ");
		newLi.append(mandatory_fields.endDateTime + " ");
		events.append(newLi);
	} else {
		// give an error next to the input with an issue.
		console.error("did not pass validate form");
	}
	// TODO: clear input fields
	mandatory_fields.summary
});
/*
 * Boolean
 * Return true if the form inputs pass the following conditions:
 	* startDateTime and endDateTime are not empty/undefined and are Datetime formatted Strings
 	* location is the GPlaces formatted String, or empty String
 	* summary is a String, or empty String
 * Else return false
 */
function validateForm(field) {
	var children = field.children();

	for (var i = 0; i < children.length; i++) {
		// check summary
		let summary = children.children('#summary').val();
		// check location
		let location = children.children("#location").val();
		if (!summary || !location) console.log("Continuing with no summary or location");

		// check datetimes
		let startDateTime = field.children('p.flatpickr').children('#startDateTime').val();
		let endDateTime = field.children('p.flatpickr').children('#endDateTime').val();

		// check both not empty
		if (!startDateTime || !endDateTime) return false;
	}
	return true;
}
