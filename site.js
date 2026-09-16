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
      if (p.photo) {
        var img = document.createElement('img');
        img.src = p.photo; img.alt = p.name || '';
        avatar.appendChild(img);
      } else {
        avatar.textContent = String(p.name || '').split(/\s+/).map(function (w) { return w[0] || ''; }).join('').slice(0, 2).toUpperCase();
        avatar.setAttribute('aria-hidden', 'true');
      }
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
