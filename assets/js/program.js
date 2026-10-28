/* EH Korean — seven-day program */
(function () {
  var D = [
    { n: 1, dow: 'Friday · Arrival', theme: 'Grounding', ko: '뿌리', img: '/images/day1.jpg', line: 'The journey begins not from a destination, but from you.', route: 'Incheon Airport → Bupyeong',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Incheon Airport pickup', tags: [], items: ['Private lounge access', 'T-money card & snacks', 'Emergency contact briefing', 'Consent form signing'] },
        { when: 'Afternoon', ko: '오후', title: 'Orientation · airport area', tags: [], items: ['Welcome kit, Ohaeng Journal and itinerary reveal', 'Personal welcome card, one line in Korean & English', '“Not a trip — a designed shift in perspective”'] },
        { when: 'Evening', ko: '저녁', title: 'Grounding Circle', tags: [], items: ['Check-in & welcome party', '“Who are you, and what do you want Korea to reveal to you?”', 'Journaling, then return to the hotel in Bupyeong'] }
      ] },
    { n: 2, dow: 'Saturday', theme: 'Observation', ko: '관찰', img: '/images/day2.jpg', line: 'Korea not as backdrop, but as a living system.', route: 'Bupyeong → Chungmuro → Han River',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Korea Decoded session', tags: [], items: ['The beauty of empty space · Heung and Han', 'Practical expressions: ordering, market dialogue, greeting a hanok host', 'Language as the key to the day’s experience'] },
        { when: 'Afternoon', ko: '오후', title: 'Korea House, Chungmuro', tags: ['Prompting', 'Docent', 'Debriefing'], items: ['Traditional performance', 'Traditional Korean lunch', '“Not seeing — decoding meaning”'] },
        { when: 'Evening', ko: '저녁', title: 'Han River sunset', tags: ['Prompting', 'Docent', 'Debriefing'], items: ['Catered picnic dinner by the river', 'Han River context talk', 'Journaling at a riverside café · rainy-day plan: karaoke & chimaek'] }
      ] },
    { n: 3, dow: 'Sunday', theme: 'Embodiment', ko: '체화', img: '/images/day3.jpg', line: 'What Korea is, and what it awakens within you.', route: 'Bukchon, Nakgojae area → local market → Korean home',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Cultural Identity Workshop', tags: ['Prompting', 'Docent', 'Debriefing'], items: ['Hanbok fitting & photo session', 'Calligraphy', 'Tea ceremony (cha-ye-jeol)', 'A/B team rotation, 30–40 min each'] },
        { when: 'Afternoon', ko: '오후', title: 'Local market & mart', tags: ['Prompting', 'Debriefing'], items: ['How Koreans eat, trade and gather', 'Lunch among locals', 'Not tourism — cultural decoding'] },
        { when: 'Evening', ko: '저녁', title: 'Korean home visit', tags: [], items: ['Dinner with a curated Korean family', 'Korean home culture, from the inside', 'Close with journaling'] }
      ] },
    { n: 4, dow: 'Monday', theme: 'Modernity', ko: '현대', img: '/images/day4.jpg', line: 'Your life, seen through the way they live.', route: 'Bupyeong → university in Seoul → Seongsu / Gangnam',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Korea Decoded session', tags: [], items: ['Self-expression session', 'Role-play by profession & interest', 'Daily mission: one short conversation with a local (nunchi)'] },
        { when: 'Afternoon', ko: '오후', title: 'University seminar or company visit', tags: ['Prompting', 'Debriefing'], items: ['Guest lecture by a professor, about one hour, conversation format', 'Or meet Korean professionals in their 30s–40s', 'Campus or company cafeteria lunch'] },
        { when: 'Evening', ko: '저녁', title: 'Free evening in modern Seoul', tags: ['Prompting', 'Docent'], items: ['Seongsu-dong indie brands, COEX or Gangnam', 'From seminar to street exploration', 'Journaling at a café'] }
      ] },
    { n: 5, dow: 'Tuesday', theme: 'Connection', ko: '연결', img: '/images/day5.jpg', line: 'Recovery is not rest. It is a practice.', route: 'Bupyeong → Wonmi Mountain → Starfield Goyang → Eunpyeong',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Outdoor Korea Decoded · Wonmi Mountain hike', tags: ['Prompting'], items: ['Full Korean hiking gear experience', 'Trail expressions: “I’m tired”, “almost there”', 'Summit break with apple & cucumber', 'Hearty Korean lunch'] },
        { when: 'Afternoon', ko: '오후', title: 'Aquafield, Starfield Goyang', tags: ['Prompting', 'Debriefing'], items: ['Spa and jjimjilbang', 'Korean recovery culture', '“Not productivity — restoration”'] },
        { when: 'Evening', ko: '저녁', title: 'Private film screening', tags: ['Docent'], items: ['The King’s Warden, in a rented cinema room', 'Context for tomorrow’s visit to Cheongnyongpo', 'Journaling'] }
      ] },
    { n: 6, dow: 'Wednesday', theme: 'History', ko: '역사', img: '/images/day6.jpg', line: 'Where Korea came from. Where you are going.', route: 'Yeongwol, Gangwon Province',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Journey to Yeongwol', tags: ['Prompting', 'Debriefing'], items: ['Early departure, about 2.5–3 hours', 'A change of environment signals something is completing'] },
        { when: 'Afternoon', ko: '오후', title: 'Danjong Heritage Trail', tags: ['Prompting', 'Docent'], items: ['Cheongnyongpo', 'Key Yeongwol landmarks, at a gentle pace'] },
        { when: 'Evening', ko: '저녁', title: 'Closing dinner at The Hanok Heritage', tags: [], items: ['Fine dining in a hanok heritage estate', 'Reflection circle: “one thing Korea revealed”', 'Final journaling'] }
      ] },
    { n: 7, dow: 'Thursday', theme: 'Integration', ko: '통합', img: '/images/day7.jpg', line: 'The connections built here do not stay here.', route: 'Yeongwol → Seoul → Incheon Airport',
      blocks: [
        { when: 'Morning', ko: '아침', title: 'Integration session', tags: ['Prompting'], items: ['Closing ritual: “What do you carry back with you?”', 'Individual presentations and group sharing', 'Rachel’s message and completion ceremony'] },
        { when: 'Afternoon', ko: '오후', title: 'Free time in Seoul', tags: [], items: ['Rest-stop lunch on the way back', 'Introduction to the alumni network', 'Digital album and AI journey report'] },
        { when: 'Evening', ko: '저녁', title: 'Departure', tags: [], items: ['Drop-off at Incheon Airport', 'Mission complete'] }
      ] }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var tabsEl = document.querySelector('[data-tabs]');
  var visual = document.querySelector('[data-visual]');
  var blocksEl = document.querySelector('[data-blocks]');
  var glance = document.querySelector('[data-glance]');

  var imgs = D.map(function (d) {
    var w = document.createElement('div');
    w.className = 'program-day__img';
    w.innerHTML = '<img class="cover" src="' + d.img + '" alt="' + esc(d.theme) + '" loading="lazy">';
    visual.insertBefore(w, visual.firstChild);
    return w;
  });

  var tabs = D.map(function (d, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'program-tab';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'program-day');
    b.innerHTML = '<small>DAY ' + d.n + '</small>' + esc(d.theme);
    b.addEventListener('click', function () { select(i, false); });
    tabsEl.appendChild(b);
    return b;
  });

  D.forEach(function (d, i) {
    var r = document.createElement('button');
    r.type = 'button';
    r.className = 'glance__row';
    r.innerHTML = '<span class="glance__n">0' + d.n + '</span>' +
      '<span class="glance__t"><strong>' + esc(d.theme) + '</strong><span>' + esc(d.dow) + '</span></span>' +
      '<span class="glance__line">' + esc(d.line) + '</span>' +
      '<span class="glance__route">' + esc(d.route) + '</span>';
    r.addEventListener('click', function () { select(i, true); });
    glance.appendChild(r);
  });

  function select(i, scroll) {
    var d = D[i];
    imgs.forEach(function (w, k) { w.classList.toggle('is-on', k === i); });
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    document.querySelector('[data-ko]').textContent = d.ko;
    document.querySelector('[data-meta]').textContent = 'Day ' + d.n + ' · ' + d.dow;
    document.querySelector('[data-theme]').textContent = d.theme;
    document.querySelector('[data-line]').textContent = d.line;
    document.querySelector('[data-route]').textContent = d.route;
    blocksEl.innerHTML = d.blocks.map(function (b) {
      return '<article class="block">' +
        '<div class="block__when"><p>' + b.when + '</p><span>' + b.ko + '</span></div>' +
        '<div style="flex:1;min-width:0"><h3>' + esc(b.title) + '</h3>' +
        '<div class="block__tags">' + b.tags.map(function (t) { return '<span class="tg tg-' + t + '">' + t + '</span>'; }).join('') + '</div>' +
        '<ul>' + b.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul></div></article>';
    }).join('');
    blocksEl.classList.remove('is-swapping'); void blocksEl.offsetWidth; blocksEl.classList.add('is-swapping');
    if (scroll) document.getElementById('program-day').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  var start = Math.min(Math.max(parseInt((location.hash.match(/day-(\d)/) || [])[1] || '1', 10), 1), 7) - 1;
  select(start, false);
})();
