// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '255226830426-pusuvotvurcfk3ra9bh1r60ji1g52obf.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/calendar'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = $('#authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.css('color', 'red');
    authorizeDiv.append('<p> shit worked </p>');

    // alert("succesfully connected to Google Calendar");
    loadCalendarApi();

  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.append('<p class="lead"> Connect your G-Calendar to Sync Schedule </p>');
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
  * Take a user's input
  * Make a POST to gapi to create an event object
  *
  */
function createEvent() {

}

/**
* Take an event that has been created
* add the event to the user's calendar
*
*/
function addEvent(event) {

}

/**
* Based on desired skill level to acquire and
* on desired amount of hours per week user wants to put into this thing
* find how recurrence rule. i.e. 'RRULE:FREQ=DAILY;COUNT=2'
*/
function findRecurrence(hoursPerWeek, desiredSkillLevel) {

}

/**
* Based on desired skill level and total hours of work per week
* Find the right time to start and end the activity each day.
*/
function findDailyHourForEvent(hoursPerWeek, desiredSkillLevel) {

}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}


/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3');
}
