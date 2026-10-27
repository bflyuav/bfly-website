/* =============================================
   BFL'Y — site-media.js
   bflyuav.com/yonetim/ sayfasından yüklenen görsel ve videoları
   yerine koyar. Hangi alanların dolu olduğu portalın Supabase'inde
   (site_media tablosu, herkese açık); dosyalar "site" klasöründe.

   <img data-slot="df-zoom">            → src değişir (sadece görsel)
   <div data-slot-box="df-moduler">     → içine görsel ya da video konur
   <button data-slot="df-detay-kanat">  → akordeon görseli (window.BFLY_MEDIA'dan)

   Yükleme bitince 'bfly:media' olayı tetiklenir. Supabase'e
   ulaşılamazsa sayfa eskisi gibi kalır.
   ============================================= */

(function () {
  var BASE = 'https://bzkgwrualpstpqmmqcug.supabase.co';
  var KEY = 'sb_publishable_qKVIZbIBB3ms2NGX5uCGjA_y1D3vy2U';   // herkese açık anahtar (gizli değil)
  window.BFLY_MEDIA = {};

  function media(m) {
    var isVideo = m.type.indexOf('video/') === 0;
    var el = document.createElement(isVideo ? 'video' : 'img');
    if (isVideo) {
      el.muted = true;
      el.loop = true;
      el.autoplay = true;
      el.playsInline = true;
      el.setAttribute('muted', '');
      el.setAttribute('playsinline', '');
    } else {
      el.alt = '';
      el.loading = 'lazy';
    }
    el.src = m.url;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.objectFit = 'cover';
    el.style.display = 'block';
    return el;
  }

  function apply() {
    var M = window.BFLY_MEDIA;
    document.querySelectorAll('img[data-slot]').forEach(function (img) {
      var m = M[img.getAttribute('data-slot')];
      if (!m || m.type.indexOf('image/') !== 0) return;
      img.onerror = null;
      img.src = m.url;
      img.style.opacity = '';
      img.style.display = '';
      var showcase = img.closest('.design-drone-showcase');
      if (showcase) showcase.style.display = '';
      var fallback = document.getElementById('heroDroneFallback');
      if (fallback && img.id === 'heroDroneImg') fallback.style.display = 'none';
    });
    document.querySelectorAll('[data-slot-box]').forEach(function (box) {
      var m = M[box.getAttribute('data-slot-box')];
      if (!m) return;
      box.querySelectorAll(':scope > img, :scope > video, .feature-media-placeholder, .gallery-placeholder')
        .forEach(function (n) { n.remove(); });
      var el = media(m);
      box.insertBefore(el, box.firstChild);
      if (el.tagName === 'VIDEO') el.play && el.play().catch(function () {});
    });
  }

  fetch(BASE + '/rest/v1/site_media?select=slot,content_type,updated_at', { headers: { apikey: KEY } })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (rows) {
      rows.forEach(function (r) {
        window.BFLY_MEDIA[r.slot] = {
          url: BASE + '/storage/v1/object/public/site/' + r.slot + '?v=' + Date.parse(r.updated_at),
          type: r.content_type,
        };
      });
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
      else apply();
      document.dispatchEvent(new CustomEvent('bfly:media'));
    })
    .catch(function () { /* çevrimdışı ya da Supabase yok: sayfa olduğu gibi */ });
})();
