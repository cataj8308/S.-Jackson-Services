/* Fills names, phones and email from site-config.js, and wires up
   the mobile menu and the contact form. No frameworks, no build step. */
(function () {
  var S = window.SITE || {};

  function telHref(num) { return 'tel:' + String(num).replace(/[^\d+]/g, ''); }
  function isPlaceholder(v) { return !v || /^\[.*\]$/.test(String(v).trim()); }

  // Text fills
  document.querySelectorAll('[data-fill]').forEach(function (el) {
    var key = el.getAttribute('data-fill');
    if (S[key] !== undefined) el.textContent = S[key];
  });
  // tel: links
  document.querySelectorAll('[data-fill-tel]').forEach(function (el) {
    var v = S[el.getAttribute('data-fill-tel')];
    if (!isPlaceholder(v)) el.setAttribute('href', telHref(v));
  });
  // mailto: links
  document.querySelectorAll('[data-fill-mailto]').forEach(function (el) {
    var v = S[el.getAttribute('data-fill-mailto')];
    if (!isPlaceholder(v)) el.setAttribute('href', 'mailto:' + v);
  });

  // Per-person phones and avatars used in the Trade / AI sections, contact list and footer
  function avatarFill(el, p) {
    el.innerHTML = '';
    if (p.photo) {
      var img = document.createElement('img'); img.src = p.photo; img.alt = p.name || '';
      el.appendChild(img);
    } else {
      el.textContent = String(p.name || '').split(/\s+/).map(function (w) { return w[0] || ''; }).join('').slice(0, 2).toUpperCase();
    }
  }
  if (Array.isArray(S.people)) {
    document.querySelectorAll('[data-person-phone]').forEach(function (el) {
      var p = S.people[+el.getAttribute('data-person-phone')];
      if (p && p.phone) el.textContent = p.phone;
    });
    document.querySelectorAll('[data-person-tel]').forEach(function (el) {
      var p = S.people[+el.getAttribute('data-person-tel')];
      if (p && !isPlaceholder(p.phone)) el.setAttribute('href', telHref(p.phone));
    });
    document.querySelectorAll('[data-avatar]').forEach(function (el) {
      var p = S.people[+el.getAttribute('data-avatar')];
      if (p) avatarFill(el, p);
    });
  }

  // People cards (About section)
  var people = document.getElementById('people');
  if (people && Array.isArray(S.people) && S.people.length) {
    var phoneIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3A19.5 19.5 0 0 1 5.1 13 19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>';
    people.innerHTML = '';
    S.people.forEach(function (p) {
      var d = document.createElement('div');
      d.className = 'person';
      var avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatarFill(avatar, p);
      var info = document.createElement('div');
      var name = document.createElement('div'); name.className = 'name'; name.textContent = p.name || '';
      var role = document.createElement('div'); role.className = 'role'; role.textContent = p.role || '';
      var phone = document.createElement('div'); phone.className = 'phone'; phone.innerHTML = phoneIcon;
      var a = document.createElement('a');
      a.textContent = p.phone || '';
      a.setAttribute('href', isPlaceholder(p.phone) ? '#contact' : telHref(p.phone));
      phone.appendChild(a);
      info.appendChild(name); info.appendChild(role); info.appendChild(phone);
      d.appendChild(avatar); d.appendChild(info);
      people.appendChild(d);
    });
  }

  // Profiles (About section) — one block per person, alternating sides.
  // Any text still in [brackets] is shown highlighted so it is easy to spot.
  function richText(el, text) {
    el.innerHTML = '';
    String(text || '').split(/(\[[^\]]*\])/).forEach(function (part) {
      if (!part) return;
      if (/^\[.*\]$/.test(part)) {
        var m = document.createElement('mark'); m.className = 'placeholder'; m.textContent = part; el.appendChild(m);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  var profiles = document.getElementById('profiles');
  if (profiles && Array.isArray(S.people)) {
    S.people.forEach(function (p, i) {
      if (!p.story && !p.facts) return;
      var art = el('article', 'profile' + (i % 2 ? ' flip' : ''));
      art.id = String(p.name || '').split(/\s+/)[0].toLowerCase();

      var side = el('div', 'profile-side');
      var av = el('div', 'avatar big'); av.setAttribute('aria-hidden', 'true'); avatarFill(av, p);
      side.appendChild(av);
      var call = el('a', 'btn btn-primary');
      call.setAttribute('href', isPlaceholder(p.phone) ? '#contact' : telHref(p.phone));
      call.textContent = 'Call ' + String(p.name || '').split(/\s+/)[0];
      side.appendChild(call);

      var body = el('div', 'profile-body');
      if (p.side) body.appendChild(el('div', 'profile-eyebrow', p.side));
      body.appendChild(el('h3', null, p.name || ''));
      body.appendChild(el('div', 'profile-role', p.role || ''));

      var story = el('div', 'profile-story');
      (p.story || []).forEach(function (t) { var para = el('p'); richText(para, t); story.appendChild(para); });
      body.appendChild(story);

      if (p.quote) { var q = el('blockquote', 'profile-quote'); richText(q, p.quote); body.appendChild(q); }

      var cols = el('div', 'profile-cols');
      if (p.facts && p.facts.length) {
        var c1 = el('div');
        c1.appendChild(el('div', 'profile-h', 'Quick facts'));
        var ul = el('ul', 'facts');
        p.facts.forEach(function (f) {
          var li = el('li');
          li.appendChild(el('span', 'fl', f.label || ''));
          var v = el('span', 'fv'); richText(v, f.value); li.appendChild(v);
          ul.appendChild(li);
        });
        c1.appendChild(ul); cols.appendChild(c1);
      }
      if (p.approach && p.approach.length) {
        var c2 = el('div');
        c2.appendChild(el('div', 'profile-h', 'How ' + String(p.name || '').split(/\s+/)[0] + ' works'));
        var ul2 = el('ul', 'approach');
        p.approach.forEach(function (t) { var li = el('li'); richText(li, t); ul2.appendChild(li); });
        c2.appendChild(ul2); cols.appendChild(c2);
      }
      body.appendChild(cols);

      art.appendChild(side); art.appendChild(body);
      profiles.appendChild(art);
    });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form: opens the visitor's email app with a pre-filled message.
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var service = form.service.value;
      var msg = form.message.value.trim();

      if (!name || !phone) {
        note.textContent = 'Please add your name and phone number so we can reach you.';
        note.style.color = '#8A1F1F';
        (name ? form.phone : form.name).focus();
        return;
      }
      if (isPlaceholder(S.email)) {
        note.textContent = 'Our email is not set up yet. Please give us a call instead.';
        note.style.color = '#8A1F1F';
        return;
      }
      var subject = 'Website inquiry: ' + service + ' — ' + name;
      var body = 'Name: ' + name + '\nPhone: ' + phone + '\nService: ' + service + '\n\n' + (msg || '(no additional details)');
      window.location.href = 'mailto:' + S.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      note.textContent = 'Your email app should open now. If it doesn\'t, call us and we\'ll take care of you.';
      note.style.color = '';
    });
  }
})();
