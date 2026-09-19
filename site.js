/* Fills names, phones and email from site-config.js, and wires up
   the mobile menu and the contact form. No frameworks, no build step. */
(function () {
  var S = window.SITE || {};

  function telHref(num) { return 'tel:' + String(num).replace(/[^\d+]/g, ''); }
  function isPlaceholder(v) { return !v || /^\[.*\]$/.test(String(v).trim()); }

  // Small DOM helpers. Any text still in [brackets] is shown highlighted so it is easy to spot.
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

  // Loads a photo into a frame; if the file is missing, shows a note saying what to add.
  var PLACEHOLDER = "<div class=\"photo-placeholder\"><svg class=\"ph-logo\" viewBox=\"0 0 48 48\" fill=\"none\" aria-hidden=\"true\"><path d=\"M 20.5 8.9 L 20.63 3.78 L 27.37 3.78 L 27.5 8.9 L 32.2 10.85 L 35.92 7.32 L 40.68 12.08 L 37.15 15.8 L 39.1 20.5 L 44.22 20.63 L 44.22 27.37 L 39.1 27.5 L 37.15 32.2 L 40.68 35.92 L 35.92 40.68 L 32.2 37.15 L 27.5 39.1 L 27.37 44.22 L 20.63 44.22 L 20.5 39.1 L 15.8 37.15 L 12.08 40.68 L 7.32 35.92 L 10.85 32.2 L 8.9 27.5 L 3.78 27.37 L 3.78 20.63 L 8.9 20.5 L 10.85 15.8 L 7.32 12.08 L 12.08 7.32 L 15.8 10.85 Z\" stroke=\"#1B3A5C\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/><path d=\"M17 24.5 L22 29.5 L31.5 18.5\" stroke=\"#1B3A5C\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>S Jackson Services</span></div>";
  function mountPhoto(frame, src, alt, who) {
    if (!frame || !src) return;
    var img = document.createElement('img');
    img.alt = alt || '';
    img.addEventListener('load', function () {
      frame.classList.remove('missing');
      frame.innerHTML = '';
      frame.appendChild(img);
    });
    img.addEventListener('error', function () {
      // File not there yet: show a tidy branded placeholder instead of a broken image.
      frame.classList.add('missing');
      frame.innerHTML = PLACEHOLDER;
    });
    img.src = src;
  }

  // Photo of the two of you on the About card
  var teamFig = document.getElementById('teamPhoto');
  if (teamFig && S.teamPhoto && S.teamPhoto.src) {
    var names = (S.people || []).map(function (p) { return String(p.name || '').split(/\s+/)[0]; }).filter(Boolean).join(' and ');
    mountPhoto(teamFig.querySelector('.team-photo-frame'), S.teamPhoto.src, S.teamPhoto.caption || names, names || 'the team');
    if (S.teamPhoto.caption) { var tc = el('figcaption'); richText(tc, S.teamPhoto.caption); teamFig.appendChild(tc); }
  }

  // In-action photos in the two service sections
  document.querySelectorAll('[data-work-photo]').forEach(function (fig) {
    var p = (S.people || [])[+fig.getAttribute('data-work-photo')];
    if (!p) return;
    var frame = fig.querySelector('.side-photo-frame');
    var cap = fig.querySelector('figcaption');
    if (cap) {
      cap.innerHTML = '';
      cap.appendChild(el('strong', null, p.name || ''));
      cap.appendChild(el('span', null, p.role || ''));
      if (p.workPhoto && p.workPhoto.caption) { var em = el('em'); richText(em, p.workPhoto.caption); cap.appendChild(em); }
    }
    if (!(p.workPhoto && p.workPhoto.src) || !frame) return;
    var alt = p.workPhoto.caption ? p.workPhoto.caption.replace(/^\[|\]$/g, '') : (p.name + ' at work');
    mountPhoto(frame, p.workPhoto.src, alt, String(p.name || '').split(/\s+/)[0] + ' at work');
  });

  // Profiles (About section) — one block per person, alternating sides.
  var profiles = document.getElementById('profiles');
  if (profiles && Array.isArray(S.people)) {
    S.people.forEach(function (p, i) {
      if (!p.story && !p.facts) return;
      var art = el('article', 'profile' + (i % 2 ? ' flip' : ''));
      art.id = String(p.name || '').split(/\s+/)[0].toLowerCase();

      var side = el('div', 'profile-side');
      var av = el('div', 'avatar big'); av.setAttribute('aria-hidden', 'true'); avatarFill(av, p);
      side.appendChild(av);
      if (p.resume) {
        var cv = el('a', 'btn btn-outline');
        // The ?v= date makes browsers fetch a freshly uploaded PDF instead of a cached one.
        cv.setAttribute('href', p.resume + (p.resume.indexOf('?') < 0 ? '?v=' + new Date().toISOString().slice(0, 10) : ''));
        cv.setAttribute('target', '_blank');
        cv.setAttribute('rel', 'noopener');
        cv.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/></svg>';
        cv.appendChild(document.createTextNode('View Résumé'));
        side.appendChild(cv);
        side.appendChild(el('div', 'profile-note', 'Opens as a PDF'));
      }

      var body = el('div', 'profile-body');
      if (p.side) body.appendChild(el('div', 'profile-eyebrow', p.side));
      body.appendChild(el('h3', null, p.name || ''));
      body.appendChild(el('div', 'profile-role', p.role || ''));

      var story = el('div', 'profile-story');
      (p.story || []).forEach(function (t) { var para = el('p'); richText(para, t); story.appendChild(para); });
      body.appendChild(story);


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

      if (p.credentials && p.credentials.length) {
        var cr = el('div', 'credentials');
        cr.appendChild(el('div', 'profile-h', 'Certifications and training'));
        var wrap = el('div', 'chips');
        p.credentials.forEach(function (t) { var c = el('span', 'chip'); richText(c, t); wrap.appendChild(c); });
        cr.appendChild(wrap);
        body.appendChild(cr);
      }

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
