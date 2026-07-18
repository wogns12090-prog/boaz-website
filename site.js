// 보아스환경기술 홈페이지 - 정적 사이트 인터랙션 + 후기 데이터 렌더링
(function () {

  // ── 유틸: 별점 문자열 ──
  function starsFor(rating) {
    var r = Math.round(rating);
    return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r);
  }
  function fmtDate(d) {
    if (!d) return '';
    return d.replace(/-/g, '.');
  }

  // ── 일반 텍스트 본문 → 문단 HTML ──
  function renderPlainBody(text) {
    if (!text) return '';
    var blocks = text.split(/\n\s*\n/);
    return blocks.map(function (block) {
      block = block.trim();
      if (!block) return '';
      return '<p style="margin: 0 0 20px; color: var(--text-secondary);">' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  // ── 본문 사진 갤러리 HTML ──
  function renderBodyGallery(images) {
    if (!images || !images.length) return '';
    var items = images.map(function (item) {
      if (!item || !item.img) return '';
      return '<figure style="margin: 0;">' +
        '<img src="' + item.img + '" alt="' + (item.caption || '') + '" loading="lazy" style="width: 100%; height: auto; border-radius: var(--radius-lg); display: block;">' +
        (item.caption ? '<figcaption style="margin-top: 8px; font-size: 13px; color: var(--text-tertiary); text-align: center;">' + item.caption + '</figcaption>' : '') +
        '</figure>';
    }).join('');
    return '<div style="margin: 28px 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">' + items + '</div>';
  }

  function reviewImageHTML(r, aspectStyle) {
    if (r.image) {
      return '<div style="' + aspectStyle + ' width: 100%; height: 100%; min-height: 100px; background-color: var(--teal-200); background-image: url(' + r.image + '); background-size: cover; background-position: center;"></div>';
    }
    return '<div style="' + aspectStyle + ' background: linear-gradient(135deg, var(--teal-300), var(--teal-600)); display: flex; align-items: center; justify-content: center;">' +
      '<span style="position: absolute; bottom: 10px; right: 12px; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.35); padding: 3px 8px; border-radius: 4px;">REVIEW PHOTO</span>' +
      '</div>';
  }

  // ── 홈 캐러셀 카드 HTML ──
  function homeCardHTML(r) {
    return '' +
      '<a href="review-detail.html?id=' + encodeURIComponent(r.id) + '" style="display: block; background: var(--gray-0); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; transition: box-shadow var(--duration-base) var(--ease-out); color: inherit;">' +
        reviewImageHTML(r, 'aspect-ratio: 16 / 10; position: relative;') +
        '<div style="padding: 20px 22px;">' +
          '<div style="display:flex; align-items:center; gap:8px;">' +
            '<span style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--teal-700);">' + r.rating.toFixed(1) + '</span>' +
            '<span style="letter-spacing: 2px; color: var(--warn); font-size: 14px;">' + starsFor(r.rating) + '</span>' +
            '<span style="margin-left:auto; font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary);">' + r.rating.toFixed(1) + ' / 5.0</span>' +
          '</div>' +
          '<h3 style="font-size: 16px; font-weight: 600; margin: 10px 0 8px; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary);">' + r.title + '</h3>' +
          '<p style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + r.summary + '</p>' +
          '<div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display:flex; justify-content: space-between; align-items:center; font-size: 12px; color: var(--text-tertiary);">' +
            '<span><span style="color: var(--text-primary); font-weight: 500;">' + r.author + '</span> · ' + r.industry + '</span>' +
            '<span style="font-family: var(--font-mono);">' + fmtDate(r.date) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  // ── 목록 페이지 카드 HTML (가로형) ──
  function listCardHTML(r) {
    var imgArea = r.image
      ? '<div style="width: 100%; height: 100%; min-height: 120px; background-color: var(--teal-200); background-image: url(' + r.image + '); background-size: cover; background-position: center;"></div>'
      : '<div style="background: linear-gradient(135deg, var(--teal-300), var(--teal-600)); display: flex; align-items: center; justify-content: center; color: var(--gray-0);">' +
          '<svg fill="none" height="36" stroke="currentColor" stroke-width="1.25" style="opacity:0.7" viewBox="0 0 24 24" width="36"><rect height="14" rx="2" width="18" x="3" y="4"></rect><path d="M7 8h4M7 12h6M15 8h2M15 12h2"></path></svg>' +
        '</div>';
    return '' +
      '<a href="review-detail.html?id=' + encodeURIComponent(r.id) + '" style="display: block; color: inherit;">' +
        '<article class="card" style="display: grid; grid-template-columns: 160px 1fr; overflow: hidden; height: 100%;">' +
          imgArea +
          '<div style="padding: 20px 22px; display: flex; flex-direction: column;">' +
            '<div style="display:flex; align-items:center; gap:8px;">' +
              '<span style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--teal-700);">' + r.rating.toFixed(1) + '</span>' +
              '<span style="letter-spacing: 2px; color: var(--warn); font-size: 14px;">' + starsFor(r.rating) + '</span>' +
            '</div>' +
            '<h3 style="font-size: 16px; font-weight: 600; margin: 8px 0; line-height: 1.4; letter-spacing: -0.01em; color: var(--text-primary);">' + r.title + '</h3>' +
            '<p style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + r.summary + '</p>' +
            '<div style="margin-top: auto; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-tertiary);">' +
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
        return 3;
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
      bodyEl.innerHTML = renderPlainBody(r.body || r.summary || '') + renderBodyGallery(r.bodyImages);
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
      ? '<div style="aspect-ratio: 16 / 10; position: relative; background-color: var(--teal-200); background-image: url(' + s.image + '); background-size: cover; background-position: center;">'
      : '<div style="aspect-ratio: 16 / 10; background: linear-gradient(135deg, var(--teal-100), var(--teal-300)); position: relative;">';
    return '' +
      '<a class="story-card" data-story-cat="' + cat + '" href="story-detail.html?id=' + encodeURIComponent(s.id) + '" style="display: block; color: inherit;">' +
        '<article class="card" style="overflow: hidden; height: 100%; transition: box-shadow var(--duration-base) var(--ease-out);">' +
          imgArea +
            '<div style="position: absolute; top: 14px; left: 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: var(--teal-800); background: rgba(255, 255, 255, 0.92); padding: 4px 10px; border-radius: var(--radius-pill);">' + s.category + '</div>' +
          '</div>' +
          '<div style="padding: 22px 24px 24px;">' +
            '<h3 style="font-size: 17px; font-weight: 600; margin: 0px 0px 10px; line-height: 1.45; letter-spacing: -0.01em; color: var(--text-primary);">' + s.title + '</h3>' +
            '<p style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary); margin: 0 0 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' + s.summary + '</p>' +
            '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-tertiary);">' +
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
      bodyEl.innerHTML = renderPlainBody(s.body || s.summary || '') + renderBodyGallery(s.bodyImages);

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
})();
