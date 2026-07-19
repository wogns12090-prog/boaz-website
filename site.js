// 보아스환경기술 홈페이지 - 정적 사이트 인터랙션 + 후기 데이터 렌더링
(function () {

  // ── 전역 스타일 보정 (모든 페이지 공통 주입) ──
  var globalStyle = document.createElement('style');
  globalStyle.setAttribute('data-site-global', '1');
  globalStyle.textContent = [
    '#st-body, #rv-body { overflow-wrap: anywhere; word-break: break-word; }',
    '#st-body img, #rv-body img { max-width: 100%; }',
    '.content-image-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 28px 0; }',
    '.content-image-row figure { margin: 0 !important; }',
    '@media (max-width: 640px) { .content-image-row { grid-template-columns: 1fr; } }',
    '.list-card { display: grid; grid-template-columns: 272px 1fr; min-height: 210px; }',
    '@media (max-width: 900px) { .list-card { grid-template-columns: 1fr; min-height: 0; } }',
    /* ─ 상단 메뉴 드롭다운 (마우스오버 시 아래로 펼쳐짐) ─ */
    '.nav-item { position: relative; display: inline-flex; align-items: center; }',
    '.nav-submenu-wrap { position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(-6px); padding-top: 12px; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 200ms ease, transform 200ms ease; z-index: 30; }',
    '.nav-item.has-sub:hover .nav-submenu-wrap, .nav-item.has-sub:focus-within .nav-submenu-wrap { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }',
    '.nav-submenu { background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg, 12px); box-shadow: var(--shadow-md, 0 16px 32px -12px rgba(0,0,0,0.18)); }',
    '.nav-submenu-inner { display: flex; flex-direction: column; padding: 6px; min-width: 168px; }',
    '.nav-submenu-inner a { padding: 10px 18px; border-radius: 8px; font-size: 14px; color: var(--text-secondary); white-space: nowrap; text-align: center; }',
    '.nav-submenu-inner a:hover { background: var(--teal-50); color: var(--teal-700); }',
    /* ─ 히어로 오버레이 헤더 (메인페이지 전용, 스크롤 시 불투명하게 전환) ─ */
    'html.has-hero header { position: fixed; top: 0; left: 0; right: 0; width: 100%; background: linear-gradient(180deg, rgba(1,45,50,0.55) 0%, rgba(1,45,50,0.18) 100%); backdrop-filter: saturate(1.1) blur(6px); border-bottom: 1px solid rgba(255,255,255,0.14); transition: background 260ms ease, border-color 260ms ease; }',
    'html.has-hero header.is-scrolled { background: rgba(251,250,247,0.94); backdrop-filter: saturate(1.2) blur(8px); border-bottom-color: var(--border-subtle); }',
    'html.has-hero header nav > a, html.has-hero header .nav-item > a, html.has-hero header img[alt*="보아스"] { transition: color 260ms ease, filter 260ms ease; }',
    /* ─ 히어로 슬라이드 번호 표시 ─ */
    '.hero-slidenav { position: absolute; right: 40px; bottom: 40px; z-index: 6; display: flex; align-items: center; gap: 14px; padding: 10px 18px; background: rgba(1, 45, 50, 0.45); backdrop-filter: blur(6px); border-radius: 999px; color: rgba(255,255,255,0.95); font-family: var(--font-mono); font-size: 13px; font-weight: 600; }',
    '.hero-slidenav-track { position: relative; width: 90px; height: 2px; background: rgba(255,255,255,0.3); border-radius: 999px; overflow: hidden; display: inline-block; }',
    '.hero-slidenav-fill { position: absolute; inset: 0; width: 33.33%; background: rgba(255,255,255,0.95); transition: width 400ms ease; }',
    '.hero-slidenav-btn { width: 26px; height: 26px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.35); background: transparent; color: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; line-height: 1; padding: 0; }',
    '.hero-slidenav-btn:hover { background: rgba(255,255,255,0.18); }',
    '@media (max-width: 900px) { .hero-slidenav { right: 20px; bottom: 20px; padding: 8px 14px; gap: 10px; } .hero-slidenav-track { width: 56px; } }',
    '@media (max-width: 560px) { .hero-slidenav { right: 12px; bottom: 12px; } }',
    /* ─ 히어로 스크롤 유도 표시 ─ */
    '.scroll-hint { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 6; cursor: pointer; color: rgba(255,255,255,0.85); }',
    '.scroll-hint-mouse { width: 26px; height: 42px; border: 2px solid rgba(255,255,255,0.75); border-radius: 999px; display: flex; justify-content: center; padding-top: 7px; box-sizing: border-box; }',
    '.scroll-hint-dot { width: 4px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.95); animation: scrollHintMove 1.6s ease infinite; }',
    '.scroll-hint-label { font-size: 11px; letter-spacing: 0.2em; font-weight: 600; }',
    '@keyframes scrollHintMove { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(14px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }',
    '@media (max-width: 900px) { .scroll-hint { display: none; } }',
    /* ─ 푸터 3단 그리드: 모바일에서 세로로 쌓이도록 보정 (기존 반응형 규칙 누락 보완) ─ */
    '@media (max-width: 900px) { footer [style*="grid-template-columns: 1.3fr 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; } }',
    /* ─ 고객사·협력사 서브페이지 카드 그리드 ─ */
    '.company-card-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }',
    '@media (max-width: 1100px) { .company-card-grid { grid-template-columns: repeat(5, 1fr); } }',
    '@media (max-width: 900px) { .company-card-grid { grid-template-columns: repeat(3, 1fr); } }',
    '@media (max-width: 560px) { .company-card-grid { grid-template-columns: repeat(2, 1fr); } }',
    '.company-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; min-height: 150px; padding: 20px 14px; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg, 12px); color: inherit; text-align: center; }',
    '.company-card-media { width: 100%; height: 56px; display: flex; align-items: center; justify-content: center; }',
    '.company-card-media img { max-width: 100%; max-height: 100%; object-fit: contain; }',
    '.company-card-ph { width: 44px; height: 44px; border-radius: var(--radius-md); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); }',
    '.company-card-name { font-size: 13px; font-weight: 500; color: var(--text-primary); letter-spacing: -0.01em; overflow-wrap: anywhere; }',
    /* ─ 홈 이용후기 카드: 이미지/텍스트 영역 고정 비율, 카드 높이 통일 ─ */
    '.review-card { display: flex; flex-direction: column; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; color: inherit; transition: box-shadow var(--duration-base) var(--ease-out); }',
    '.review-card:hover { box-shadow: 0 8px 20px -10px rgba(0,0,0,0.18); }',
    '.review-card-media { flex: 0 0 176px; height: 176px; background-color: var(--teal-200); background-size: cover; background-position: center; background-repeat: no-repeat; }',
    '.review-card-media-ph { background: linear-gradient(135deg, var(--teal-300), var(--teal-600)); position: relative; }',
    '.review-card-media-tag { position: absolute; bottom: 10px; right: 12px; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.35); padding: 3px 8px; border-radius: 4px; }',
    '.review-card-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; padding: 22px 24px; }',
    '.review-card-title { font-size: 17px; font-weight: 600; margin: 10px 0 8px; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }',
    '.review-card-summary { font-size: 14px; line-height: 1.6; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }',
    '.review-card-meta { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--text-tertiary); }',
    '@media (max-width: 560px) { .review-card-media { flex-basis: 150px; height: 150px; } }',
    /* ─ 홈 이용후기 캐러셀: 4/3/2/1개 반응형 + 좌우 버튼이 잘리지 않도록 보정 ─ */
    '.review-carousel { overflow: visible; }',
    '.review-track { overflow: hidden; }',
    '.review-track > * { flex: 0 0 calc((100% - 60px) / 4); min-width: 0; }',
    '@media (max-width: 1200px) { .review-track > * { flex: 0 0 calc((100% - 40px) / 3); } }',
    '@media (max-width: 900px) { .review-track > * { flex: 0 0 calc((100% - 20px) / 2); } }',
    '@media (max-width: 560px) { .review-track > * { flex: 0 0 100%; } }'
  ].join('\n');
  document.head.appendChild(globalStyle);

  // ── 상단 메뉴: 서브메뉴 드롭다운 구성 ──
  function enhanceNav() {
    var navEl = document.querySelector('header nav');
    if (!navEl) return;
    navEl.classList.add('site-nav');
    navEl.style.alignItems = 'center';
    navEl.style.gap = '8px';

    var subMenus = {
      'greeting.html': [
        { href: 'greeting.html', label: '인사말 및 연혁' },
        { href: 'org.html', label: '조직도' },
        { href: 'customers.html', label: '고객사' },
        { href: 'partners.html', label: '협력사' }
      ],
      'biz-air.html': [
        { href: 'biz-air.html', label: '대기측정 및 분석' },
        { href: 'biz-equipment.html', label: '보유장비' },
        { href: 'biz-partners.html', label: '관련기관' }
      ]
    };

    Object.keys(subMenus).forEach(function (key) {
      var link = navEl.querySelector('a[href="' + key + '"]');
      if (!link) return;
      var wrap = document.createElement('div');
      wrap.className = 'nav-item has-sub';
      link.parentNode.insertBefore(wrap, link);
      wrap.appendChild(link);
      var subWrap = document.createElement('div');
      subWrap.className = 'nav-submenu-wrap';
      var sub = document.createElement('div');
      sub.className = 'nav-submenu';
      var inner = document.createElement('div');
      inner.className = 'nav-submenu-inner';
      subMenus[key].forEach(function (item) {
        var a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        inner.appendChild(a);
      });
      sub.appendChild(inner);
      subWrap.appendChild(sub);
      wrap.appendChild(subWrap);
    });

    // 기존 홈페이지 비율에 맞춘 메뉴 글씨 크기 보정 (카카오 버튼 포함, 높이를 통일)
    Array.prototype.forEach.call(navEl.querySelectorAll(':scope > a, .nav-item > a'), function (a) {
      if (a.href.indexOf('pf.kakao.com') === -1) {
        a.style.fontSize = '16px';
        a.style.padding = '13px 18px';
        a.style.lineHeight = '1';
        a.style.boxSizing = 'border-box';
      }
    });
    var kakaoBtn = navEl.querySelector('a[href*="pf.kakao.com"]');
    if (kakaoBtn) {
      kakaoBtn.style.fontSize = '15px';
      kakaoBtn.style.padding = '13px 22px';
      kakaoBtn.style.lineHeight = '1';
      kakaoBtn.style.boxSizing = 'border-box';
    }

    var logo = document.querySelector('header img[alt*="보아스"]');
    if (logo) logo.style.height = '128px';

    var headerBar = document.querySelector('header .container');
    if (headerBar) {
      headerBar.style.paddingTop = '22px';
      headerBar.style.paddingBottom = '22px';
    }
  }
  enhanceNav();

  // ── 히어로 오버레이 헤더: 스크롤 시 배경/글씨색 전환 (메인페이지 전용) ──
  function enhanceHeroHeader() {
    var hero = document.getElementById('home');
    var header = document.querySelector('header');
    if (!hero || !header) return;
    document.documentElement.classList.add('has-hero');
    var navLinkEls = Array.prototype.filter.call(
      header.querySelectorAll('nav > a, .nav-item > a'),
      function (a) { return a.href.indexOf('pf.kakao.com') === -1; }
    );
    var logo = header.querySelector('img[alt*="보아스"]');
    function onScroll() {
      var scrolled = window.scrollY > 60;
      header.classList.toggle('is-scrolled', scrolled);
      navLinkEls.forEach(function (a) {
        a.style.color = scrolled ? '' : 'rgba(255,255,255,0.95)';
      });
      if (logo) logo.style.filter = scrolled ? '' : 'brightness(0) invert(1)';
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  enhanceHeroHeader();

  // ── 히어로 영역 스크롤 유도 표시 추가 (메인페이지) ──
  function addScrollHint() {
    var hero = document.getElementById('home');
    if (!hero) return;
    var hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.setAttribute('role', 'button');
    hint.setAttribute('aria-label', '아래로 스크롤');
    hint.innerHTML = '<span class="scroll-hint-mouse"><span class="scroll-hint-dot"></span></span><span class="scroll-hint-label">SCROLL</span>';
    hero.appendChild(hint);
    hint.addEventListener('click', function () {
      var next = hero.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }
  addScrollHint();

  // ── 유틸: 별점 문자열 ──
  function starsFor(rating) {
    var r = Math.round(rating);
    return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r);
  }
  function fmtDate(d) {
    if (!d) return '';
    return d.replace(/-/g, '.');
  }

  // ── 일반 텍스트 본문 → 문단 HTML (폴백용) ──
  function renderPlainBody(text) {
    if (!text) return '';
    var blocks = text.split(/\n\s*\n/);
    return blocks.map(function (block) {
      block = block.trim();
      if (!block) return '';
      return '<p style="margin: 0 0 20px; color: var(--text-secondary); overflow-wrap: anywhere; word-break: break-word;">' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  // ── 사진 블록 하나 → HTML (forceAspect: 2단 배치용 비율 고정) ──
  function imageBlockHTML(block, forceAspect) {
    if (!block || !block.img) return '';
    var imgStyle = 'width: 100%; height: auto; border-radius: var(--radius-xl); display: block;';
    if (forceAspect) imgStyle += ' aspect-ratio: 4 / 3; object-fit: cover;';
    return '<figure style="margin: ' + (forceAspect ? '0' : '28px 0') + ';">' +
      '<img src="' + block.img + '" alt="' + (block.caption || '') + '" loading="lazy" style="' + imgStyle + '">' +
      (block.caption ? '<figcaption style="margin-top: 8px; font-size: 13px; color: var(--text-tertiary); text-align: center; overflow-wrap: anywhere;">' + block.caption + '</figcaption>' : '') +
      '</figure>';
  }

  // ── 글/사진 블록 목록 → HTML (연속된 사진 2장은 양옆으로 배치) ──
  function renderContentBlocks(blocks, fallbackText) {
    if (!blocks || !blocks.length) {
      return renderPlainBody(fallbackText || '');
    }
    var html = '';
    var i = 0;
    while (i < blocks.length) {
      var block = blocks[i];
      if (!block) { i++; continue; }
      if (block.type === 'image') {
        var group = [block];
        var j = i + 1;
        while (j < blocks.length && blocks[j] && blocks[j].type === 'image' && group.length < 2) {
          group.push(blocks[j]);
          j++;
        }
        if (group.length === 2) {
          html += '<div class="content-image-row">' + group.map(function (b) { return imageBlockHTML(b, true); }).join('') + '</div>';
        } else {
          html += imageBlockHTML(group[0], false);
        }
        i = j;
        continue;
      }
      if (block.type === 'text') {
        if (block.value) {
          html += '<p style="margin: 0 0 20px; color: var(--text-secondary); overflow-wrap: anywhere; word-break: break-word;">' + block.value.replace(/\n/g, '<br>') + '</p>';
        }
        i++;
        continue;
      }
      i++;
    }
    return html;
  }

  // ── 홈 캐러셀 카드 HTML (이미지 영역 고정 높이 + 텍스트 영역 flex로 카드 높이 통일) ──
  function homeCardHTML(r) {
    var media = r.image
      ? '<div class="review-card-media" style="background-image: url(' + r.image + ');"></div>'
      : '<div class="review-card-media review-card-media-ph"><span class="review-card-media-tag">REVIEW PHOTO</span></div>';
    return '' +
      '<a href="review-detail.html?id=' + encodeURIComponent(r.id) + '" class="review-card">' +
        media +
        '<div class="review-card-body">' +
          '<div style="display:flex; align-items:center; gap:8px;">' +
            '<span style="font-family: var(--font-mono); font-size: 16px; font-weight: 700; color: var(--teal-700);">' + r.rating.toFixed(1) + '</span>' +
            '<span style="letter-spacing: 2px; color: var(--warn); font-size: 15px;">' + starsFor(r.rating) + '</span>' +
          '</div>' +
          '<h3 class="review-card-title">' + r.title + '</h3>' +
          '<p class="review-card-summary">' + r.summary + '</p>' +
          '<div class="review-card-meta">' +
            '<span><span style="color: var(--text-primary); font-weight: 500;">' + r.author + '</span> · ' + r.industry + '</span>' +
            '<span style="font-family: var(--font-mono);">' + fmtDate(r.date) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  // ── 목록 페이지 카드 HTML (가로형, 썸네일 확대) ──
  function listCardHTML(r) {
    var imgArea = r.image
      ? '<div style="width: 100%; height: 100%; min-height: 210px; background-color: var(--teal-200); background-image: url(' + r.image + '); background-size: cover; background-position: center;"></div>'
      : '<div style="min-height: 210px; background: linear-gradient(135deg, var(--teal-300), var(--teal-600)); display: flex; align-items: center; justify-content: center; color: var(--gray-0);">' +
          '<svg fill="none" height="56" stroke="currentColor" stroke-width="1.25" style="opacity:0.7" viewBox="0 0 24 24" width="56"><rect height="14" rx="2" width="18" x="3" y="4"></rect><path d="M7 8h4M7 12h6M15 8h2M15 12h2"></path></svg>' +
        '</div>';
    return '' +
      '<a href="review-detail.html?id=' + encodeURIComponent(r.id) + '" style="display: block; color: inherit;">' +
        '<article class="card list-card" style="overflow: hidden; height: 100%;">' +
          imgArea +
          '<div style="padding: 28px 32px; display: flex; flex-direction: column;">' +
            '<div style="display:flex; align-items:center; gap:9px;">' +
              '<span style="font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: var(--teal-700);">' + r.rating.toFixed(1) + '</span>' +
              '<span style="letter-spacing: 2px; color: var(--warn); font-size: 17px;">' + starsFor(r.rating) + '</span>' +
            '</div>' +
            '<h3 style="font-size: 20px; font-weight: 600; margin: 12px 0; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary);">' + r.title + '</h3>' +
            '<p style="font-size: 15.5px; line-height: 1.7; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + r.summary + '</p>' +
            '<div style="margin-top: auto; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-tertiary);">' +
              '<span>' + r.author + ' · ' + r.industry + '</span>' +
              '<span style="font-family: var(--font-mono);">' + fmtDate(r.date) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</a>';
  }

  function loadReviews() {
    return fetch('data/reviews.json').then(function (res) { return res.json(); }).then(function (data) { return data.reviews || data; });
  }

  // ── 1. 홈 이용후기 캐러셀 (JSON 기반) ──
  var homeTrack = document.getElementById('home-review-track');
  if (homeTrack) {
    loadReviews().then(function (reviews) {
      var sorted = reviews.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      homeTrack.innerHTML = sorted.map(homeCardHTML).join('');
      initReviewCarousel();
    }).catch(function (e) { console.error('리뷰 로드 실패', e); });
  }

  function initReviewCarousel() {
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
        if (w <= 1200) return 3;
        return 4;
      }
      function maxPos() { return Math.max(0, track.children.length - perView()); }
      function update() {
        var pv = perView();
        pos = Math.min(pos, maxPos());
        var gap = 20;
        var trackWidth = track.getBoundingClientRect().width;
        var cardW = (trackWidth - gap * (pv - 1)) / pv;
        track.style.transform = 'translateX(-' + (pos * (cardW + gap)) + 'px)';
        prev.disabled = pos <= 0;
        next.disabled = pos >= maxPos();
      }
      prev.onclick = function () { if (pos > 0) { pos--; update(); } };
      next.onclick = function () { if (pos < maxPos()) { pos++; update(); } };
      window.addEventListener('resize', update);
      update();
      window.addEventListener('load', update);
    });
  }

  // ── 2. 이용후기 목록 페이지 (전체보기) ──
  var listContainer = document.getElementById('rv-list-container');
  if (listContainer) {
    loadReviews().then(function (reviews) {
      var totalEl = document.getElementById('rv-total-count');
      var avgEl = document.getElementById('rv-avg-rating');
      if (totalEl) totalEl.textContent = reviews.length;
      if (avgEl) {
        var avg = reviews.reduce(function (s, r) { return s + r.rating; }, 0) / (reviews.length || 1);
        avgEl.textContent = avg.toFixed(1);
      }
      function render(list) {
        listContainer.innerHTML = list.map(listCardHTML).join('');
      }
      function sortList(mode) {
        var list = reviews.slice();
        if (mode === '별점높은순') list.sort(function (a, b) { return b.rating - a.rating; });
        else if (mode === '별점낮은순') list.sort(function (a, b) { return a.rating - b.rating; });
        else list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        render(list);
      }
      sortList('최신순');
      var sel = document.getElementById('rv-sort-select');
      if (sel) {
        sel.addEventListener('change', function () { sortList(sel.value); });
      }
    }).catch(function (e) { console.error('리뷰 목록 로드 실패', e); });
  }

  // ── 3. 이용후기 상세 페이지 ──
  var rvTitleEl = document.getElementById('rv-title');
  if (rvTitleEl) {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || '1';
    loadReviews().then(function (reviews) {
      var r = reviews.find(function (x) { return String(x.id) === String(id); }) || reviews[0];
      if (!r) return;
      document.getElementById('rv-title').textContent = r.title;
      document.getElementById('rv-rating').textContent = r.rating.toFixed(1);
      document.getElementById('rv-stars').textContent = starsFor(r.rating);
      document.getElementById('rv-author').textContent = r.author;
      document.getElementById('rv-industry').textContent = r.industry;
      document.getElementById('rv-region').textContent = r.region;
      document.getElementById('rv-date').textContent = fmtDate(r.date);
      var imgBox = document.getElementById('rv-image');
      if (imgBox) {
        if (r.image) {
          imgBox.style.backgroundColor = 'var(--teal-50)';
          imgBox.style.backgroundImage = 'url(' + r.image + ')';
          imgBox.style.backgroundSize = 'contain';
          imgBox.style.backgroundRepeat = 'no-repeat';
          imgBox.style.backgroundPosition = 'center';
        } else {
          imgBox.hidden = true;
        }
      }
      var bodyEl = document.getElementById('rv-body');
      bodyEl.innerHTML = renderContentBlocks(r.content, r.body || r.summary);
      var replyBlock = document.getElementById('rv-reply-block');
      if (r.reply && r.reply.trim()) {
        document.getElementById('rv-reply-text').textContent = r.reply;
        document.getElementById('rv-reply-date').textContent = fmtDate(r.replyDate);
        replyBlock.hidden = false;
      } else if (replyBlock) {
        replyBlock.hidden = true;
      }
      document.title = r.title + ' - BZ 이용후기';
    }).catch(function (e) { console.error('리뷰 상세 로드 실패', e); });
  }

  // ─── 히어로 슬라이더 (메인 페이지) ───
  var slides = document.querySelectorAll('#home .hero-slide');
  var slidenav = document.querySelector('.hero-slidenav');
  if (slides.length > 1) {
    var idx = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('active')) idx = i;
    }
    var timer = null;
    var navCurrentEl = slidenav ? slidenav.querySelector('.hero-slidenav-current') : null;
    var navTotalEl = slidenav ? slidenav.querySelector('.hero-slidenav-total') : null;
    var navFillEl = slidenav ? slidenav.querySelector('.hero-slidenav-fill') : null;
    function pad2(n) { return n < 10 ? '0' + n : String(n); }
    if (navTotalEl) navTotalEl.textContent = pad2(slides.length);
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      if (navCurrentEl) navCurrentEl.textContent = pad2(idx + 1);
      if (navFillEl) navFillEl.style.width = ((idx + 1) / slides.length * 100) + '%';
    }
    function restartTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { show(idx + 1); }, 5000);
    }
    if (slidenav) {
      Array.prototype.forEach.call(slidenav.querySelectorAll('.hero-slidenav-btn'), function (btn) {
        btn.addEventListener('click', function () {
          show(idx + parseInt(btn.getAttribute('data-dir'), 10));
          restartTimer();
        });
      });
    }
    show(idx);
    restartTimer();
  }

  // ─── 보유장비 탭 (측정장비 / 분석장비) ───
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

  // ═══════════════ BZ STORY (소식) ═══════════════
  function loadStories() {
    return fetch('data/stories.json').then(function (res) { return res.json(); }).then(function (data) { return data.stories || data; });
  }
  var catMap = { '환경뉴스': 'env', '회사소식': 'company' };

  function storyCardHTML(s) {
    var cat = catMap[s.category] || 'env';
    var imgArea = s.image
      ? '<div style="aspect-ratio: 16 / 11; position: relative; background-color: var(--teal-200); background-image: url(' + s.image + '); background-size: cover; background-position: center;">'
      : '<div style="aspect-ratio: 16 / 11; background: linear-gradient(135deg, var(--teal-100), var(--teal-300)); position: relative;">';
    return '' +
      '<a class="story-card" data-story-cat="' + cat + '" href="story-detail.html?id=' + encodeURIComponent(s.id) + '" style="display: block; color: inherit;">' +
        '<article class="card" style="overflow: hidden; height: 100%; transition: box-shadow var(--duration-base) var(--ease-out);">' +
          imgArea +
            '<div style="position: absolute; top: 14px; left: 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: var(--teal-800); background: rgba(255, 255, 255, 0.92); padding: 4px 10px; border-radius: var(--radius-pill);">' + s.category + '</div>' +
          '</div>' +
          '<div style="padding: 26px 28px 28px;">' +
            '<h3 style="font-size: 19px; font-weight: 600; margin: 0px 0px 12px; line-height: 1.45; letter-spacing: -0.01em; color: var(--text-primary);">' + s.title + '</h3>' +
            '<p style="font-size: 14.5px; line-height: 1.65; color: var(--text-secondary); margin: 0 0 18px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + s.summary + '</p>' +
            '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: var(--text-tertiary);">' +
              '<span style="font-family: var(--font-mono);">' + fmtDate(s.date) + '</span>' +
              '<span>조회 ' + s.views + '</span>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</a>';
  }

  // ── 목록 페이지 ──
  var stListContainer = document.getElementById('st-list-container');
  if (stListContainer) {
    loadStories().then(function (stories) {
      var totalEl = document.getElementById('st-total-count');
      if (totalEl) totalEl.textContent = stories.length;
      var sorted = stories.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      stListContainer.innerHTML = sorted.map(storyCardHTML).join('');

      var storyFilterBtns = document.querySelectorAll('.story-filter-btn');
      storyFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var filter = btn.getAttribute('data-filter');
          storyFilterBtns.forEach(function (b) {
            var isActive = b === btn;
            b.classList.toggle('active', isActive);
            if (isActive) {
              b.style.background = 'var(--teal-700)';
              b.style.color = 'var(--gray-0)';
              b.style.borderColor = 'var(--teal-700)';
            } else {
              b.style.background = '';
              b.style.color = '';
              b.style.borderColor = '';
            }
          });
          document.querySelectorAll('.story-card').forEach(function (card) {
            var cat = card.getAttribute('data-story-cat');
            var show = (filter === 'all' || filter === cat);
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }).catch(function (e) { console.error('소식 목록 로드 실패', e); });
  }

  // ── 상세 페이지 ──
  var stTitleEl = document.getElementById('st-title');
  if (stTitleEl) {
    var stParams = new URLSearchParams(window.location.search);
    var stId = stParams.get('id') || '1';
    loadStories().then(function (stories) {
      var sorted = stories.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
      var idx = sorted.findIndex(function (x) { return String(x.id) === String(stId); });
      var s = idx >= 0 ? sorted[idx] : sorted[0];
      if (!s) return;

      document.getElementById('st-category').textContent = s.category;
      document.getElementById('st-title').textContent = s.title;
      document.getElementById('st-date').textContent = fmtDate(s.date);
      document.getElementById('st-views').textContent = s.views;
      var stImgBox = document.getElementById('st-image');
      if (stImgBox) {
        if (s.image) {
          stImgBox.style.backgroundColor = 'var(--teal-50)';
          stImgBox.style.backgroundImage = 'url(' + s.image + ')';
          stImgBox.style.backgroundSize = 'contain';
          stImgBox.style.backgroundRepeat = 'no-repeat';
          stImgBox.style.backgroundPosition = 'center';
        } else {
          stImgBox.hidden = true;
        }
      }
      var bodyEl = document.getElementById('st-body');
      bodyEl.innerHTML = renderContentBlocks(s.content, s.body || s.summary);

      var prevS = sorted[idx - 1];
      var nextS = sorted[idx + 1];
      var prevLink = document.getElementById('st-prev-link');
      var nextLink = document.getElementById('st-next-link');
      if (prevS) {
        prevLink.href = 'story-detail.html?id=' + encodeURIComponent(prevS.id);
        document.getElementById('st-prev-title').textContent = prevS.title;
      } else if (prevLink) { prevLink.style.display = 'none'; }
      if (nextS) {
        nextLink.href = 'story-detail.html?id=' + encodeURIComponent(nextS.id);
        document.getElementById('st-next-title').textContent = nextS.title;
      } else if (nextLink) { nextLink.style.display = 'none'; }

      document.title = s.title + ' - BZ STORY';
    }).catch(function (e) { console.error('소식 상세 로드 실패', e); });
  }

  // ═══════════════ 고객사 · 협력사 (JSON 기반, 메인페이지 + 서브페이지 공용) ═══════════════
  var companyPlaceholderIcon = '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"><rect height="14" rx="2" width="18" x="3" y="4"></rect><circle cx="9" cy="10" r="1.4"></circle><path d="m3 16 5-4 4 3 3-2 6 5"></path></svg>';

  function loadCompanies(file, key) {
    return fetch(file).then(function (res) { return res.json(); }).then(function (data) { return data[key] || data; });
  }

  function visibleCompanies(items, mainOnly) {
    return items
      .filter(function (i) { return i.visible !== false && (!mainOnly || i.showOnMain !== false); })
      .slice()
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  // 메인페이지 셀 HTML — 기존 하드코딩 그리드와 동일한 마크업/스타일 재사용
  function mainCompanyCellHTML(item) {
    var mediaHTML = item.logo
      ? '<div style="width: 64px; height: 64px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;"><img src="' + item.logo + '" alt="' + item.name + '" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>'
      : '<div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--gray-0); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); margin-bottom: 10px;">' + companyPlaceholderIcon + '</div>';
    var bg = item.logo ? '' : 'background: repeating-linear-gradient(45deg, var(--gray-50), var(--gray-50) 8px, var(--gray-0) 8px, var(--gray-0) 16px);';
    var inner = '<div style="min-height: 148px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 20px; ' + bg + '">' +
        mediaHTML +
        '<div style="color: var(--text-primary); font-size: 13px; font-weight: 500; text-align: center; letter-spacing: -0.01em;">' + item.name + '</div>' +
      '</div>';
    return item.url
      ? '<a href="' + item.url + '" target="_blank" rel="noopener" style="display: block; color: inherit;">' + inner + '</a>'
      : inner;
  }

  // 고객사/협력사 서브페이지 카드 HTML
  function companyCardHTML(item) {
    var mediaHTML = item.logo
      ? '<img src="' + item.logo + '" alt="' + item.name + '" loading="lazy">'
      : '<span class="company-card-ph">' + companyPlaceholderIcon + '</span>';
    var inner = '<div class="company-card-media">' + mediaHTML + '</div><div class="company-card-name">' + item.name + '</div>';
    return item.url
      ? '<a class="company-card" href="' + item.url + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<div class="company-card">' + inner + '</div>';
  }

  function renderCompanyGrid(containerId, file, key, mainOnly, cellFn) {
    var el = document.getElementById(containerId);
    if (!el) return;
    loadCompanies(file, key).then(function (items) {
      el.innerHTML = visibleCompanies(items, mainOnly).map(cellFn).join('');
    }).catch(function (e) { console.error(file + ' 로드 실패', e); });
  }

  renderCompanyGrid('home-customers-grid', 'data/customers.json', 'customers', true, mainCompanyCellHTML);
  renderCompanyGrid('home-partners-grid', 'data/partners.json', 'partners', true, mainCompanyCellHTML);
  renderCompanyGrid('customers-grid', 'data/customers.json', 'customers', false, companyCardHTML);
  renderCompanyGrid('partners-grid', 'data/partners.json', 'partners', false, companyCardHTML);
})();
