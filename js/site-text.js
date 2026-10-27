/* =============================================
   BFL'Y — site-text.js
   bflyuav.com/yonetim/ "Metinler" sekmesinde değiştirilen yazıları
   uygular. Varsayılan yazılar kodda kalır:
     data-i18n="anahtar"   → BFLY_TRANSLATIONS (TR/EN)
     body data-hero-*      → sayfa başlığı (anahtar hero.<sayfa>.eyebrow|title|desc)
     data-text="anahtar"   → çeviri listesinde olmayan yazılar (ör. TurcoFighter, üye adları)
   Değiştirilenler portalın Supabase'inde (site_text, herkese açık).
   Son liste localStorage'da durur, sayfa açılır açılmaz uygulanır;
   yenisi gelince tekrar uygulanır. Panel varsayılanları okurken
   sayfayı ?varsayilan ile açar: o zaman hiçbir şey değişmez.
   components.js'ten sonra, sayfa betiklerinden önce yüklenir.
   ============================================= */

(function () {
  if (/[?&]varsayilan\b/.test(location.search)) return;

  var BASE = 'https://bzkgwrualpstpqmmqcug.supabase.co';
  var KEY = 'sb_publishable_qKVIZbIBB3ms2NGX5uCGjA_y1D3vy2U';   // herkese açık anahtar (gizli değil)
  var CACHE = 'bfly_metin';
  var PAGE = location.pathname.replace(/index\.html$/, '').replace(/^\/+|\/+$/g, '') || 'home';
  var T = window.BFLY_TRANSLATIONS;
  var rows = {};
  var pinned = {};        // 'tr:anahtar' → koddaki değer
  var heroDefaults = null;
  var textDefaults = new Map();

  // Yazı HTML olarak basılır; sadece satır sonu ve vurgu biçimlerine izin var
  function clean(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
      .replace(/&lt;(\/?)(em|strong|b|i)&gt;/gi, '<$1$2>')
      .replace(/&lt;(em|span) class=&quot;accent&quot;&gt;/gi, '<$1 class="accent">')
      .replace(/&lt;\/span&gt;/gi, '</span>')
      .replace(/\r?\n/g, '<br>');
  }

  function lang() {
    return window.BFLY_CURRENT_LANG || document.documentElement.lang || 'tr';
  }

  // Çeviri listesinde değiştirilen anahtar sabitlenir: sayfa betikleri kendi
  // varsayılanlarını sonradan Object.assign ile yazsa da değişiklik kalır
  function pin(l, key, value) {
    var obj = T && T[l];
    if (!obj) return;
    var id = l + ':' + key;
    if (!(id in pinned)) pinned[id] = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true, enumerable: true,
      get: function () { return value; },
      set: function (v) { pinned[id] = v; },
    });
  }

  function unpinAll() {
    Object.keys(pinned).forEach(function (id) {
      var i = id.indexOf(':');
      Object.defineProperty(T[id.slice(0, i)], id.slice(i + 1), {
        configurable: true, enumerable: true, writable: true, value: pinned[id],
      });
    });
    pinned = {};
  }

  function setHero() {
    var b = document.body;
    if (!b || b.dataset.pageHero !== 'true') return;
    var parts = ['Eyebrow', 'Title', 'Desc'];
    if (!heroDefaults) {
      heroDefaults = {};
      parts.forEach(function (p) {
        heroDefaults[p + 'Tr'] = b.dataset['hero' + p + 'Tr'];
        heroDefaults[p + 'En'] = b.dataset['hero' + p + 'En'];
      });
    }
    parts.forEach(function (p) {
      var r = rows['hero.' + PAGE + '.' + p.toLowerCase()] || {};
      ['Tr', 'En'].forEach(function (L) {
        var v = r[L.toLowerCase()];
        if (v) b.dataset['hero' + p + L] = clean(v);
        else if (heroDefaults[p + L] !== undefined) b.dataset['hero' + p + L] = heroDefaults[p + L];
      });
    });
  }

  function applyPlain() {
    var l = lang();
    document.querySelectorAll('[data-text]').forEach(function (el) {
      if (!textDefaults.has(el)) textDefaults.set(el, el.innerHTML);
      var r = rows[el.getAttribute('data-text')];
      var v = r && (l === 'en' ? r.en || r.tr : r.tr || r.en);
      var html = v ? clean(v) : textDefaults.get(el);
      if (el.innerHTML !== html) el.innerHTML = html;
    });
  }

  function apply(list) {
    rows = {};
    list.forEach(function (r) { rows[r.key] = r; });
    if (T) {
      unpinAll();
      list.forEach(function (r) {
        if (r.key.indexOf('hero.') === 0) return;
        if (r.tr) pin('tr', r.key, clean(r.tr));
        if (r.en) pin('en', r.key, clean(r.en));
      });
    }
    setHero();
  }

  if (typeof window.applyLanguage === 'function') {
    var original = window.applyLanguage;
    window.applyLanguage = function (l) {
      original(l);
      applyPlain();
    };
  }

  var cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE)); } catch (e) { /* yok ya da kapalı */ }
  if (Array.isArray(cached)) apply(cached);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyPlain);
  else applyPlain();

  fetch(BASE + '/rest/v1/site_text?select=key,tr,en&order=key.asc', { headers: { apikey: KEY } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (list) {
      if (!Array.isArray(list)) return;
      try { localStorage.setItem(CACHE, JSON.stringify(list)); } catch (e) { /* kapalı */ }
      if (JSON.stringify(list) === JSON.stringify(cached)) return;
      apply(list);
      if (document.readyState === 'loading') return;   // sayfanın kendi applyLanguage'ı uygular
      if (window.applyLanguage && T) window.applyLanguage(lang());
      else applyPlain();
    })
    .catch(function () { /* çevrimdışı ya da Supabase yok: yazılar olduğu gibi */ });
})();
