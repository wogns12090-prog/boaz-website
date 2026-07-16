// 보아스환경기술 홈페이지 - 정적 사이트 인터랙션
(function () {
  // ─── 1. 히어로 슬라이더 (메인 페이지) ───
  var slides = document.querySelectorAll('#home .hero-slide');
  var dots = document.querySelectorAll('#home button[aria-label^="슬라이드"]');
  if (slides.length > 1) {
    var idx = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('active')) idx = i;
    }
    var timer = null;
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) {
        if (i === idx) { d.style.width = '28px'; d.style.background = 'rgba(255,255,255,0.95)'; }
        else { d.style.width = '8px'; d.style.background = 'rgba(255,255,255,0.4)'; }
      });
    }
    function restartTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { show(idx + 1); }, 5000);
    }
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); restartTimer(); });
    });
    restartTimer();
  }

  // ─── 2. 이용후기 캐러셀 ───
  document.querySelectorAll('.review-carousel').forEach(function (car) {
    var track = car.querySelector('.review-track');
    var prev = car.querySelector('.carousel-btn.prev');
    var next = car.querySelector('.carousel-btn.next');
    if (!track || !prev || !next) return;
    var pos = 0;
    function perView() {
      var w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 900) return 2;
      return 3;
    }
    function total() { return track.children.length; }
    function maxPos() { return Math.max(0, total() - perView()); }
    function update() {
      var pv = perView();
      pos = Math.min(pos, maxPos());
      var gap = 20;
      var trackWidth = track.getBoundingClientRect().width;
      var cardW = (trackWidth - gap * (pv - 1)) / pv;
      var offset = pos * (cardW + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';
      prev.disabled = pos <= 0;
      next.disabled = pos >= maxPos();
    }
    prev.addEventListener('click', function () { if (pos > 0) { pos--; update(); } });
    next.addEventListener('click', function () { if (pos < maxPos()) { pos++; update(); } });
    window.addEventListener('resize', update);
    update();
    window.addEventListener('load', update);
  });

  // ─── 3. 보유장비 탭 (측정장비 / 분석장비) ───
  var eqBtns = document.querySelectorAll('.eq-tab-btn');
  if (eqBtns.length) {
    eqBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-eq-target');
        eqBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        document.querySelectorAll('.eq-panel').forEach(function (p) {
          var isTarget = p.getAttribute('data-eq-panel') === target;
          if (isTarget) {
            p.hidden = false;
            p.style.opacity = '0';
            requestAnimationFrame(function () { p.style.opacity = '1'; });
          } else {
            p.style.opacity = '0';
            setTimeout(function () {
              if (p.getAttribute('data-eq-panel') !== target) p.hidden = true;
            }, 320);
          }
        });
      });
    });
  }
})();
