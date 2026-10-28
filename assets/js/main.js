/* EH Korean: shared behaviour (header, mobile nav, scroll reveal, forms) */
(function () {
  document.documentElement.classList.add('js');

  // ----- Mobile nav -----
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Overlay header turns solid on scroll (home) -----
  if (header && header.classList.contains('site-header--overlay')) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 60); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Scroll reveal -----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ----- Year in footer -----
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

/*
 * Form submission.
 * Set window.EH_FORM_ENDPOINT (see assets/js/config.js) to a form backend URL
 * (Formspree, Getform, a Vercel function, Google Apps Script…) to receive submissions.
 * Without an endpoint the form shows its success state so the site can be demoed.
 */
window.EHSubmit = function (formName, data) {
  var endpoint = window.EH_FORM_ENDPOINT;
  if (!endpoint) {
    console.info('[EH Korean] No form endpoint configured, demo submit:', formName, data);
    return Promise.resolve({ ok: true, demo: true });
  }
  var payload = Object.assign({ _form: formName, _page: location.pathname }, data);
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  }).then(function (r) {
    if (!r.ok) throw new Error('Submission failed (' + r.status + ')');
    return { ok: true };
  });
};

window.EHFormData = function (form) {
  var out = {};
  new FormData(form).forEach(function (v, k) {
    if (out[k] !== undefined) { out[k] = [].concat(out[k], v); } else { out[k] = v; }
  });
  return out;
};
