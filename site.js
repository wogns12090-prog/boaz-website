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
    '.nav-submenu-inner a { padding: 10px 18px; border-radius: 8px; font-size: 16px; color: var(--text-secondary); white-space: nowrap; text-align: center; }',
    '.nav-submenu-inner a:hover { background: var(--teal-50); color: var(--teal-700); }',
    /* ─ 히어로 오버레이 헤더 (메인페이지 전용, 스크롤 시 불투명하게 전환) ─ */
    'html.has-hero header { position: fixed; top: 0; left: 0; right: 0; width: 100%; background: linear-gradient(180deg, rgba(1,45,50,0.55) 0%, rgba(1,45,50,0.18) 100%); backdrop-filter: saturate(1.1) blur(6px); border-bottom: 1px solid rgba(255,255,255,0.14); transition: background 260ms ease, border-color 260ms ease; }',
    'html.has-hero header.is-scrolled { background: rgba(251,250,247,0.94); backdrop-filter: saturate(1.2) blur(8px); border-bottom-color: var(--border-subtle); }',
    'html.has-hero header nav > a, html.has-hero header .nav-item > a, html.has-hero header img[alt*="보아스"] { transition: color 260ms ease, filter 260ms ease; }',
    /* ─ 히어로 슬라이드 번호 + 진행 게이지 ─ */
    '.hero-slidenav { position: absolute; right: 40px; bottom: 40px; z-index: 6; display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: rgba(1, 45, 50, 0.45); backdrop-filter: blur(6px); border-radius: 999px; color: rgba(255,255,255,0.95); font-family: var(--font-mono); font-size: 15px; font-weight: 600; }',
    '.hero-slidenav-btn { width: 26px; height: 26px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.35); background: transparent; color: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 17px; line-height: 1; padding: 0; }',
    '.hero-slidenav-btn:hover { background: rgba(255,255,255,0.18); }',
    '.hero-gauge-group { display: flex; align-items: center; gap: 6px; }',
    '.hero-gauge { display: flex; align-items: center; gap: 4px; cursor: pointer; padding: 4px 0; }',
    '.hero-gauge-num { display: none; }',
    '.hero-gauge-bar { width: 28px; height: 2px; background: rgba(255,255,255,0.25); border-radius: 999px; overflow: hidden; position: relative; }',
    '.hero-gauge-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: rgba(255,255,255,0.95); border-radius: 999px; }',
    '.hero-gauge.active .hero-gauge-fill { animation: heroGaugeFill 3s linear forwards; }',
    '.hero-gauge.done .hero-gauge-fill { width: 100%; }',
    '@keyframes heroGaugeFill { 0% { width: 0; } 100% { width: 100%; } }',
    '@media (max-width: 900px) { .hero-slidenav { right: 20px; bottom: 20px; padding: 8px 14px; gap: 8px; } .hero-gauge-bar { width: 22px; } }',
    '@media (max-width: 560px) { .hero-slidenav { right: 12px; bottom: 12px; } }',
    /* ─ 히어로 스크롤 유도 표시 ─ */
    '.scroll-hint { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 6; cursor: pointer; color: rgba(255,255,255,0.85); }',
    '.scroll-hint-mouse { width: 26px; height: 42px; border: 2px solid rgba(255,255,255,0.75); border-radius: 999px; display: flex; justify-content: center; padding-top: 7px; box-sizing: border-box; }',
    '.scroll-hint-dot { width: 4px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.95); animation: scrollHintMove 1.6s ease infinite; }',
    '.scroll-hint-label { font-size: 13px; letter-spacing: 0.2em; font-weight: 600; }',
    '@keyframes scrollHintMove { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(14px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }',
    '@media (max-width: 900px) { .scroll-hint { display: none; } }',
    /* ─ 푸터 3단 그리드: 모바일에서 세로로 쌓이도록 보정 (기존 반응형 규칙 누락 보완) ─ */
    '@media (max-width: 900px) { footer [style*="grid-template-columns: 1.3fr 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; } }',
    /* ─ 고객사·협력사 서브페이지 카드 그리드 ─ */
    /* 9차: 로고 표시 크기 1.5배 — 열 수를 6→4로 줄여 셀 폭을 넓히고 로고 박스 높이 112→168px */
    '.company-card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }',
    '@media (max-width: 1100px) { .company-card-grid { grid-template-columns: repeat(3, 1fr); } }',
    '@media (max-width: 900px) { .company-card-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }',
    '@media (max-width: 560px) { .company-card-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }',
    '.company-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 300px; padding: 28px 20px; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg, 12px); color: inherit; text-align: center; }',
    '.company-card-media { width: 100%; height: 168px; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border-radius: var(--radius-md, 8px); padding: 12px; box-sizing: border-box; }',
    '@media (max-width: 560px) { .company-card { min-height: 220px; padding: 20px 14px; } .company-card-media { height: 118px; } }',
    '.company-card-media img { max-width: 100%; max-height: 100%; object-fit: contain; }',
    '.company-card-ph { width: 52px; height: 52px; border-radius: var(--radius-md); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); }',
    '.company-card-name { font-size: 15px; font-weight: 500; color: var(--text-primary); letter-spacing: -0.01em; overflow-wrap: anywhere; }',
    /* ─ 메인 고객사·협력사 10개 슬라이더(페이지당 최대 5×2) ─ */
    '.company-slide-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0px; background: var(--gray-0); }',
    '@media (max-width: 1100px) { .company-slide-grid { grid-template-columns: repeat(4, 1fr); } }',
    '@media (max-width: 900px) { .company-slide-grid { grid-template-columns: repeat(3, 1fr); } }',
    '@media (max-width: 560px) { .company-slide-grid { grid-template-columns: repeat(2, 1fr); } }',
    /* 로고 박스는 192px을 상한으로 두되 셀이 좁아지면 함께 줄어든다(브레이크포인트별 수치 불필요). */
    '.company-slide-logo { width: min(192px, 100%) !important; height: auto !important; aspect-ratio: 1 / 1; }',
    '@media (max-width: 900px) { .company-slide-cell { min-height: 230px !important; padding: 18px !important; } }',
    '@media (max-width: 560px) { .company-slide-cell { min-height: 190px !important; padding: 14px !important; } }',
    /* ─ 홈 이용후기 카드: 이미지/텍스트 영역 고정 비율, 카드 높이 통일 ─ */
    '.review-card { display: flex; flex-direction: column; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; color: inherit; transition: box-shadow var(--duration-base) var(--ease-out); }',
    '.review-card:hover { box-shadow: 0 8px 20px -10px rgba(0,0,0,0.18); }',
    '.review-card-media { flex: 0 0 176px; height: 176px; background-color: var(--teal-200); background-size: cover; background-position: center; background-repeat: no-repeat; }',
    '.review-card-media-ph { background: linear-gradient(135deg, var(--teal-300), var(--teal-600)); position: relative; }',
    '.review-card-media-tag { position: absolute; bottom: 10px; right: 12px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.35); padding: 3px 8px; border-radius: 4px; }',
    '.review-card-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; padding: 22px 24px; }',
    '.review-card-title { font-size: 19px; font-weight: 600; margin: 10px 0 8px; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }',
    '.review-card-summary { font-size: 16px; line-height: 1.6; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }',
    '.review-card-meta { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 14px; color: var(--text-tertiary); }',
    '@media (max-width: 560px) { .review-card-media { flex-basis: 150px; height: 150px; } }',
    /* ─ 홈 미니 캐러셀(이용후기/최근소식) 공통: fade+슬라이드 전환, 좌우 버튼 안 잘림 ─ */
    '.review-carousel { position: relative; overflow: visible; }',
    '.review-track { display: flex; overflow: hidden; }',
    '.review-track > * { min-width: 0; }',
    /* ─ 등록증 및 인증서 카드 + 확대보기 모달 ─ */
    /* 9차: 인증서 썸네일 1.5배 — 최소 열 폭 220→330px (한 줄 표시 개수가 줄어들며 썸네일이 커짐) */
    '.cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 28px; }',
    '@media (max-width: 560px) { .cert-grid { grid-template-columns: 1fr; gap: 20px; } }',
    '.cert-card { all: unset; cursor: zoom-in; display: block; text-align: left; width: 100%; box-sizing: border-box; border-radius: var(--radius-xl); background: var(--gray-0); border: 1px solid var(--border-subtle); overflow: hidden; transition: box-shadow 160ms ease, transform 160ms ease; }',
    '.cert-card:hover { box-shadow: 0 10px 24px -12px rgba(0,0,0,0.22); transform: translateY(-2px); }',
    '.cert-card-thumb { aspect-ratio: 3 / 4; background: var(--gray-50); overflow: hidden; }',
    '.cert-card-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }',
    '.cert-card-body { padding: 16px 18px 18px; }',
    '.cert-card-title { font-size: 16.5px; font-weight: 600; letter-spacing: -0.01em; color: var(--text-primary); }',
    '.cert-card-hint { font-size: 14px; color: var(--text-tertiary); margin-top: 4px; }',
    '.cert-modal-overlay { position: fixed; inset: 0; background: rgba(1,20,22,0.82); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 40px 20px; opacity: 0; pointer-events: none; transition: opacity 200ms ease; }',
    '.cert-modal-overlay.open { opacity: 1; pointer-events: auto; }',
    '.cert-modal-panel { max-width: 880px; max-height: 88vh; width: 100%; background: var(--gray-0); border-radius: var(--radius-xl); overflow: hidden; display: flex; flex-direction: column; }',
    '.cert-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--border-subtle); }',
    '.cert-modal-title { font-size: 17px; font-weight: 700; color: var(--text-primary); }',
    '.cert-modal-actions { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }',
    '.cert-modal-pdf-link { font-size: 15px; color: var(--teal-700); font-weight: 600; white-space: nowrap; }',
    '.cert-modal-close { cursor: pointer; background: none; border: none; font-size: 24px; line-height: 1; color: var(--text-tertiary); padding: 4px; }',
    '.cert-modal-close:hover { color: var(--text-primary); }',
    '.cert-modal-body { overflow: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; align-items: center; background: var(--gray-50); }',
    '.cert-modal-body img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }',
    '@media (max-width: 560px) { .cert-modal-overlay { padding: 0; } .cert-modal-panel { max-height: 100vh; height: 100%; border-radius: 0; } }',
    /* ─ 모바일 햄버거 메뉴 ─ */
    '.mob-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 6px; color: var(--text-secondary); z-index: 22; }',
    'html.has-hero header:not(.is-scrolled) .mob-menu-btn { color: rgba(255,255,255,0.92); }',
    '@media (max-width: 900px) { .mob-menu-btn { display: flex; align-items: center; justify-content: center; } }',
    '.mob-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 300px; max-width: 85vw; background: var(--gray-0); z-index: 100; transform: translateX(100%); transition: transform 320ms cubic-bezier(0.4,0,0.2,1); box-shadow: -4px 0 24px rgba(0,0,0,0.15); display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }',
    '.mob-sidebar.open { transform: translateX(0); }',
    '.mob-backdrop { position: fixed; inset: 0; background: rgba(1,20,22,0.5); z-index: 99; opacity: 0; pointer-events: none; transition: opacity 280ms ease; }',
    '.mob-backdrop.open { opacity: 1; pointer-events: auto; }',
    '.mob-sidebar-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--border-subtle); }',
    '.mob-sidebar-close { background: none; border: none; cursor: pointer; padding: 4px; font-size: 24px; line-height: 1; color: var(--text-tertiary); }',
    '.mob-sidebar-close:hover { color: var(--text-primary); }',
    '.mob-sidebar-nav { padding: 12px 0; flex: 1; }',
    '.mob-nav-item { border-bottom: 1px solid var(--border-subtle); }',
    '.mob-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; font-size: 17px; font-weight: 600; color: var(--text-primary); cursor: pointer; background: none; border: none; width: 100%; text-align: left; font-family: inherit; }',
    'a.mob-nav-link:hover { background: var(--teal-50); color: var(--teal-700); }',
    '.mob-nav-link .mob-arrow { font-size: 14px; color: var(--text-tertiary); transition: transform 200ms ease; }',
    '.mob-nav-item.open .mob-arrow { transform: rotate(180deg); }',
    '.mob-sub-menu { max-height: 0; overflow: hidden; transition: max-height 280ms ease; }',
    '.mob-nav-item.open .mob-sub-menu { max-height: 300px; }',
    '.mob-sub-menu a { display: block; padding: 11px 20px 11px 36px; font-size: 16px; color: var(--text-secondary); }',
    '.mob-sub-menu a:hover { background: var(--teal-50); color: var(--teal-700); }',
    '.mob-sidebar-kakao { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 12px 20px 20px; padding: 12px 0; background: rgb(254,229,0); color: rgb(25,25,25); border-radius: var(--radius-md); font-size: 16px; font-weight: 600; }',
    /* ─ 사업분야 큰 이미지 슬라이더 ─ */
    '.biz-slider { position: relative; max-width: 1560px; margin: 0 auto; }',
    '.biz-slider-viewport { overflow: hidden; border-radius: 6px; }',
    '.biz-slider-track { display: flex; transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1); }',
    '.biz-slide { min-width: 100%; display: grid; grid-template-columns: 60% 40%; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; }',
    /* 9차: 슬라이더가 넓어져도(1240→1560px) 이미지 비율이 배율에 따라 흔들리지 않도록
       고정 height 590px → aspect-ratio 8:5. 1560px 슬라이더에서 936x585px로 기존과 유사한 높이. */
    '.biz-slide-img { position: relative; aspect-ratio: 8 / 5; overflow: hidden; }',
    '.biz-slide-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 40%; display: block; }',
    '.biz-slide-badge { position: absolute; top: 18px; left: 20px; font-family: var(--font-mono); font-size: 14px; color: rgba(255,255,255,0.95); background: rgba(0,0,0,0.45); padding: 5px 14px; border-radius: 999px; letter-spacing: 0.1em; font-weight: 600; z-index: 2; }',
    '.biz-slide-body { display: flex; flex-direction: column; justify-content: center; padding: 48px 52px; }',
    '.biz-slide-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 20px; color: var(--text-primary); }',
    '.biz-slide-desc { font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin: 0; }',
    '.biz-slide-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 32px; font-size: 17px; font-weight: 600; color: var(--teal-700); padding: 12px 24px; border: 1px solid var(--border-default); border-radius: var(--radius-md); background: var(--gray-0); transition: all 200ms ease; }',
    '.biz-slide-link:hover { background: var(--teal-50); border-color: var(--teal-600); color: var(--teal-800); }',
    '.biz-slider-controls { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 28px; }',
    '.biz-slider-btn { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--border-default); background: var(--gray-0); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 22px; transition: all 200ms ease; }',
    '.biz-slider-btn:hover { background: var(--teal-50); border-color: var(--teal-600); color: var(--teal-700); }',
    '.biz-slider-dots { display: flex; gap: 8px; }',
    '.biz-dot { width: 10px; height: 10px; border-radius: 50%; border: none; background: var(--border-default); cursor: pointer; padding: 0; transition: all 200ms ease; }',
    '.biz-dot.active { background: var(--teal-600); width: 28px; border-radius: 5px; }',
    '@media (max-width: 900px) { .biz-slide { grid-template-columns: 1fr; } .biz-slide-img { height: 300px; } .biz-slide-body { padding: 28px 24px 32px; } .biz-slide-title { font-size: 26px; } .biz-slide-desc { font-size: 17px; } .biz-slide-link { margin-top: 24px; } }',
    '@media (max-width: 560px) { .biz-slide-img { height: 260px; } .biz-slide-body { padding: 22px 20px 28px; } .biz-slide-title { font-size: 23px; } }',
    /* ─ 서브페이지 공통 히어로 배너 ─ */
    /* 높이를 뷰포트 폭에 비례시켜(21.9vw ≒ 32:7) 브라우저 배율이 바뀌어도 잘리는 영역이 일정하게 유지되도록 함.
       clamp 하한 340px은 제목·브레드크럼이 들어가는 최소 높이, 상한 620px은 초광폭 화면용 안전장치. */
    '.sub-hero { position: relative; overflow: hidden; min-height: clamp(340px, 21.9vw, 620px); display: flex; align-items: center; color: var(--gray-0); }',
    '.sub-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; }',
    '.sub-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,68,73,0.48) 0%, rgba(0,68,73,0.20) 34%, rgba(0,68,73,0.00) 64%); }',
    /* 9차: 제목을 아래로 내려 비주얼 세로 중앙에 가깝게 배치.
       상하 패딩 합계(140px)를 그대로 유지하므로 8차에서 안정화한 .sub-hero 높이에는 영향 없음. */
    '.sub-hero .container { position: relative; z-index: 2; padding-top: 110px; padding-bottom: 30px; width: 100%; }',
    '.sub-hero .page-title { text-shadow: 0 2px 16px rgba(0,0,0,0.35); }',
    '@media (max-width: 900px) { .sub-hero { min-height: 340px; } }',
    '@media (max-width: 560px) { .sub-hero { min-height: 260px; } .sub-hero .container { padding-top: 84px; padding-bottom: 20px; } }',
    /* ─ 메인 We Are 전체폭 배너 ─
       배너 높이는 텍스트(약 475px) + 상하 여백으로 결정되므로, 여백을 폭에 비례하게 만들어
       전체 높이가 폭에 비례(≒ 2.5:1)하도록 함 → 배율이 바뀌어도 배경 이미지 잘림 위치가 유지됨.
       calc(20vw - 237.5px)의 하한 80px은 1587px 이하에서 기존 여백(80px)을 그대로 유지. */
    '.weare-banner-inner { padding-top: clamp(80px, calc(20vw - 237.5px), 240px); padding-bottom: clamp(80px, calc(20vw - 237.5px), 240px); }',
    /* ═══ 9차 수정 ═══ */
    /* ─ 넓은 콘텐츠 정렬선(1560px) ─
       메인 히어로·We Are 배너·사업분야 슬라이더가 공유하는 정렬선.
       기본 .container(1240px)보다 넓어 문구가 왼쪽으로 이동하고 슬라이더가 커진다.
       고정 left 값이 아니라 max-width + auto margin이므로 모든 해상도에서 자연스럽게 정렬됨. */
    ':root { --container-hero: 1560px; }',
    '#home > .container, .weare-banner-inner, #business > .container { max-width: var(--container-hero); }',
    /* 좌우 여백은 화면이 넓어질수록 함께 커져 문구가 화면 끝에 붙지 않게 한다(고정 left 값 미사용). */
    '@media (min-width: 901px) { #home > .container, .weare-banner-inner, #business > .container { padding-left: clamp(32px, 4vw, 64px); padding-right: clamp(32px, 4vw, 64px); } }',
    /* ─ 서브페이지 제목 확대(약 2배) ─ 40px → 최대 76px. 브레드크럼과 계층 구분 유지.
       모바일은 기존 `h1 { font-size: 28px !important }` 미디어쿼리가 우선 적용됨. */
    '.sub-hero .page-title { font-size: clamp(34px, 4.2vw, 76px); line-height: 1.14; margin-top: 16px; }',
    '.sub-hero .eyebrow { font-size: 15px; letter-spacing: 0.16em; }',
    /* ─ 업무절차 아이콘 확대(PC 약 2배) ─ */
    '.process-icon { width: 84px; height: 84px; }',
    '.process-num { top: -6px; right: -6px; min-width: 26px; height: 26px; }',
    '@media (min-width: 901px) { .process-icon { width: 148px; height: 148px; } .process-icon svg { width: 58px; height: 58px; } .process-num { min-width: 40px; height: 40px; font-size: 17px; top: -8px; right: -8px; } .process-step { gap: 20px !important; } }',
    /* ─ 조직도 확대(PC 약 2배) ─ */
    '@media (min-width: 901px) { .org-chart { max-width: 1080px; margin: 0 auto; padding: 64px 48px !important; } .org-ceo { padding: 34px 88px !important; min-width: 400px !important; } .org-ceo-role { font-size: 34px !important; } .org-ceo-tag { font-size: 15px !important; } .org-stem { height: 56px !important; } .org-branch { height: 40px !important; } .org-team-head { padding: 24px 22px !important; } .org-team-tag { font-size: 15px !important; } .org-team-name { font-size: 26px !important; } .org-team-body { padding: 26px 24px 28px !important; gap: 12px !important; } .org-team-item { font-size: 17px !important; } }',
    /* 연결선을 팀 카드 중심에 정확히 맞춤.
       기존 margin: 0 12.5%는 4열 그리드 중심과 어긋났다(최대 109px 오차).
       분기 행을 팀 그리드와 동일한 4열·gap 20px로 두고, 가로선은 첫/마지막 열 중심까지만 그린다
       → 열 중심 = calc((100% - 3*20px) / 8) 위치에서 시작·종료. */
    '.org-branch { margin-left: 0 !important; margin-right: 0 !important; }',
    '.org-branch > div:first-child { left: calc((100% - 60px) / 8) !important; right: calc((100% - 60px) / 8) !important; }',
    '.org-branch > div:last-child { gap: 20px; }',
    '@media (max-width: 900px) { .org-branch, .org-stem { display: none !important; } .org-chart { padding: 28px 20px !important; } }',
    /* ─ 비전 3요소 확대(PC 약 1.5배) ─ */
    '@media (min-width: 901px) { .vision-grid { gap: 28px !important; } .vision-card { padding: 46px 34px !important; } .vision-icon { width: 300px !important; margin-bottom: 28px !important; } .vision-icon svg { width: 96px; height: 96px; } .vision-tag { font-size: 16px !important; } .vision-title { font-size: 32px !important; } .vision-desc { font-size: 18px !important; } }',
    '@media (max-width: 900px) { .vision-grid { grid-template-columns: 1fr !important; } }',
    /* ─ 스크롤 등장(fade-up) ─
       JS가 .reveal-ready를 붙인 뒤에만 숨기므로, JS 미실행 시에도 콘텐츠는 항상 보인다. */
    /* 숨김 상태에는 transition을 걸지 않는다(최초 로드 시 1→0으로 사라지는 깜빡임 방지).
       전환은 .is-visible이 붙는 순간에만 동작하므로 한 방향으로 한 번만 재생된다. */
    'html.reveal-ready .reveal { opacity: 0; transform: translateY(26px); transition: none; }',
    'html.reveal-ready .reveal.is-visible { opacity: 1; transform: none; transition: opacity 620ms var(--ease-out, ease), transform 620ms var(--ease-out, ease); }',
    '@media (prefers-reduced-motion: reduce) { html.reveal-ready .reveal { opacity: 1 !important; transform: none !important; transition: none !important; } }',
    /* ─ 팝업(공지) 창 ─ */
    '.popup-overlay { position: fixed; inset: 0; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(1,20,22,0.55); opacity: 0; pointer-events: none; transition: opacity 220ms ease; }',
    '.popup-overlay.open { opacity: 1; pointer-events: auto; }',
    '.popup-panel { width: 100%; max-width: 460px; max-height: 88vh; display: flex; flex-direction: column; background: var(--gray-0); border-radius: var(--radius-xl, 16px); overflow: hidden; box-shadow: 0 24px 60px -20px rgba(0,0,0,0.45); transform: translateY(14px) scale(0.985); transition: transform 260ms var(--ease-out, ease); }',
    '.popup-overlay.open .popup-panel { transform: none; }',
    /* 제목은 가운데 정렬. 닫기 버튼을 absolute로 빼서 제목이 여러 줄이어도 중앙이 유지되고,
       제목 좌우에 닫기 버튼 폭만큼 여백(52px)을 둬서 서로 겹치지 않게 한다. */
    '.popup-head { position: relative; flex: 0 0 auto; padding: 22px 52px 0; }',
    /* 제목 크기: PC 21px → 23px (측정값 +2px). 각 페이지의 전역 h2 !important 규칙이
       팝업 제목까지 덮어쓰지 않도록 !important로 팝업 CSS가 우선하도록 고정. */
    '.popup-title { font-size: 23px !important; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); line-height: 1.35; margin: 0; text-align: center; overflow-wrap: anywhere; }',
    '.popup-close { position: absolute; top: 16px; right: 14px; background: none; border: none; cursor: pointer; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 26px; line-height: 1; color: var(--text-tertiary); }',
    '.popup-close:hover { color: var(--text-primary); }',
    /* 콘텐츠 영역만 세로 스크롤. flex 자식이므로 min-height:0이 없으면 축소되지 않아 스크롤이 생기지 않는다. */
    '.popup-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; padding: 16px 24px 4px; }',
    '.popup-images { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }',
    '.popup-img { display: block; width: auto; max-width: 100%; height: auto; margin: 0 auto; border-radius: var(--radius-md, 8px); }',
    '.popup-text { font-size: 16px; line-height: 1.75; color: var(--text-secondary); margin: 0; white-space: pre-line; overflow-wrap: anywhere; }',
    '.popup-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; padding: 12px 22px; background: var(--teal-700); color: var(--gray-0); border-radius: var(--radius-md, 8px); font-size: 16px; font-weight: 600; }',
    '.popup-link:hover { background: var(--teal-800); color: var(--gray-0); }',
    /* 하단은 항상 보이도록 고정(flex-shrink: 0) */
    '.popup-foot { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 24px; border-top: 1px solid var(--border-subtle); background: var(--gray-50); }',
    '.popup-hide { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; color: var(--text-secondary); cursor: pointer; user-select: none; }',
    '.popup-hide input { width: 16px; height: 16px; cursor: pointer; accent-color: var(--teal-700); }',
    '.popup-dismiss { background: none; border: 1px solid var(--border-default); border-radius: var(--radius-md, 8px); padding: 9px 18px; font-family: inherit; font-size: 15px; font-weight: 600; color: var(--text-primary); cursor: pointer; }',
    '.popup-dismiss:hover { background: var(--gray-0); border-color: var(--teal-600); color: var(--teal-800); }',
    /* ─ 여러 팝업 이동(한 번에 하나씩 표시) ─ 팝업이 1개면 JS가 이 영역을 만들지 않는다. */
    '.popup-nav { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 16px; border-top: 1px solid var(--border-subtle); }',
    '.popup-nav-btn { min-width: 44px; height: 40px; padding: 0 14px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; background: var(--gray-0); border: 1px solid var(--border-default); border-radius: var(--radius-md, 8px); font-family: inherit; font-size: 15px; font-weight: 600; color: var(--text-primary); cursor: pointer; }',
    '.popup-nav-btn:hover:not(:disabled) { background: var(--teal-50); border-color: var(--teal-600); color: var(--teal-800); }',
    '.popup-nav-btn:disabled { opacity: 0.4; cursor: default; }',
    '.popup-count { font-family: var(--font-mono); font-size: 15px; font-weight: 600; color: var(--text-secondary); }',
    '.popup-closeall { background: none; border: none; font-family: inherit; font-size: 14px; color: var(--text-tertiary); text-decoration: underline; cursor: pointer; padding: 6px 4px; }',
    '.popup-closeall:hover { color: var(--text-primary); }',
    /* 모바일: 상하 안전 여백 확보, 버튼은 손가락으로 누르기 쉬운 크기 유지 */
    '@media (max-width: 560px) { .popup-overlay { padding: 14px; align-items: center; } .popup-panel { max-height: 84vh; } .popup-title { font-size: 21px !important; } .popup-head { padding: 18px 52px 0; } .popup-body { padding: 14px 18px 4px; } .popup-foot { flex-direction: column-reverse; align-items: stretch; padding: 12px 18px; } .popup-dismiss { width: 100%; height: 44px; } .popup-nav { padding: 10px 12px; } .popup-nav-btn { height: 44px; min-width: 52px; } }',
    '@media (prefers-reduced-motion: reduce) { .popup-overlay, .popup-panel { transition: none !important; } }',
    /* ─ 업무절차 반응형 ─ */
    '@media (max-width: 900px) { .process-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px 16px !important; } .process-arrow { display: none !important; } }',
    '@media (max-width: 560px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }',
    '@media (max-width: 360px) { .process-grid { grid-template-columns: 1fr !important; } }',
    /* ─ 보유장비 카드: 기존 홈페이지(boazet.com) 비율 기준 재설계 ─ */
    '.eq-panel { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }',
    '@media (max-width: 760px) { .eq-panel { grid-template-columns: 1fr; } }',
    '.eq-card { display: flex; overflow: hidden; }',
    /* 9차: 장비 이미지 1.5배 — 정사각 168→252px, object-fit: contain 유지로 비율·잘림 없음 */
    '.eq-card-img { flex: 0 0 252px; width: 252px; height: 252px; display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--border-subtle); background: #FFFFFF; overflow: hidden; }',
    '.eq-card-img img { width: 100%; height: 100%; object-fit: contain; padding: 22px; box-sizing: border-box; }',
    '@media (max-width: 900px) { .eq-card-img { flex: 0 0 190px; width: 190px; height: 190px; } .eq-card-img img { padding: 16px; } }',
    '@media (max-width: 560px) { .eq-card-img { flex: 0 0 132px; width: 132px; height: 132px; } .eq-card-img img { padding: 12px; } }',
    '.eq-card-body { padding: 20px 22px; display: flex; flex-direction: column; justify-content: center; min-width: 0; }',
    '.eq-card-model { font-family: var(--font-mono); font-size: 23px; font-weight: 700; letter-spacing: -0.01em; color: var(--teal-700); }',
    '.eq-card-mfr { font-size: 14px; color: var(--text-tertiary); margin-top: 5px; }',
    '.eq-card-name { font-size: 17.5px; font-weight: 700; margin: 9px 0 0; letter-spacing: -0.01em; color: var(--text-primary); line-height: 1.4; }',
    '.eq-card-desc { font-size: 15.5px; color: var(--text-secondary); line-height: 1.6; margin: 8px 0 0; }',
    /* ─ 제작·관리용 안내 문구는 방문자 화면에 노출하지 않음 (관리자 CMS 기능 자체는 유지) ─ */
    /* ─ 새로 추가되는 카드 fade-in ─ */
    '@keyframes fadeInUpCard { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }',
    '.fade-in-card { animation: fadeInUpCard 380ms ease both; }',
    /* ─ 헤더 로고: 태블릿/모바일 반응형 크기(1.7배 강제 아님) ─ */
    '@media (max-width: 900px) { header img[alt*="보아스"] { height: 92px !important; } }',
    '@media (max-width: 560px) { header img[alt*="보아스"] { height: 72px !important; } }',
    /* ─ BZ STORY 페이지네이션 버튼 ─ */
    '.st-page-btn { min-width: 36px; height: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; color: var(--text-primary); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 15px; cursor: pointer; background: none; border: none; transition: background 140ms; }',
    '.st-page-btn:hover { background: var(--teal-50); }',
    '.st-page-btn.active { background: var(--teal-700); color: var(--gray-0); font-weight: 600; }',
    '.st-page-arrow { padding: 8px 12px; font-size: 15px; color: var(--text-primary); cursor: pointer; background: none; border: none; }',
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
      (block.caption ? '<figcaption style="margin-top: 8px; font-size: 15px; color: var(--text-tertiary); text-align: center; overflow-wrap: anywhere;">' + block.caption + '</figcaption>' : '') +
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
            '<h3 style="font-size: 22px; font-weight: 600; margin: 12px 0; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary);">' + r.title + '</h3>' +
            '<p style="font-size: 17.5px; line-height: 1.7; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + r.summary + '</p>' +
            '<div style="margin-top: auto; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: var(--text-tertiary);">' +
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
    var timer = null;
    var HERO_INTERVAL = 3000;
    var gauges = slidenav ? slidenav.querySelectorAll('.hero-gauge') : [];

    function showHero(n) {
      idx = ((n % slides.length) + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      gauges.forEach(function (g, i) {
        var fill = g.querySelector('.hero-gauge-fill');
        g.classList.remove('active', 'done');
        if (fill) { fill.style.animation = 'none'; fill.offsetHeight; fill.style.animation = ''; fill.style.width = ''; }
        if (i < idx) { g.classList.add('done'); }
        if (i === idx) { g.classList.add('active'); }
      });
    }

    function stopHeroTimer() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    function startHeroTimer() {
      stopHeroTimer();
      timer = setTimeout(function () {
        if (document.hidden) return;
        showHero(idx + 1);
        startHeroTimer();
      }, HERO_INTERVAL);
    }

    if (slidenav) {
      Array.prototype.forEach.call(slidenav.querySelectorAll('.hero-slidenav-btn'), function (btn) {
        btn.addEventListener('click', function () {
          showHero(idx + parseInt(btn.getAttribute('data-dir'), 10));
          startHeroTimer();
        });
      });
      gauges.forEach(function (g) {
        g.addEventListener('click', function () {
          showHero(parseInt(g.getAttribute('data-hero-gauge'), 10));
          startHeroTimer();
        });
      });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stopHeroTimer(); }
      else { showHero(idx); startHeroTimer(); }
    });

    showHero(0);
    startHeroTimer();
  }

  // ─── 사업분야 슬라이더 ───
  var bizSlider = document.getElementById('biz-slider');
  if (bizSlider) {
    var bizSlides = bizSlider.querySelectorAll('.biz-slide');
    var bizTrack = bizSlider.querySelector('.biz-slider-track');
    var bizDots = bizSlider.querySelectorAll('.biz-dot');
    var bizIdx = 0;
    function showBiz(n) {
      bizIdx = ((n % bizSlides.length) + bizSlides.length) % bizSlides.length;
      bizTrack.style.transform = 'translateX(-' + (bizIdx * 100) + '%)';
      bizSlides.forEach(function (s, i) { s.classList.toggle('active', i === bizIdx); });
      bizDots.forEach(function (d, i) { d.classList.toggle('active', i === bizIdx); });
    }
    bizSlider.querySelectorAll('.biz-slider-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showBiz(bizIdx + parseInt(btn.getAttribute('data-biz-dir'), 10));
      });
    });
    bizDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showBiz(parseInt(dot.getAttribute('data-biz-dot'), 10));
      });
    });
    showBiz(0);
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
            '<div style="position: absolute; top: 14px; left: 14px; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; color: var(--teal-800); background: rgba(255, 255, 255, 0.92); padding: 4px 10px; border-radius: var(--radius-pill);">' + s.category + '</div>' +
          '</div>' +
          '<div style="padding: 26px 28px 28px;">' +
            '<h3 style="font-size: 21px; font-weight: 600; margin: 0px 0px 12px; line-height: 1.45; letter-spacing: -0.01em; color: var(--text-primary);">' + s.title + '</h3>' +
            '<p style="font-size: 16.5px; line-height: 1.65; color: var(--text-secondary); margin: 0 0 18px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + s.summary + '</p>' +
            '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 14.5px; color: var(--text-tertiary);">' +
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
      ? '<div class="company-slide-logo" style="width: 192px; height: 192px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border-radius: var(--radius-md, 8px); box-sizing: border-box; padding: 14px;"><img src="' + item.logo + '" alt="' + item.name + '" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>'
      : '<div style="width: 96px; height: 96px; border-radius: var(--radius-md); background: var(--gray-0); border: 1px dashed var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); margin-bottom: 10px;">' + companyPlaceholderIcon + '</div>';
    var bg = item.logo ? '' : 'background: repeating-linear-gradient(45deg, var(--gray-50), var(--gray-50) 8px, var(--gray-0) 8px, var(--gray-0) 16px);';
    var inner = '<div class="company-slide-cell" style="min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 24px; ' + bg + '">' +
        mediaHTML +
        '<div style="color: var(--text-primary); font-size: 15px; font-weight: 500; text-align: center; letter-spacing: -0.01em;">' + item.name + '</div>' +
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

  // ── 서브페이지 메뉴 클릭 시 자동 스크롤 ──
  (function initSubnavScroll() {
    var subnav = document.querySelector('.subnav');
    if (!subnav) return;

    // 페이지 로드 시 sessionStorage 확인 후 스크롤
    if (sessionStorage.getItem('subnav-scroll')) {
      sessionStorage.removeItem('subnav-scroll');
      requestAnimationFrame(function () {
        var main = document.querySelector('main');
        if (!main) return;
        var top = main.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    }

    // subnav 링크 클릭 시 sessionStorage에 플래그 저장
    var links = subnav.querySelectorAll('a[href]');
    links.forEach(function (a) {
      if (a.classList.contains('active')) return;
      a.addEventListener('click', function () {
        sessionStorage.setItem('subnav-scroll', '1');
      });
    });
  })();

  // ── 스크롤 등장 효과(fade-up) ──
  // CSS로 숨기는 것은 html.reveal-ready가 붙은 뒤부터이므로, 이 스크립트가 실행되지 않으면
  // 콘텐츠는 처음부터 그대로 보인다. 한 번 나타난 요소는 관찰을 해제해 재등장(깜빡임)이 없다.
  (function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var groups = [];

    // 메인페이지: 히어로(#home)를 제외한 각 섹션의 콘텐츠 블록
    Array.prototype.forEach.call(document.querySelectorAll('section'), function (sec) {
      if (sec.id === 'home' || sec.classList.contains('sub-hero')) return;
      var host = sec.querySelector('.container') || sec;
      var kids = Array.prototype.filter.call(host.children, function (el) {
        return el.nodeType === 1 && el.offsetHeight > 0;
      });
      if (kids.length) groups.push(kids);
    });

    // 서브페이지 상단 제목(eyebrow · 제목 · 브레드크럼)
    var subHero = document.querySelector('.sub-hero .container');
    if (subHero) groups.push(Array.prototype.slice.call(subHero.children));

    if (!groups.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    document.documentElement.classList.add('reveal-ready');
    groups.forEach(function (kids) {
      kids.forEach(function (el, i) {
        el.classList.add('reveal');
        // 같은 묶음은 90ms 간격으로 순차 등장 (최대 4단계까지만 지연)
        var step = Math.min(i, 4);
        if (step) el.style.transitionDelay = (step * 90) + 'ms';
        io.observe(el);
      });
    });

    // 안전장치: 어떤 이유로든 관찰자 콜백이 동작하지 않은 경우(백그라운드 탭에서 로드된 뒤
    // 복귀하지 않는 등) 화면에 들어와 있는 콘텐츠가 계속 숨겨진 상태로 남지 않게 한다.
    setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-visible)'), function (el) {
        var b = el.getBoundingClientRect();
        if (b.top < window.innerHeight && b.bottom > 0) {
          el.style.transitionDelay = '';
          el.classList.add('is-visible');
        }
      });
    }, 2500);
  })();

  // ── 팝업(공지) 창 ──
  // data/popup.json의 팝업 목록을 읽어 조건을 만족하는 팝업만 표시한다.
  // 활성 팝업이 여러 개면 한 번에 하나씩 보여주고 이전/다음으로 이동한다.
  // 파일이 없거나 표시할 팝업이 없으면 아무 동작도 하지 않는다.
  (function initPopup() {
    var STORE_KEY = 'boaz-popup-hidden';

    // ── 날짜: "YYYY-MM-DD"를 로컬 시간대 기준으로 만든다 ──
    // new Date("2026-07-30")은 UTC 자정으로 해석되어 KST에서는 그날 09:00이 되므로
    // 로컬 자정과 비교하면 시작일 당일 내내 "아직 시작 안 됨"으로 잘못 판정된다.
    function localDate(str, endOfDay) {
      var m = String(str).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (!m) return null;
      return endOfDay
        ? new Date(+m[1], +m[2] - 1, +m[3], 23, 59, 59, 999)
        : new Date(+m[1], +m[2] - 1, +m[3], 0, 0, 0, 0);
    }
    function inDateRange(p) {
      var now = new Date();
      var start = p.startDate ? localDate(p.startDate, false) : null;
      var end = p.endDate ? localDate(p.endDate, true) : null;
      if (start && now < start) return false;   // 시작일 00:00:00.000부터
      if (end && now > end) return false;       // 종료일 23:59:59.999까지
      return true;
    }
    // enabled가 문자열 "false"/"0"으로 저장돼도 안전하게 처리
    function isOn(v) {
      if (v === undefined || v === null) return false;
      if (typeof v === 'string') return !/^(false|0|no|off|)$/i.test(v.trim());
      return !!v;
    }
    // 경로를 현재 문서 기준으로 해석한다.
    // 앞에 '/'가 붙은 경로는 GitHub Pages 프로젝트 경로(/boaz-website/)를 벗어나므로
    // 선행 슬래시를 떼고 문서 기준으로 다시 해석한다. 전체 URL은 그대로 둔다.
    function resolveAssetUrl(u) {
      if (!u) return '';
      var s = String(u).trim();
      if (/^(https?:)?\/\//i.test(s) || /^(data|mailto|tel):/i.test(s)) return s;
      try { return new URL(s.replace(/^\/+/, ''), document.baseURI).href; }
      catch (e) { return s.replace(/^\/+/, ''); }
    }
    // javascript: 등 위험한 주소는 버튼을 만들지 않는다
    function safeUrl(u) {
      if (!u) return '';
      var s = String(u).trim();
      if (/^\s*javascript:/i.test(s) || /^\s*data:/i.test(s)) return '';
      if (/^(https?:\/\/|mailto:|tel:)/i.test(s)) return s;
      return /^[\w./?#&=%~-]/.test(s) ? resolveAssetUrl(s) : '';
    }

    // ── 하위 호환 정규화 ──
    // 새 구조:   { "popups": [ {id, enabled, order, title, content, images:[{src,alt}], ...} ] }
    // 옛 구조:   { enabled, title, body, image, linkLabel, linkUrl, width, ... }  ← 단일 팝업
    // 옛 필드명을 새 이름으로 옮겨 담아 기존에 등록된 팝업도 그대로 표시된다.
    function normalizeImages(raw, single) {
      var list = [];
      if (Array.isArray(raw)) {
        raw.forEach(function (it) {
          if (!it) return;
          if (typeof it === 'string') { list.push({ src: it, alt: '' }); }
          else if (it.src) { list.push({ src: it.src, alt: it.alt || '' }); }
          else if (it.image) { list.push({ src: it.image, alt: it.alt || '' }); }
        });
      } else if (typeof raw === 'string' && raw) {
        list.push({ src: raw, alt: '' });
      }
      // 옛 단일 image 필드
      if (!list.length && typeof single === 'string' && single) {
        list.push({ src: single, alt: '' });
      }
      return list;
    }
    function normalize(data) {
      var arr;
      if (data && Array.isArray(data.popups)) arr = data.popups;
      else if (Array.isArray(data)) arr = data;
      else if (data && typeof data === 'object') arr = [data];   // 옛 단일 팝업 구조
      else arr = [];

      return arr.map(function (p, i) {
        p = p || {};
        return {
          id: String(p.id || p.slug || ('popup-' + (i + 1))),
          enabled: isOn(p.enabled),
          order: (p.order === 0 || p.order) ? Number(p.order) : (i + 1),
          // 제목은 앞뒤 공백을 떼어낸다. 가운데 정렬이므로 수동으로 넣은 정렬용 공백이
          // 남아 있으면 오히려 중심이 어긋난다.
          title: String(p.title || '').trim(),
          content: p.content || p.body || '',
          images: normalizeImages(p.images, p.image),
          buttonText: p.buttonText || p.linkLabel || '',
          buttonUrl: p.buttonUrl || p.linkUrl || '',
          startDate: p.startDate || '',
          endDate: p.endDate || '',
          showOn: p.showOn || 'home',
          maxWidth: parseInt(p.maxWidth || p.width, 10) || 460
        };
      });
    }

    // ── 팝업별 '오늘 하루 보지 않기' ──
    // { "<popup id>": { fp: "<콘텐츠 지문>", until: <시각> }, ... }
    // 팝업마다 독립이라 1번을 숨겨도 2번은 표시된다.
    // 옛 형식({fp, until} 단일 객체)이 남아 있어도 오류 없이 무시된다.
    function readStore() {
      try {
        var raw = window.localStorage.getItem(STORE_KEY);
        if (!raw) return {};
        var s = JSON.parse(raw);
        if (!s || typeof s !== 'object' || Array.isArray(s)) return {};
        if (s.fp && s.until) return {};   // 옛 단일 팝업 형식 → 무시
        return s;
      } catch (e) { return {}; }
    }
    function writeStore(store) {
      try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
      catch (e) { /* 시크릿 모드 등 저장 실패는 무시 */ }
    }
    // 제목·본문·이미지·버튼·기간이 바뀌면 지문이 달라져
    // 이전 숨김 기록이 새 내용을 막지 않는다.
    function fingerprint(p) {
      var raw = [p.title, p.content, JSON.stringify(p.images), p.buttonText,
                 p.buttonUrl, p.startDate, p.endDate].join('|');
      var h = 5381;
      for (var i = 0; i < raw.length; i++) { h = ((h << 5) + h + raw.charCodeAt(i)) | 0; }
      return (h >>> 0).toString(36);
    }
    function isSuppressed(p, store) {
      var s = store[p.id];
      return !!(s && s.fp === fingerprint(p) && Date.now() < s.until);
    }
    function suppressToday(p, store) {
      var end = new Date(); end.setHours(23, 59, 59, 999);
      store[p.id] = { fp: fingerprint(p), until: end.getTime() };
      writeStore(store);
    }

    fetch('data/popup.json', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('popup.json 응답 ' + r.status + ' (' + r.url + ')');
        return r.json();
      })
      .then(function (data) {
        var store = readStore();
        var isHome = !!document.getElementById('home');

        var list = normalize(data)
          .filter(function (p) {
            if (!p.enabled) return false;
            if (!inDateRange(p)) return false;
            if (p.showOn !== 'all' && !isHome) return false;      // 'home' = 메인만
            if (!p.title && !p.content && !p.images.length) return false;
            if (isSuppressed(p, store)) return false;
            return true;
          })
          // 관리자에서 정한 표시 순서 적용 (같으면 원래 순서 유지)
          .sort(function (a, b) { return a.order - b.order; });

        if (!list.length) return;

        var idx = 0;
        var lastFocused = document.activeElement;

        var overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        var panel = document.createElement('div');
        panel.className = 'popup-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-labelledby', 'popup-title');
        overlay.appendChild(panel);

        // 팝업 하나를 패널 안에 그린다 (여러 개일 때는 같은 패널을 갈아끼운다)
        function render() {
          var p = list[idx];
          panel.style.maxWidth = p.maxWidth + 'px';
          panel.innerHTML = '';

          // 머리말: 제목(가운데) + 닫기 버튼(우측 상단 absolute)
          var head = document.createElement('div');
          head.className = 'popup-head';
          var h = document.createElement('h2');
          h.className = 'popup-title';
          h.id = 'popup-title';
          h.textContent = p.title || '';
          var closeBtn = document.createElement('button');
          closeBtn.className = 'popup-close';
          closeBtn.type = 'button';
          closeBtn.setAttribute('aria-label', '팝업 닫기');
          closeBtn.innerHTML = '&times;';
          head.appendChild(h);
          head.appendChild(closeBtn);
          panel.appendChild(head);

          // 본문: 이미지 여러 장을 등록 순서대로 세로 표시한 뒤 글 → 버튼
          var body = document.createElement('div');
          body.className = 'popup-body';
          if (p.images.length) {
            var wrap = document.createElement('div');
            wrap.className = 'popup-images';
            p.images.forEach(function (im, n) {
              var img = document.createElement('img');
              img.className = 'popup-img';
              img.src = resolveAssetUrl(im.src);
              img.alt = im.alt || (p.title ? p.title + ' 이미지 ' + (n + 1) : '공지 이미지 ' + (n + 1));
              img.loading = n === 0 ? 'eager' : 'lazy';
              img.addEventListener('error', function () {
                img.style.display = 'none';
                if (window.console) console.error('[팝업] 이미지를 불러올 수 없습니다:', img.src);
              });
              wrap.appendChild(img);
            });
            body.appendChild(wrap);
          }
          if (p.content) {
            var txt = document.createElement('p');
            txt.className = 'popup-text';
            txt.textContent = p.content;   // textContent + white-space: pre-line → 줄바꿈 유지
            body.appendChild(txt);
          }
          var url = safeUrl(p.buttonUrl);
          if (url && p.buttonText) {
            var a = document.createElement('a');
            a.className = 'popup-link';
            a.href = url;
            a.textContent = p.buttonText;
            if (/^https?:\/\//i.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
            a.addEventListener('click', function () { closeAll(); });
            body.appendChild(a);
          }
          panel.appendChild(body);

          // 이전/다음 이동 — 팝업이 2개 이상일 때만 만든다
          if (list.length > 1) {
            var nav = document.createElement('div');
            nav.className = 'popup-nav';
            var prev = document.createElement('button');
            prev.className = 'popup-nav-btn';
            prev.type = 'button';
            prev.textContent = '‹ 이전';
            prev.disabled = idx === 0;
            var count = document.createElement('span');
            count.className = 'popup-count';
            count.textContent = (idx + 1) + ' / ' + list.length;
            count.setAttribute('aria-live', 'polite');
            var next = document.createElement('button');
            next.className = 'popup-nav-btn';
            next.type = 'button';
            next.textContent = '다음 ›';
            next.disabled = idx === list.length - 1;
            prev.addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
            next.addEventListener('click', function () { if (idx < list.length - 1) { idx++; render(); } });
            nav.appendChild(prev);
            nav.appendChild(count);
            nav.appendChild(next);
            panel.appendChild(nav);
          }

          // 하단: 오늘 하루 보지 않기 + 닫기 (+ 여러 개면 전체 닫기)
          var foot = document.createElement('div');
          foot.className = 'popup-foot';
          var label = document.createElement('label');
          label.className = 'popup-hide';
          var cb = document.createElement('input');
          cb.type = 'checkbox';
          var span = document.createElement('span');
          span.textContent = '오늘 하루 보지 않기';
          label.appendChild(cb);
          label.appendChild(span);
          var right = document.createElement('div');
          right.style.cssText = 'display: flex; align-items: center; gap: 10px;';
          if (list.length > 1) {
            var closeAllBtn = document.createElement('button');
            closeAllBtn.className = 'popup-closeall';
            closeAllBtn.type = 'button';
            closeAllBtn.textContent = '전체 닫기';
            closeAllBtn.addEventListener('click', function () {
              if (cb.checked) suppressToday(p, store);   // 지금 보고 있는 팝업만 체크 상태 반영
              closeAll();
            });
            right.appendChild(closeAllBtn);
          }
          var dismiss = document.createElement('button');
          dismiss.className = 'popup-dismiss';
          dismiss.type = 'button';
          dismiss.textContent = '닫기';
          dismiss.addEventListener('click', function () { closeCurrent(cb.checked); });
          right.appendChild(dismiss);
          foot.appendChild(label);
          foot.appendChild(right);
          panel.appendChild(foot);

          closeBtn.addEventListener('click', function () { closeCurrent(cb.checked); });
          body.scrollTop = 0;
          closeBtn.focus();
        }

        function teardown() {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
          document.removeEventListener('keydown', onKey);
          setTimeout(function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 240);
          if (lastFocused && lastFocused.focus) lastFocused.focus();
        }
        // 현재 팝업만 닫는다. 남은 팝업이 있으면 다음 팝업으로 넘어간다.
        function closeCurrent(hideToday) {
          if (hideToday) suppressToday(list[idx], store);
          list.splice(idx, 1);
          if (!list.length) { teardown(); return; }
          if (idx > list.length - 1) idx = list.length - 1;
          render();
        }
        function closeAll() { teardown(); }
        // ESC는 항상 '지금 보고 있는 팝업'만 닫는다 (체크 상태는 반영하지 않음)
        function onKey(e) { if (e.key === 'Escape') closeCurrent(false); }

        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCurrent(false); });
        document.addEventListener('keydown', onKey);

        document.body.appendChild(overlay);
        render();
        // rAF에 의존하지 않고 강제 리플로우로 초기 상태를 확정한 뒤 여는 클래스를 붙인다
        // (백그라운드 탭처럼 프레임이 그려지지 않는 상황에서도 팝업이 열린 상태가 됨)
        overlay.offsetHeight;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      })
      // 방문자 화면에는 아무것도 띄우지 않고, 개발자 콘솔에만 원인을 남긴다
      .catch(function (e) {
        if (window.console) console.error('[팝업] 표시 실패:', e && e.message ? e.message : e);
      });
  })();
  // ── 모바일 햄버거 메뉴 ──
  (function initMobileMenu() {
    var header = document.querySelector('header');
    if (!header) return;
    var nav = header.querySelector('nav');
    if (!nav) return;

    var btn = document.createElement('button');
    btn.className = 'mob-menu-btn';
    btn.setAttribute('aria-label', '메뉴 열기');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    nav.parentNode.appendChild(btn);

    var backdrop = document.createElement('div');
    backdrop.className = 'mob-backdrop';
    document.body.appendChild(backdrop);

    var sidebar = document.createElement('div');
    sidebar.className = 'mob-sidebar';
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-label', '모바일 메뉴');

    var menuItems = [
      { label: '회사소개', children: [
        { label: '인사말 및 연혁', href: 'greeting.html' },
        { label: '조직도', href: 'org.html' },
        { label: '고객사', href: 'customers.html' },
        { label: '협력사', href: 'partners.html' }
      ]},
      { label: '사업분야', children: [
        { label: '대기측정 및 분석', href: 'biz-air.html' },
        { label: '보유장비 현황', href: 'biz-equipment.html' },
        { label: '관련기관', href: 'biz-partners.html' }
      ]},
      { label: 'BZ STORY', href: 'story.html' },
      { label: 'BZ 이용후기', href: 'review.html' }
    ];

    var html = '<div class="mob-sidebar-head">' +
      '<img src="assets/logo.svg" alt="보아스환경기술" style="height: 48px;">' +
      '<button class="mob-sidebar-close" aria-label="닫기">&times;</button>' +
      '</div><nav class="mob-sidebar-nav">';

    menuItems.forEach(function (item) {
      if (item.children) {
        html += '<div class="mob-nav-item">' +
          '<button class="mob-nav-link">' + item.label + '<span class="mob-arrow">▾</span></button>' +
          '<div class="mob-sub-menu">';
        item.children.forEach(function (child) {
          html += '<a href="' + child.href + '">' + child.label + '</a>';
        });
        html += '</div></div>';
      } else {
        html += '<div class="mob-nav-item"><a class="mob-nav-link" href="' + item.href + '">' + item.label + '</a></div>';
      }
    });

    html += '</nav>' +
      '<a class="mob-sidebar-kakao" href="https://pf.kakao.com/_tnRdG" target="_blank" rel="noopener">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.87 5.36 4.68 6.78L5.5 21.5c-.1.3.24.55.5.37L10.6 19.1c.46.05.93.08 1.4.08 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/></svg>' +
      '카카오톡 상담</a>';

    sidebar.innerHTML = html;
    document.body.appendChild(sidebar);

    var closeBtn = sidebar.querySelector('.mob-sidebar-close');
    var accordions = sidebar.querySelectorAll('.mob-nav-item button.mob-nav-link');

    function openMenu() {
      sidebar.classList.add('open');
      backdrop.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
    });

    accordions.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var parent = toggle.parentElement;
        parent.classList.toggle('open');
      });
    });
  })();

})();
