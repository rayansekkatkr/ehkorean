/* EH Korean: multi-step private application */
(function () {
  var form = document.querySelector('[data-apply]');
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
  var navItems = document.querySelectorAll('[data-steps-nav] li');
  var label = document.querySelector('[data-progress-label]');
  var bar = document.querySelector('[data-progress]');
  var back = form.querySelector('[data-back]');
  var next = form.querySelector('[data-next]');
  var hint = form.querySelector('[data-hint]');
  var error = form.querySelector('[data-error]');
  var done = document.querySelector('[data-done]');
  var current = 0;

  // Pre-select the program from the URL (?program=one-day)
  if (/program=one-day/.test(location.search)) {
    var od = form.querySelector('input[name="program"][value="One Day Residency"]');
    if (od) od.checked = true;
  }

  function render() {
    steps.forEach(function (s, i) { s.hidden = i !== current; });
    navItems.forEach(function (li, i) {
      li.classList.toggle('is-done', i < current);
      li.classList.toggle('is-active', i === current);
    });
    label.textContent = 'Step ' + (current + 1) + ' of ' + steps.length;
    var pct = Math.round((current / steps.length) * 100);
    bar.firstElementChild.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', pct);
    back.hidden = current === 0;
    hint.hidden = current !== 0;
    next.textContent = current === steps.length - 1 ? 'Submit application' : 'Continue →';
    error.textContent = '';
  }

  function validate() {
    if (current === 0) {
      var email = form.querySelector('[name="email"]');
      if (!email.value || !email.checkValidity()) {
        error.textContent = 'Please enter a valid email address so we can reach you.';
        email.focus();
        return false;
      }
    }
    return true;
  }

  function goTo(i) {
    current = i;
    render();
    var top = document.querySelector('.flow__main').getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
  }

  next.addEventListener('click', function () {
    if (!validate()) return;
    if (current < steps.length - 1) { goTo(current + 1); return; }
    next.disabled = true;
    next.textContent = 'Sending…';
    window.EHSubmit('application', window.EHFormData(form)).then(function () {
      form.hidden = true;
      document.querySelector('[data-progress-head]').hidden = true;
      navItems.forEach(function (li) { li.classList.remove('is-active'); li.classList.add('is-done'); });
      done.hidden = false;
    }).catch(function () {
      next.disabled = false;
      next.textContent = 'Submit application';
      error.textContent = 'Something went wrong while sending. Please try again or email ehkorean826@gmail.com.';
    });
  });
  back.addEventListener('click', function () { if (current > 0) goTo(current - 1); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  render();
})();
