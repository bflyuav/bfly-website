/* =============================================
   BFL'Y — gallery.js
   Translations · Filter pills · Lightbox
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== TRANSLATIONS ===== */
  const galleryTranslations = {
    en: {
      gallery_eyebrow:    'Visual Archive',
      gallery_title:      'Gallery',
      gallery_accent:     'Gallery',
      gallery_desc:       'Photos from our build process, test flights, and competition days.',
      gallery_filter_all: 'All',
      gallery_filter_flight:  'Flight',
      gallery_filter_build:   'Build',
      gallery_filter_team:    'Team',
      gallery_filter_comp:    'Competition',
      gallery_coming_soon:    'Photos coming soon',
    },
    tr: {
      gallery_eyebrow:    'Görsel Arşiv',
      gallery_title:      'Galeri',
      gallery_accent:     'Galeri',
      gallery_desc:       'Üretim sürecimizden, test uçuşlarından ve yarışma günlerinden kareler.',
      gallery_filter_all: 'Tümü',
      gallery_filter_flight:  'Uçuş',
      gallery_filter_build:   'Üretim',
      gallery_filter_team:    'Takım',
      gallery_filter_comp:    'Yarışma',
      gallery_coming_soon:    'Fotoğraflar yakında',
    }
  };

  if (window.BFLY_TRANSLATIONS) {
    Object.keys(galleryTranslations).forEach(lang => {
      Object.assign(window.BFLY_TRANSLATIONS[lang], galleryTranslations[lang]);
    });
    if (window.applyLanguage) applyLanguage(window.BFLY_CURRENT_LANG || 'en');
  }

  /* ===== GALLERY DATA =====
     Fotoğraflar bflyuav.com/yonetim/ sayfasından (Galeri sekmesi) eklenir
     ve sıralanır. Liste portalın Supabase'inde (site_gallery, herkese açık);
     dosyalar "site" klasöründe: galeri/<id>.jpg, küçüğü galeri/<id>-k.jpg
  ===== */
  const SUPA = 'https://bzkgwrualpstpqmmqcug.supabase.co';
  const SUPA_KEY = 'sb_publishable_qKVIZbIBB3ms2NGX5uCGjA_y1D3vy2U';   // herkese açık anahtar (gizli değil)
  let PHOTOS = null;   // null: yükleniyor

  function loadPhotos() {
    const file = (path) => `${SUPA}/storage/v1/object/public/site/${path}`;
    return fetch(`${SUPA}/rest/v1/site_gallery?select=path,category,caption_tr,caption_en&order=sort_order.asc`,
      { headers: { apikey: SUPA_KEY } })
      .then(r => (r.ok ? r.json() : []))
      .catch(() => [])
      .then(rows => rows.map(r => ({
        src: file(r.path.replace(/\.(jpg|png|webp)$/, '-k.jpg')),
        full: file(r.path),
        caption_tr: r.caption_tr, caption_en: r.caption_en,
        category: r.category,
      })));
  }

  /* ===== HELPERS ===== */
  function t(key) {
    const lang = window.BFLY_CURRENT_LANG || 'en';
    return window.BFLY_TRANSLATIONS?.[lang]?.[key] ?? key;
  }

  function field(obj, key) {
    const lang = window.BFLY_CURRENT_LANG || 'en';
    return obj[`${key}_${lang}`] || obj[`${key}_tr`] || obj[`${key}_en`] || '';
  }

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ===== FILTER PILLS ===== */
  const FILTERS = ['all', 'flight', 'build', 'team', 'competition'];

  function buildFilters() {
    const wrap = document.getElementById('gallery-filters');
    if (!wrap) return;
    wrap.innerHTML = FILTERS.map((f, i) =>
      `<button class="gallery-pill${i === 0 ? ' active' : ''}" data-filter="${f}">
        ${t(`gallery_filter_${f}`)}
      </button>`
    ).join('');

    wrap.addEventListener('click', e => {
      const pill = e.target.closest('.gallery-pill');
      if (!pill) return;
      wrap.querySelectorAll('.gallery-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderGrid(pill.dataset.filter);
    });
  }

  /* ===== RENDER GRID ===== */
  function renderGrid(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (PHOTOS === null) { grid.innerHTML = ''; return; }

    const filtered = (filter === 'all')
      ? PHOTOS
      : PHOTOS.filter(p => p.category === filter);

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="color:var(--text-muted);font-family:var(--font-display);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;padding:48px 0;">${t('gallery_coming_soon')}</p>`;
      return;
    }

    grid.innerHTML = filtered.map((photo, i) => {
      const caption = field(photo, 'caption');
      return `
        <div class="gallery-item" data-index="${i}" data-category="${photo.category}">
          <img src="${esc(photo.src)}" data-full="${esc(photo.full)}" alt="${esc(caption || "BFL'Y")}" loading="lazy"
            onerror="this.onerror=null;this.src=this.dataset.full" />
          <span class="gallery-tag">${t(`gallery_filter_${photo.category}`)}</span>
          ${caption ? `<span class="gallery-caption">${esc(caption)}</span>` : ''}
        </div>`;
    }).join('');

    /* Re-index for lightbox after filtering */
    buildLightboxList();

    /* Attach click listeners */
    grid.querySelectorAll('.gallery-item:not(.placeholder)').forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });
  }

  /* ===== LIGHTBOX ===== */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const lightboxCap   = document.getElementById('lightboxCaption');
  const lightboxCount = document.getElementById('lightboxCounter');

  let images = [];
  let currentIndex = 0;

  function buildLightboxList() {
    images = Array.from(
      document.querySelectorAll('.gallery-item:not(.placeholder) img')
    );
  }

  function openLightbox(index) {
    if (!images.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCap)   lightboxCap.textContent   = img.closest('.gallery-item')?.querySelector('.gallery-caption')?.textContent || '';
    if (lightboxCount) lightboxCount.textContent  = `${currentIndex + 1} / ${images.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext)  lightboxNext.addEventListener('click', showNext);

  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (lightbox?.hasAttribute('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });

  /* ===== LANG CHANGE ===== */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setTimeout(() => {
        buildFilters();
        const activePill = document.querySelector('.gallery-pill.active');
        renderGrid(activePill?.dataset.filter || 'all');
      }, 20);
    });
  }

  /* ===== INIT ===== */
  buildFilters();
  renderGrid('all');
  loadPhotos().then(photos => {
    PHOTOS = photos;
    renderGrid(document.querySelector('.gallery-pill.active')?.dataset.filter || 'all');
  });
});