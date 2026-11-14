(function () {
  var R = window.RTC || {};
  // mobile menu
  var b = document.querySelector('[data-burger]'), n = document.querySelector('[data-nav]');
  if (b && n) b.addEventListener('click', function () {
    var o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  // mobile: tap Services to open / close its list
  var dd = document.querySelector('.nav-drop > a');
  if (dd) dd.addEventListener('click', function (e) {
    if (window.matchMedia('(max-width:980px)').matches) { e.preventDefault(); var w = dd.parentNode; var o = w.classList.toggle('open'); dd.setAttribute('aria-expanded', o ? 'true' : 'false'); }
  });
  // query popup
  var m = document.querySelector('[data-modal]');
  function show(v) { if (!m) return; m.hidden = !v; if (v) { var i = m.querySelector('input'); if (i) i.focus(); } }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-q]')) { e.preventDefault(); show(true); }
    else if (e.target.closest('[data-close-q]')) show(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') show(false); });
  // query forms -> WhatsApp or email
  document.querySelectorAll('[data-qform]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.getAttribute('data-via')) || 'wa';
      var name = f.name.value.trim(), phone = f.phone.value.replace(/[^0-9+]/g, '');
      var err = f.querySelector('.ferr');
      if (!name || phone.replace(/\D/g, '').length < 10) { err.hidden = false; return; }
      err.hidden = true;
      var text = 'New query from rohinitaxconsultant.com\n' +
        'Name: ' + name + '\nMobile: ' + phone +
        '\nService: ' + (f.service.value || 'Not selected') +
        (f.msg.value.trim() ? '\nMessage: ' + f.msg.value.trim() : '') +
        '\nPage: ' + document.title;
      var url = via === 'mail'
        ? 'mailto:' + R.email + '?subject=' + encodeURIComponent('Website query - ' + name) + '&body=' + encodeURIComponent(text)
        : 'https://wa.me/' + R.wa + '?text=' + encodeURIComponent(text);
      var w = null; try { w = window.open(url, '_blank'); } catch (x) {}
      if (!w) window.location.href = url;
    });
  });
  // reviews (from assets/reviews.js)
  var list = window.RTC_REVIEWS || [], box = document.querySelector('[data-reviews]');
  if (box && list.length) {
    var esc = function (s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
    box.innerHTML = list.slice(0, 6).map(function (r) {
      var s = Math.max(1, Math.min(5, r.stars || 5));
      return '<div class="rev"><div class="st" aria-label="' + s + ' out of 5 stars">' + '★★★★★'.slice(0, s) + '</div><p>' + esc(r.text) +
        '</p><b>' + esc(r.name) + '</b><small>' + esc(r.when || 'Google review') + '</small></div>';
    }).join('') + '<div class="rev-more"><a class="btn btn-line" target="_blank" rel="noopener" href="' + R.map + '">See all reviews on Google</a></div>';
  }
})();
