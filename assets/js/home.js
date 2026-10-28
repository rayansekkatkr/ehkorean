/* EH Korean — home page */
(function () {
  // ----- Hero carousel -----
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var bars = Array.prototype.slice.call(document.querySelectorAll('.hero__bar'));
  var captions = [
    ['향원정', 'Hyangwonjeong Pavilion, Gyeongbokgung'],
    ['세종대왕', 'King Sejong, Gwanghwamun Square'],
    ['근정전', 'Geunjeongjeon Throne Hall'],
    ['북한산', 'Bukhansan at golden hour'],
    ['서울의 밤', 'Seoul after dark']
  ];
  var ko = document.querySelector('[data-hero-ko]');
  var en = document.querySelector('[data-hero-en]');
  var num = document.querySelector('[data-hero-n]');
  var current = 0;
  var timer = null;

  function show(i) {
    current = i;
    slides.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
    bars.forEach(function (b, k) {
      b.classList.remove('is-on');
      b.classList.toggle('is-done', k < i);
      if (k === i) { void b.offsetWidth; b.classList.add('is-on'); }
    });
    if (ko) ko.textContent = captions[i][0];
    if (en) en.textContent = captions[i][1];
    if (num) num.textContent = '0' + (i + 1);
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(function () { show((current + 1) % slides.length); }, 6000);
  }
  bars.forEach(function (b, i) { b.addEventListener('click', function () { show(i); start(); }); });
  if (slides.length) { show(0); start(); }
  document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else start(); });

  // ----- Seven days -----
  var days = [
    { tab: 'Day 1', num: '01', theme: 'Grounding', ko: '뿌리', img: '/images/day1.jpg', q: 'What feels different now that you are here?' },
    { tab: 'Day 2', num: '02', theme: 'Observation', ko: '관찰', img: '/images/day2.jpg', q: 'What did you notice today that you might usually overlook?' },
    { tab: 'Day 3', num: '03', theme: 'Embodiment', ko: '체화', img: '/images/day3.jpg', q: 'When did you feel most present today?' },
    { tab: 'Day 4', num: '04', theme: 'Modernity', ko: '현대', img: '/images/day4.jpg', q: 'What about Korea’s pace felt familiar — or unfamiliar?' },
    { tab: 'Day 5', num: '05', theme: 'Connection', ko: '연결', img: '/images/day5.jpg', q: 'Which conversation stayed with you, and why?' },
    { tab: 'Day 6', num: '06', theme: 'History', ko: '역사', img: '/images/day6.jpg', q: 'What from the past still feels alive here?' },
    { tab: 'Day 7', num: '07', theme: 'Integration', ko: '통합', img: '/images/day7.jpg', q: 'What do you want to remember when you return home?' },
    { tab: '+1 year', num: '∞', theme: 'A letter across time', ko: '편지', img: '/images/day8.jpg', q: 'A letter from your past self arrives, one year later.' }
  ];
  var visual = document.querySelector('[data-days-visual]');
  var list = document.querySelector('[data-days-list]');
  if (visual && list) {
    var imgs = days.map(function (d, i) {
      var wrap = document.createElement('div');
      wrap.className = 'days__img';
      var img = document.createElement('img');
      img.className = 'cover';
      img.src = d.img;
      img.alt = d.theme;
      img.loading = 'lazy';
      wrap.appendChild(img);
      visual.insertBefore(wrap, visual.firstChild);
      return wrap;
    });
    var btns = days.map(function (d, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'day-btn';
      b.setAttribute('role', 'tab');
      b.innerHTML = '<span class="day-btn__n">' + d.num + '</span><span class="day-btn__t">' + d.theme + '</span><span class="day-btn__k">' + d.ko + '</span>';
      b.addEventListener('click', function () { select(i); });
      list.appendChild(b);
      return b;
    });
    var koEl = document.querySelector('[data-days-ko]');
    var metaEl = document.querySelector('[data-days-meta]');
    var qEl = document.querySelector('[data-days-q]');
    var select = function (i) {
      imgs.forEach(function (w, k) { w.classList.toggle('is-on', k === i); });
      btns.forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      koEl.textContent = days[i].ko;
      metaEl.textContent = days[i].tab + ' · ' + days[i].theme;
      qEl.textContent = '“' + days[i].q + '”';
    };
    select(2);
  }

  // ----- FAQ accordion -----
  var faq = document.querySelector('[data-faq]');
  if (faq) {
    var buttons = faq.querySelectorAll('button[aria-controls]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        buttons.forEach(function (o) {
          o.setAttribute('aria-expanded', 'false');
          document.getElementById(o.getAttribute('aria-controls')).hidden = true;
        });
        if (!open) {
          btn.setAttribute('aria-expanded', 'true');
          document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
        }
      });
    });
  }

  // ----- Private inquiry -----
  var form = document.querySelector('[data-inquiry]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('[name="email"]');
      var note = form.querySelector('[data-form-note]');
      if (!email.value || !email.checkValidity()) {
        email.focus();
        note.textContent = 'Please enter a valid email address.';
        note.style.color = 'var(--accent)';
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      window.EHSubmit('inquiry', window.EHFormData(form)).then(function () {
        form.hidden = true;
        document.querySelector('[data-inquiry-success]').hidden = false;
      }).catch(function () {
        btn.disabled = false;
        note.textContent = 'Something went wrong. Please email ehkorean826@gmail.com.';
        note.style.color = 'var(--accent)';
      });
    });
  }
})();
