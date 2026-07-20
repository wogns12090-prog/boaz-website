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
    '.company-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 220px; padding: 22px 16px; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg, 12px); color: inherit; text-align: center; }',
    '.company-card-media { width: 100%; height: 112px; display: flex; align-items: center; justify-content: center; background: var(--gray-50); border-radius: var(--radius-md, 8px); padding: 10px; box-sizing: border-box; }',
    '.company-card-media img { max-width: 100%; max-height: 100%; object-fit: contain; }',
    '.company-card-ph { width: 52px; height: 52px; border-radius: var(--radius-md); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); }',
    '.company-card-name { font-size: 13px; font-weight: 500; color: var(--text-primary); letter-spacing: -0.01em; overflow-wrap: anywhere; }',
    /* ─ 메인 고객사·협력사 10개 슬라이더(페이지당 최대 5×2) ─ */
    '.company-slide-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0px; background: var(--gray-0); }',
    '@media (max-width: 1100px) { .company-slide-grid { grid-template-columns: repeat(4, 1fr); } }',
    '@media (max-width: 900px) { .company-slide-grid { grid-template-columns: repeat(3, 1fr); } }',
    '@media (max-width: 560px) { .company-slide-grid { grid-template-columns: repeat(2, 1fr); } }',
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
    /* ─ 홈 미니 캐러셀(이용후기/최근소식) 공통: fade+슬라이드 전환, 좌우 버튼 안 잘림 ─ */
    '.review-carousel { position: relative; overflow: visible; }',
    '.review-track { display: flex; overflow: hidden; }',
    '.review-track > * { min-width: 0; }',
    /* ─ 등록증 및 인증서 카드 + 확대보기 모달 ─ */
    '.cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }',
    '.cert-card { all: unset; cursor: zoom-in; display: block; text-align: left; width: 100%; box-sizing: border-box; border-radius: var(--radius-xl); background: var(--gray-0); border: 1px solid var(--border-subtle); overflow: hidden; transition: box-shadow 160ms ease, transform 160ms ease; }',
    '.cert-card:hover { box-shadow: 0 10px 24px -12px rgba(0,0,0,0.22); transform: translateY(-2px); }',
    '.cert-card-thumb { aspect-ratio: 3 / 4; background: var(--gray-50); overflow: hidden; }',
    '.cert-card-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }',
    '.cert-card-body { padding: 16px 18px 18px; }',
    '.cert-card-title { font-size: 14.5px; font-weight: 600; letter-spacing: -0.01em; color: var(--text-primary); }',
    '.cert-card-hint { font-size: 12px; color: var(--text-tertiary); margin-top: 4px; }',
    '.cert-modal-overlay { position: fixed; inset: 0; background: rgba(1,20,22,0.82); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 40px 20px; opacity: 0; pointer-events: none; transition: opacity 200ms ease; }',
    '.cert-modal-overlay.open { opacity: 1; pointer-events: auto; }',
    '.cert-modal-panel { max-width: 880px; max-height: 88vh; width: 100%; background: var(--gray-0); border-radius: var(--radius-xl); overflow: hidden; display: flex; flex-direction: column; }',
    '.cert-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--border-subtle); }',
    '.cert-modal-title { font-size: 15px; font-weight: 700; color: var(--text-primary); }',
    '.cert-modal-actions { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }',
    '.cert-modal-pdf-link { font-size: 13px; color: var(--teal-700); font-weight: 600; white-space: nowrap; }',
    '.cert-modal-close { cursor: pointer; background: none; border: none; font-size: 22px; line-height: 1; color: var(--text-tertiary); padding: 4px; }',
    '.cert-modal-close:hover { color: var(--text-primary); }',
    '.cert-modal-body { overflow: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; align-items: center; background: var(--gray-50); }',
    '.cert-modal-body img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }',
    '@media (max-width: 560px) { .cert-modal-overlay { padding: 0; } .cert-modal-panel { max-height: 100vh; height: 100%; border-radius: 0; } }',
    /* ─ 보유장비 카드: 기존 홈페이지(boazet.com) 비율 기준 재설계 ─ */
    '.eq-panel { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }',
    '@media (max-width: 760px) { .eq-panel { grid-template-columns: 1fr; } }',
    '.eq-card { display: flex; overflow: hidden; }',
    '.eq-card-img { flex: 0 0 168px; width: 168px; height: 168px; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--border-subtle); background: var(--gray-50); overflow: hidden; }',
    '.eq-card-img img { width: 100%; height: 100%; object-fit: contain; padding: 18px; box-sizing: border-box; }',
    '@media (max-width: 560px) { .eq-card-img { flex: 0 0 120px; width: 120px; height: 120px; } .eq-card-img img { padding: 12px; } }',
    '.eq-card-body { padding: 20px 22px; display: flex; flex-direction: column; justify-content: center; min-width: 0; }',
    '.eq-card-model { font-family: var(--font-mono); font-size: 21px; font-weight: 700; letter-spacing: -0.01em; color: var(--teal-700); }',
    '.eq-card-mfr { font-size: 12px; color: var(--text-tertiary); margin-top: 5px; }',
    '.eq-card-name { font-size: 15.5px; font-weight: 700; margin: 9px 0 0; letter-spacing: -0.01em; color: var(--text-primary); line-height: 1.4; }',
    '.eq-card-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin: 8px 0 0; }',
    /* ─ 제작·관리용 안내 문구는 방문자 화면에 노출하지 않음 (관리자 CMS 기능 자체는 유지) ─ */
    /* ─ 새로 추가되는 카드 fade-in ─ */
    '@keyframes fadeInUpCard { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }',
    '.fade-in-card { animation: fadeInUpCard 380ms ease both; }',
    /* ─ 헤더 로고: 태블릿/모바일 반응형 크기(1.7배 강제 아님) ─ */
    '@media (max-width: 900px) { header img[alt*="보아스"] { height: 92px !important; } }',
    '@media (max-width: 560px) { header img[alt*="보아스"] { height: 72px !important; } }',
    /* ─ BZ STORY 페이지네이션 버튼 ─ */
    '.st-page-btn { min-width: 36px; height: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; color: var(--text-primary); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 13px; cursor: pointer; background: none; border: none; transition: background 140ms; }',
    '.st-page-btn:hover { background: var(--teal-50); }',
    '.st-page-btn.active { background: var(--teal-700); color: var(--gray-0); font-weight: 600; }',
    '.st-page-arrow { padding: 8px 12px; font-size: 13px; color: var(--text-primary); cursor: pointer; background: none; border: none; }',
    '.st-page-arrow[disabled] { color: var(--text-tertiary); opacity: 0.4; cursor: not-allowed; }',
    '#st-list-container { transition: opacity 200ms ease; }'
  ].join('\n');
  document.head.appendChild(globalStyle);

  // ── 상단 메뉴: 서브메뉴 드롭다운 구성 ──
  function enhanceNav() {
    var navEl = document.querySelector('header nav');
    if (!navEl) return;
    navEl.classList.add('site-nav');
    navEl.style.alignItems = 'center';
    navEl.style.gap = '14px';

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

    applyHeaderScale();
    window.addEventListener('resize', debounce(applyHeaderScale, 120));
  }

  // 로고·메뉴를 데스크톱 기준 약 1.7배로 확대. 폭이 좁아지면 겹치거나 줄바꿈되지
  // 않도록 구간별로 자연스럽게 줄어드는 크기를 사용한다(태블릿/모바일에 1.7배를 강제하지 않음).
  function applyHeaderScale() {
    var navEl = document.querySelector('header nav.site-nav');
    var headerBar = document.querySelector('header .container');
    var logo = document.querySelector('header img[alt*="보아스"]');
    if (!navEl || !headerBar) return;
    var w = window.innerWidth;
    var t; // { linkFont, linkPad, kakaoFont, kakaoPad, logoH, gap, barPad }
    if (w >= 1500) {
      t = { linkFont: 19, linkPad: '9px 16px', kakaoFont: 17, kakaoPad: '9px 18px', logoH: 130, gap: 12, barPad: 8 };
    } else if (w >= 1200) {
      t = { linkFont: 16, linkPad: '7px 12px', kakaoFont: 15, kakaoPad: '7px 14px', logoH: 108, gap: 8, barPad: 7 };
    } else if (w >= 900) {
      t = { linkFont: 13, linkPad: '6px 9px', kakaoFont: 12, kakaoPad: '6px 10px', logoH: 88, gap: 6, barPad: 7 };
    } else {
      return; // 900px 미만은 기존 규칙대로 메뉴 자체가 숨겨지므로 손대지 않음
    }

    Array.prototype.forEach.call(navEl.querySelectorAll(':scope > a, .nav-item > a'), function (a) {
      if (a.href.indexOf('pf.kakao.com') === -1) {
        a.style.fontSize = t.linkFont + 'px';
        a.style.padding = t.linkPad;
        a.style.lineHeight = '1';
        a.style.boxSizing = 'border-box';
      }
    });
    var kakaoBtn = navEl.querySelector('a[href*="pf.kakao.com"]');
    if (kakaoBtn) {
      kakaoBtn.style.fontSize = t.kakaoFont + 'px';
      kakaoBtn.style.padding = t.kakaoPad;
      kakaoBtn.style.lineHeight = '1';
      kakaoBtn.style.boxSizing = 'border-box';
      var kakaoSvg = kakaoBtn.querySelector('svg');
      if (kakaoSvg) {
        var s = Math.round(t.kakaoFont * 0.65 + 8);
        kakaoSvg.setAttribute('width', s);
        kakaoSvg.setAttribute('height', s);
      }
    }
    navEl.style.gap = t.gap + 'px';
    if (logo) logo.style.height = t.logoH + 'px';
    headerBar.style.paddingTop = t.barPad + 'px';
    headerBar.style.paddingBottom = t.barPad + 'px';
    // 좁은 본문 컨테이너 폭(container-wide)에 갇혀 줄바꿈되지 않도록 헤더만 더 넓게 사용
    headerBar.style.maxWidth = 'none';
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

  // ── 별점 정보가 없는 후기(예: 이관된 원본 후기)는 별점 줄 자체를 생략 ──
  function ratingRowHTML(r, scoreSize, starSize) {
    if (r.rating === undefined || r.rating === null || r.rating === '') return '';
    return '<div style="display:flex; align-items:center; gap:9px;">' +
      '<span style="font-family: var(--font-mono); font-size: ' + scoreSize + 'px; font-weight: 700; color: var(--teal-700);">' + Number(r.rating).toFixed(1) + '</span>' +
      '<span style="letter-spacing: 2px; color: var(--warn); font-size: ' + starSize + 'px;">' + starsFor(r.rating) + '</span>' +
    '</div>';
  }

  // ── 업종이 없는 후기는 " · " 구분자 없이 작성자만 표시 ──
  function authorLineHTML(r) {
    var extra = [r.industry, r.region].filter(function (v) { return v; }).join(' · ');
    return '<span style="color: var(--text-primary); font-weight: 500;">' + r.author + '</span>' + (extra ? ' · ' + extra : '');
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

  // ── 사진 블록 하나 → HTML (forceAspect: 2단 배치용, 잘리지 않도록 contain 사용) ──
  function imageBlockHTML(block, forceAspect) {
    if (!block || !block.img) return '';
    var img = '<img src="' + block.img + '" alt="' + (block.caption || '') + '" loading="lazy" style="' +
      (forceAspect
        ? 'max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;'
        : 'width: 100%; height: auto; border-radius: var(--radius-xl); display: block;') +
      '">';
    // 2장 나란히 배치 시에도 이미지 원본이 잘리지 않도록 contain + 중립 배경 박스로 감싸 레터박스 처리
    var mediaHTML = forceAspect
      ? '<div style="aspect-ratio: 4 / 3; background: var(--gray-50); border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; overflow: hidden;">' + img + '</div>'
      : img;
    return '<figure style="margin: ' + (forceAspect ? '0' : '28px 0') + ';">' +
      mediaHTML +
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
          ratingRowHTML(r, 16, 15) +
          '<h3 class="review-card-title">' + r.title + '</h3>' +
          '<p class="review-card-summary">' + r.summary + '</p>' +
          '<div class="review-card-meta">' +
            '<span>' + authorLineHTML(r) + '</span>' +
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
            ratingRowHTML(r, 18, 17) +
            '<h3 style="font-size: 20px; font-weight: 600; margin: 12px 0; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary);">' + r.title + '</h3>' +
            '<p style="font-size: 15.5px; line-height: 1.7; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + r.summary + '</p>' +
            '<div style="margin-top: auto; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-tertiary);">' +
              '<span>' + authorLineHTML(r) + '</span>' +
              '<span style="font-family: var(--font-mono);">' + fmtDate(r.date) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</a>';
  }

  function loadReviews() {
    return fetch('data/reviews.json').then(function (res) { return res.json(); }).then(function (data) { return data.reviews || data; });
  }

  // ── 공용: 무한 순환 미니 캐러셀 (이용후기/최근소식 등에서 재사용) ──
  // 화면 폭에 맞춰 N개를 보여주고, 화살표를 누르면 1개씩 이동. 끝에 닿아도 처음/끝으로 자연스럽게 순환.
  function debounce(fn, ms) {
    var t = null;
    return function () {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }

  function createInfiniteCarousel(opts) {
    // opts: { track, items, renderFn, perViewFn, gap }
    // 전체 트랙이 아닌, 카드 1개 단위로 실제 좌우 이동(transform) + 나가는/들어오는 카드 1개만 페이드
    var track = opts.track;
    var items = opts.items;
    var n = items.length;
    if (!track || !n) return null;
    var wrap = track.closest('.review-carousel') || track.parentElement;
    var prevBtn = wrap ? wrap.querySelector('.carousel-btn.prev') : null;
    var nextBtn = wrap ? wrap.querySelector('.carousel-btn.next') : null;
    var gap = opts.gap || 20;
    var start = 0;
    var animating = false;

    function perView() { return Math.max(1, Math.min(opts.perViewFn(), n)); }

    function makeCard(item, pv) {
      var holder = document.createElement('div');
      holder.innerHTML = opts.renderFn(item);
      var el = holder.firstElementChild;
      el.style.flex = '0 0 calc((100% - ' + (gap * (pv - 1)) + 'px) / ' + pv + ')';
      el.style.minWidth = '0';
      return el;
    }

    function paint() {
      var pv = perView();
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      track.innerHTML = '';
      for (var i = 0; i < pv; i++) track.appendChild(makeCard(items[(start + i + n) % n], pv));
      var loopable = n > pv;
      if (prevBtn) prevBtn.style.display = loopable ? '' : 'none';
      if (nextBtn) nextBtn.style.display = loopable ? '' : 'none';
    }

    function move(dir) {
      if (animating) return; // 빠른 연속 클릭 시 카드가 겹치거나 사라지지 않도록 잠금
      var pv = perView();
      if (n <= pv) return;
      animating = true;

      var pv2 = pv;
      var incomingIdx = dir > 0 ? (start + pv2 + n) % n : (start - 1 + n) % n;
      var incomingEl = makeCard(items[incomingIdx], pv2);
      incomingEl.style.opacity = '0';

      var refWidth = track.children[0].getBoundingClientRect().width;
      var unit = refWidth + gap;

      if (dir > 0) {
        track.appendChild(incomingEl);
        var outgoingEl = track.children[0];
        outgoingEl.style.transition = 'opacity 420ms ease';
        outgoingEl.style.opacity = '0';
        requestAnimationFrame(function () {
          track.style.transition = 'transform 420ms cubic-bezier(0.22,0.61,0.36,1)';
          track.style.transform = 'translateX(-' + unit + 'px)';
          requestAnimationFrame(function () {
            incomingEl.style.transition = 'opacity 420ms ease';
            incomingEl.style.opacity = '1';
          });
        });
      } else {
        track.insertBefore(incomingEl, track.firstChild);
        var outgoingEl2 = track.children[track.children.length - 1];
        outgoingEl2.style.transition = 'opacity 420ms ease';
        outgoingEl2.style.opacity = '0';
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + unit + 'px)';
        void track.offsetWidth; // 강제 리플로우
        requestAnimationFrame(function () {
          track.style.transition = 'transform 420ms cubic-bezier(0.22,0.61,0.36,1)';
          track.style.transform = 'translateX(0)';
          requestAnimationFrame(function () {
            incomingEl.style.transition = 'opacity 420ms ease';
            incomingEl.style.opacity = '1';
          });
        });
      }

      setTimeout(function () {
        start = (start + dir + n) % n;
        paint();
        animating = false;
      }, 440);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { move(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { move(1); });

    paint();
    window.addEventListener('resize', debounce(function () { if (!animating) paint(); }, 150));
    return { paint: paint, move: move };
  }

  function reviewPerView() {
    var w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 900) return 2;
    if (w <= 1200) return 3;
    return 4;
  }

  function storyPerView() {
    var w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  // ── 1. 홈 이용후기 캐러셀 (JSON 기반, 무한 순환) ──
  var homeTrack = document.getElementById('home-review-track');
  if (homeTrack) {
    loadReviews().then(function (reviews) {
      var sorted = reviews.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      createInfiniteCarousel({ track: homeTrack, items: sorted, renderFn: homeCardHTML, perViewFn: reviewPerView });
    }).catch(function (e) { console.error('리뷰 로드 실패', e); });
  }

  // ── 1-2. 홈 최근 소식 캐러셀 (JSON 기반, 무한 순환) ──
  var homeStoryTrack = document.getElementById('home-story-track');
  if (homeStoryTrack) {
    loadStories().then(function (stories) {
      var visible = stories.filter(function (s) { return s.visible !== false; });
      var sorted = visible.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      createInfiniteCarousel({ track: homeStoryTrack, items: sorted, renderFn: storyCardHTML, perViewFn: storyPerView });
    }).catch(function (e) { console.error('소식 로드 실패', e); });
  }

  // ── 2. 이용후기 목록 페이지 (전체보기, 10개씩 더보기) ──
  var listContainer = document.getElementById('rv-list-container');
  if (listContainer) {
    var RV_PAGE_SIZE = 10;
    loadReviews().then(function (reviews) {
      var totalEl = document.getElementById('rv-total-count');
      var avgEl = document.getElementById('rv-avg-rating');
      var loadMoreBtn = document.getElementById('rv-load-more');
      // 실제 공개 후기 개수를 그대로 기준으로 사용 (현재 스키마엔 비공개 필드가 없음 — 전체가 공개 데이터)
      if (totalEl) totalEl.textContent = reviews.length;
      if (avgEl) {
        var rated = reviews.filter(function (r) { return typeof r.rating === 'number'; });
        var avg = rated.length ? rated.reduce(function (s, r) { return s + r.rating; }, 0) / rated.length : 0;
        avgEl.textContent = avg.toFixed(1);
      }
      var currentList = [];
      var visibleCount = RV_PAGE_SIZE;
      function render() {
        var toShow = currentList.slice(0, visibleCount);
        listContainer.innerHTML = toShow.map(function (r, i) {
          var html = listCardHTML(r);
          return i >= visibleCount - RV_PAGE_SIZE && visibleCount > RV_PAGE_SIZE ? '<div class="fade-in-card">' + html + '</div>' : html;
        }).join('');
        if (loadMoreBtn) {
          loadMoreBtn.style.display = (currentList.length > visibleCount) ? '' : 'none';
        }
      }
      function sortList(mode) {
        var list = reviews.slice();
        if (mode === '별점높은순') list.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
        else if (mode === '별점낮은순') list.sort(function (a, b) { return (a.rating || 0) - (b.rating || 0); });
        else list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        currentList = list;
        visibleCount = RV_PAGE_SIZE; // 정렬이 바뀌면 처음 10개부터 다시 시작
        render();
      }
      if (loadMoreBtn) {
        if (reviews.length <= RV_PAGE_SIZE) loadMoreBtn.style.display = 'none';
        loadMoreBtn.addEventListener('click', function () {
          visibleCount += RV_PAGE_SIZE;
          render();
        });
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
      var ratingEl = document.getElementById('rv-rating');
      var starsEl = document.getElementById('rv-stars');
      if (typeof r.rating === 'number') {
        ratingEl.textContent = r.rating.toFixed(1);
        starsEl.textContent = starsFor(r.rating);
        if (ratingEl.parentElement) ratingEl.parentElement.hidden = false;
      } else if (ratingEl.parentElement) {
        ratingEl.parentElement.hidden = true;
      }
      document.getElementById('rv-author').textContent = r.author;
      var industryEl = document.getElementById('rv-industry');
      if (industryEl.parentElement) industryEl.parentElement.hidden = !r.industry;
      industryEl.textContent = r.industry;
      var regionEl = document.getElementById('rv-region');
      if (regionEl.parentElement) regionEl.parentElement.hidden = !r.region;
      regionEl.textContent = r.region;
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
    var paused = false;
    var HERO_INTERVAL = 3000;
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
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function startTimer() {
      stopTimer();
      if (paused || document.hidden) return;
      timer = setInterval(function () { show(idx + 1); }, HERO_INTERVAL);
    }
    if (slidenav) {
      Array.prototype.forEach.call(slidenav.querySelectorAll('.hero-slidenav-btn'), function (btn) {
        btn.addEventListener('click', function () {
          show(idx + parseInt(btn.getAttribute('data-dir'), 10));
          startTimer();
        });
      });
    }
    var heroEl = document.getElementById('home');
    if (heroEl) {
      heroEl.addEventListener('mouseenter', function () { paused = true; stopTimer(); });
      heroEl.addEventListener('mouseleave', function () { paused = false; startTimer(); });
    }
    // 탭이 백그라운드로 가면 타이머를 멈춰 불필요한 전환이 쌓이지 않도록 함
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopTimer();
      else startTimer();
    });
    show(idx);
    startTimer();
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

  // 글자가 포함된 포스터·안내문·캐릭터 이미지는 잘리지 않도록 contain, 단순 현장사진은 cover
  var STORY_CONTAIN_IDS = { '22': 1, '21': 1, '17': 1, '1': 1, '2': 1, '14': 1, '15': 1, '16': 1 };
  function storyCardHTML(s) {
    var cat = catMap[s.category] || 'env';
    var fit = STORY_CONTAIN_IDS[String(s.id)] ? 'contain' : 'cover';
    var imgBg = fit === 'contain' ? 'var(--gray-50)' : 'var(--teal-200)';
    var imgArea = s.image
      ? '<div style="aspect-ratio: 16 / 11; position: relative; background-color: ' + imgBg + '; background-image: url(' + s.image + '); background-size: ' + fit + '; background-repeat: no-repeat; background-position: center;">'
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

  // ── 목록 페이지 (실제 데이터 기반 페이지네이션: 9개씩, ?page=N URL 반영) ──
  var stListContainer = document.getElementById('st-list-container');
  if (stListContainer) {
    var ST_PAGE_SIZE = 9;
    loadStories().then(function (allStories) {
      var totalEl = document.getElementById('st-total-count');
      var pagerEl = document.getElementById('st-pagination');
      var visibleStories = allStories.filter(function (s) { return s.visible !== false; });
      var sorted = visibleStories.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      var activeFilter = 'all';
      var currentPage = 1;

      function filteredList() {
        if (activeFilter === 'all') return sorted;
        return sorted.filter(function (s) { return (catMap[s.category] || 'env') === activeFilter; });
      }

      function totalPages(list) { return Math.max(1, Math.ceil(list.length / ST_PAGE_SIZE)); }

      function syncUrl() {
        var url = new URL(window.location.href);
        if (currentPage > 1) url.searchParams.set('page', currentPage);
        else url.searchParams.delete('page');
        history.pushState({ stPage: currentPage }, '', url.pathname + url.search);
      }

      function renderPagination(list) {
        if (!pagerEl) return;
        var tp = totalPages(list);
        var html = '';
        html += '<button class="st-page-arrow" data-nav="prev" type="button"' + (currentPage <= 1 ? ' disabled' : '') + ' aria-label="이전 페이지">‹</button>';
        for (var p = 1; p <= tp; p++) {
          html += '<button class="st-page-btn' + (p === currentPage ? ' active' : '') + '" data-page="' + p + '" type="button" aria-label="' + p + '페이지">' + p + '</button>';
        }
        html += '<button class="st-page-arrow" data-nav="next" type="button"' + (currentPage >= tp ? ' disabled' : '') + ' aria-label="다음 페이지">›</button>';
        pagerEl.innerHTML = html;
      }

      function goToPage(page, opts) {
        var list = filteredList();
        var tp = totalPages(list);
        currentPage = Math.min(Math.max(1, page), tp);
        var start = (currentPage - 1) * ST_PAGE_SIZE;
        var pageItems = list.slice(start, start + ST_PAGE_SIZE);
        stListContainer.style.opacity = '0';
        setTimeout(function () {
          stListContainer.innerHTML = pageItems.map(storyCardHTML).join('');
          renderPagination(list);
          if (totalEl) totalEl.textContent = list.length;
          stListContainer.style.opacity = '1';
          if (!opts || !opts.skipScroll) {
            stListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 160);
        if (!opts || !opts.skipUrl) syncUrl();
      }

      if (pagerEl) {
        pagerEl.addEventListener('click', function (e) {
          var btn = e.target.closest('button');
          if (!btn) return;
          if (btn.hasAttribute('disabled')) return;
          if (btn.dataset.page) { goToPage(parseInt(btn.dataset.page, 10)); return; }
          if (btn.dataset.nav === 'prev') goToPage(currentPage - 1);
          else if (btn.dataset.nav === 'next') goToPage(currentPage + 1);
        });
      }

      var storyFilterBtns = document.querySelectorAll('.story-filter-btn');
      storyFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          activeFilter = btn.getAttribute('data-filter');
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
          goToPage(1);
        });
      });

      window.addEventListener('popstate', function () {
        var p = parseInt(new URLSearchParams(window.location.search).get('page'), 10) || 1;
        goToPage(p, { skipUrl: true, skipScroll: true });
      });

      var initialPage = parseInt(new URLSearchParams(window.location.search).get('page'), 10) || 1;
      goToPage(initialPage, { skipUrl: true, skipScroll: true });
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
    // 로고가 없는 항목은 어디에도 노출하지 않음(깨진 카드/빈 자리 방지)
    return items
      .filter(function (i) { return i.visible !== false && !!i.logo && (!mainOnly || i.showOnMain !== false); })
      .slice()
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  // 메인페이지 셀 HTML — 기존 하드코딩 그리드와 동일한 마크업/스타일 재사용 (로고 표시 크기 약 2배)
  function mainCompanyCellHTML(item) {
    var mediaHTML = item.logo
      ? '<div style="width: 128px; height: 128px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; background: var(--gray-50); border-radius: var(--radius-md, 8px); box-sizing: border-box; padding: 12px;"><img src="' + item.logo + '" alt="' + item.name + '" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>'
      : '<div style="width: 96px; height: 96px; border-radius: var(--radius-md); background: var(--gray-0); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); margin-bottom: 10px;">' + companyPlaceholderIcon + '</div>';
    var bg = item.logo ? '' : 'background: repeating-linear-gradient(45deg, var(--gray-50), var(--gray-50) 8px, var(--gray-0) 8px, var(--gray-0) 16px);';
    var inner = '<div style="min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 20px; ' + bg + '">' +
        mediaHTML +
        '<div style="color: var(--text-primary); font-size: 13px; font-weight: 500; text-align: center; letter-spacing: -0.01em;">' + item.name + '</div>' +
      '</div>';
    return item.url
      ? '<a href="' + item.url + '" target="_blank" rel="noopener" style="display: block; color: inherit;">' + inner + '</a>'
      : inner;
  }

  // 메인페이지 고객사/협력사 10개씩(5×2) 슬라이더 — 카드 1개가 아닌 "페이지(최대 10개)" 단위로
  // createInfiniteCarousel을 재사용: 나가는 페이지 1개만 페이드아웃, 들어오는 페이지 1개만 페이드인.
  function pageHTML(pageItems) {
    return '<div class="company-slide-grid" style="border-radius: inherit; overflow: hidden;">' +
      pageItems.map(mainCompanyCellHTML).join('') +
      '</div>';
  }

  function renderCompanySlider(containerId, file, key) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var wrap = el.closest('.review-carousel') || el.parentElement;
    loadCompanies(file, key).then(function (items) {
      var list = visibleCompanies(items, true);
      if (!list.length) {
        el.innerHTML = '';
        if (wrap) {
          var pb = wrap.querySelector('.carousel-btn.prev');
          var nb = wrap.querySelector('.carousel-btn.next');
          if (pb) pb.style.display = 'none';
          if (nb) nb.style.display = 'none';
        }
        return;
      }
      var PAGE_SIZE = 10;
      var pages = [];
      for (var i = 0; i < list.length; i += PAGE_SIZE) pages.push(list.slice(i, i + PAGE_SIZE));
      createInfiniteCarousel({
        track: el,
        items: pages,
        renderFn: pageHTML,
        perViewFn: function () { return 1; },
        gap: 0
      });
    }).catch(function (e) { console.error(file + ' 로드 실패', e); });
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

  renderCompanySlider('home-customers-grid', 'data/customers.json', 'customers');
  renderCompanySlider('home-partners-grid', 'data/partners.json', 'partners');
  renderCompanyGrid('customers-grid', 'data/customers.json', 'customers', false, companyCardHTML);
  renderCompanyGrid('partners-grid', 'data/partners.json', 'partners', false, companyCardHTML);

  // ── 등록증 및 인증서 확대보기 모달 ──
  function initCertificateLightbox() {
    var cards = document.querySelectorAll('.cert-card');
    if (!cards.length) return;
    var overlay = document.createElement('div');
    overlay.className = 'cert-modal-overlay';
    overlay.innerHTML =
      '<div class="cert-modal-panel">' +
        '<div class="cert-modal-head">' +
          '<div class="cert-modal-title"></div>' +
          '<div class="cert-modal-actions">' +
            '<a class="cert-modal-pdf-link" target="_blank" rel="noopener">원본 PDF 새 창으로 보기</a>' +
            '<button class="cert-modal-close" type="button" aria-label="닫기">&times;</button>' +
          '</div>' +
        '</div>' +
        '<div class="cert-modal-body"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    var body = overlay.querySelector('.cert-modal-body');
    var titleEl = overlay.querySelector('.cert-modal-title');
    var pdfLink = overlay.querySelector('.cert-modal-pdf-link');
    var closeBtn = overlay.querySelector('.cert-modal-close');

    function open(card) {
      var imgs;
      try { imgs = JSON.parse(card.getAttribute('data-cert-imgs') || '[]'); } catch (e) { imgs = []; }
      var pdf = card.getAttribute('data-cert-pdf');
      var title = card.getAttribute('data-cert-title') || '';
      titleEl.textContent = title;
      if (pdf) { pdfLink.href = pdf; pdfLink.style.display = ''; } else { pdfLink.style.display = 'none'; }
      body.innerHTML = imgs.map(function (src) {
        return '<img src="' + src + '" alt="' + title + '">';
      }).join('');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    cards.forEach(function (c) {
      c.addEventListener('click', function () { open(c); });
    });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  initCertificateLightbox();
})();
