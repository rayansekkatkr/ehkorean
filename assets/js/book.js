/*
 * EH Korean — book a conversation
 *
 * Availability rules live in AVAILABILITY below: weekdays only, from tomorrow,
 * up to MONTHS_AHEAD months ahead. All times are Korea Standard Time (UTC+9).
 * To connect a real calendar later, replace slotsFor() with a fetch to Cal.com,
 * Calendly or Google Calendar.
 */
(function () {
  var AVAILABILITY = {
    weekdays: [1, 2, 3, 4, 5],                  // Mon–Fri
    times: ['09:00', '10:30', '14:00', '15:30', '19:00', '20:30'],
    monthsAhead: 2
  };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // "Today" in Korea, whatever the visitor's timezone
  var nowKst = new Date(Date.now() + (9 * 60 + new Date().getTimezoneOffset()) * 60000);
  var today = new Date(nowKst.getFullYear(), nowKst.getMonth(), nowKst.getDate());
  var first = new Date(today.getFullYear(), today.getMonth(), 1);
  var last = new Date(today.getFullYear(), today.getMonth() + AVAILABILITY.monthsAhead, 1);

  var view = new Date(first);
  var selDate = null;
  var selTime = null;

  var cal = document.querySelector('[data-cal]');
  var monthLabel = document.querySelector('[data-month-label]');
  var prev = document.querySelector('[data-prev]');
  var nextm = document.querySelector('[data-nextm]');
  var dateLabel = document.querySelector('[data-date-label]');
  var slotsEl = document.querySelector('[data-slots]');
  var cont = document.querySelector('[data-continue]');
  var pick = document.querySelector('[data-pick]');
  var details = document.querySelector('[data-details]');
  var booked = document.querySelector('[data-booked]');

  function isAvailable(d) { return d > today && AVAILABILITY.weekdays.indexOf(d.getDay()) !== -1; }
  function slotsFor() { return AVAILABILITY.times; }
  function fmt(d) { return DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate(); }
  function same(a, b) { return a && b && a.getTime() === b.getTime(); }

  function renderCal() {
    monthLabel.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
    prev.disabled = view <= first;
    nextm.disabled = view >= last;
    cal.innerHTML = '';
    var lead = view.getDay();
    for (var i = 0; i < lead; i++) cal.appendChild(document.createElement('span'));
    var dim = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (var d = 1; d <= dim; d++) {
      (function (date) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = date.getDate();
        var av = isAvailable(date);
        b.className = 'cal-day' + (av ? ' is-available' : '') + (same(date, selDate) ? ' is-selected' : '');
        b.disabled = !av;
        b.setAttribute('aria-label', fmt(date) + (av ? '' : ', unavailable'));
        if (same(date, selDate)) b.setAttribute('aria-pressed', 'true');
        b.addEventListener('click', function () { selDate = date; selTime = null; renderCal(); renderSlots(); });
        cal.appendChild(b);
      })(new Date(view.getFullYear(), view.getMonth(), d));
    }
  }

  function renderSlots() {
    cont.disabled = !(selDate && selTime);
    if (!selDate) return;
    dateLabel.textContent = fmt(selDate);
    slotsEl.innerHTML = '';
    slotsFor(selDate).forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'slot';
      b.textContent = t;
      b.setAttribute('aria-pressed', t === selTime ? 'true' : 'false');
      b.addEventListener('click', function () { selTime = t; renderSlots(); });
      slotsEl.appendChild(b);
    });
  }

  prev.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCal(); });
  nextm.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCal(); });

  cont.addEventListener('click', function () {
    if (!selDate || !selTime) return;
    var label = fmt(selDate) + ' · ' + selTime + ' KST';
    details.querySelector('[data-summary]').innerHTML = '<strong>' + fmt(selDate) + '</strong> · ' + selTime + ' KST';
    details.querySelector('[data-slot-input]').value = label;
    pick.hidden = true;
    details.hidden = false;
  });
  details.querySelector('[data-change]').addEventListener('click', function () { details.hidden = true; pick.hidden = false; });

  details.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = details.querySelector('[name="email"]');
    var err = details.querySelector('[data-error]');
    if (!email.value || !email.checkValidity()) { err.textContent = 'Please enter a valid email address.'; email.focus(); return; }
    var btn = details.querySelector('button[type="submit"]');
    btn.disabled = true;
    window.EHSubmit('booking', window.EHFormData(details)).then(function () {
      details.hidden = true;
      booked.hidden = false;
      document.querySelector('[data-booked-text]').textContent = fmt(selDate) + ' at ' + selTime + ' KST. A calendar invite and video link are on their way.';
    }).catch(function () {
      btn.disabled = false;
      err.textContent = 'Something went wrong. Please email ehkorean826@gmail.com.';
    });
  });

  renderCal();
})();
