/* =============================================
   BFL'Y — yonetim.js (/yonetim/: site görselleri paneli)
   Portal hesabıyla giriş (Supabase). Sadece portal adminleri
   araç sayfalarındaki görsel/video alanlarını doldurur:
   dosya "site" klasörüne alan adıyla yüklenir, site_media
   tablosuna yazılır; sayfalar site-media.js ile gösterir.
   Galeri sekmesi galeri sayfasının fotoğraflarını ekler, sıralar,
   siler (site_gallery tablosu). Metinler sekmesi sitedeki yazıları
   değiştirir (site_text tablosu; sayfalar site-text.js ile uygular).
   ============================================= */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/+esm';

const BASE = 'https://bzkgwrualpstpqmmqcug.supabase.co';
const KEY = 'sb_publishable_qKVIZbIBB3ms2NGX5uCGjA_y1D3vy2U';   // herkese açık anahtar (gizli değil)
const supabase = window.__yonetimClient || createClient(BASE, KEY);

const MAX_VIDEO = 50 * 1024 * 1024;   // Supabase dosya sınırı
const MAX_SIDE = 2400;                // fotoğraflar bu boyuta küçültülür

// type: 'image' sadece görsel, 'any' görsel ya da video; def: yüklenmemişken sayfada görünen dosya
const SLOTS = [
  { page: 'delifisek', group: 'Öne çıkanlar (kayan kartlar)', slot: 'df-govde', name: 'Tam Karbon Fiber Gövde', where: '1. kart', type: 'any', def: '/assets/images/vehicles/body.jpg' },
  { page: 'delifisek', group: 'Öne çıkanlar (kayan kartlar)', slot: 'df-moduler', name: 'Modüler Yapı', where: '2. kart', type: 'any' },
  { page: 'delifisek', group: 'Öne çıkanlar (kayan kartlar)', slot: 'df-otonom', name: 'Otonom Yapı', where: '3. kart', type: 'any', def: '/assets/videos/delifisek-nav.mp4' },
  { page: 'delifisek', group: 'Öne çıkanlar (kayan kartlar)', slot: 'df-aviyonik', name: 'Aviyonik', where: '4. kart', type: 'any' },
  { page: 'delifisek', group: 'Tasarım ve yakınlaştırma', slot: 'df-tasarim', name: 'Tasarım: üstten görünüm', where: '"Zarif hatlar" bölümü', type: 'image', def: '/assets/images/vehicles/delifisek-design.jpg' },
  { page: 'delifisek', group: 'Tasarım ve yakınlaştırma', slot: 'df-zoom', name: 'Detaylı inceleme (kaydırınca yaklaşan)', where: 'Arka planı şeffaf PNG en iyisi', type: 'image', def: '/assets/images/vehicles/Delifisek.png' },
  { page: 'delifisek', group: '"Son cıvatasına kadar" detayları', slot: 'df-detay-kanat', name: 'Kanat Yapısı', where: 'Detay 1', type: 'image' },
  { page: 'delifisek', group: '"Son cıvatasına kadar" detayları', slot: 'df-detay-vkuyruk', name: 'V Kuyruk Yapısı', where: 'Detay 2', type: 'image' },
  { page: 'delifisek', group: '"Son cıvatasına kadar" detayları', slot: 'df-detay-govde', name: 'Tek Parça Gövde', where: 'Detay 3', type: 'image' },
  { page: 'delifisek', group: '"Son cıvatasına kadar" detayları', slot: 'df-detay-yuk', name: 'Faydalı Yük Bölmesi', where: 'Detay 4', type: 'image' },
  { page: 'delifisek', group: '"Son cıvatasına kadar" detayları', slot: 'df-detay-guc', name: 'Güç Sistemi', where: 'Detay 5', type: 'image' },
  { page: 'delifisek', group: 'Medya (sayfanın altı)', slot: 'df-medya-1', name: 'Hız Testi Pist Günü', where: 'Büyük kutu', type: 'any' },
  { page: 'delifisek', group: 'Medya (sayfanın altı)', slot: 'df-medya-2', name: 'Otonom Rota Görevi', where: '2. kutu (video olabilir)', type: 'any' },
  { page: 'delifisek', group: 'Medya (sayfanın altı)', slot: 'df-medya-3', name: 'Aviyonik Montajı', where: '3. kutu', type: 'any' },
  { page: 'delifisek', group: 'Medya (sayfanın altı)', slot: 'df-medya-4', name: 'Yük Bırakma Testi', where: '4. kutu', type: 'any' },

  { page: 'turcofighter', group: 'En üst', slot: 'tf-hero', name: 'Ana görsel', where: 'Sayfanın en üstü', type: 'image', def: '/assets/images/vehicles/turcoFighter.jpg' },
  { page: 'turcofighter', group: 'Bu araca neler kattık (kayan kartlar)', slot: 'tf-ucus', name: 'Uçuş görüntüsü', where: '1. kart (video en iyisi)', type: 'any' },
  { page: 'turcofighter', group: 'Bu araca neler kattık (kayan kartlar)', slot: 'tf-goruntu', name: 'Görüntü sistemi', where: '2. kart', type: 'any' },
  { page: 'turcofighter', group: 'Bu araca neler kattık (kayan kartlar)', slot: 'tf-yarisma', name: 'Yarışma görüntüsü', where: '3. kart (video en iyisi)', type: 'any' },
  { page: 'turcofighter', group: 'Bu araca neler kattık (kayan kartlar)', slot: 'tf-yki', name: 'Yer kontrol istasyonu', where: '4. kart', type: 'any' },
  { page: 'turcofighter', group: 'Tasarım ve yakınlaştırma', slot: 'tf-tasarim', name: 'Tasarım: üstten görünüm', where: 'Tasarım bölümü', type: 'image' },
  { page: 'turcofighter', group: 'Tasarım ve yakınlaştırma', slot: 'tf-zoom', name: 'Her açıdan inceleyin (kaydırınca yaklaşan)', where: 'Arka planı şeffaf PNG en iyisi', type: 'image', def: '/assets/images/vehicles/turcoFighter.jpg' },
  { page: 'turcofighter', group: '"Daha yakından" detayları', slot: 'tf-detay-govde', name: 'EPO köpük uçan kanat gövde', where: 'Detay 1', type: 'image' },
  { page: 'turcofighter', group: '"Daha yakından" detayları', slot: 'tf-detay-itici', name: 'İtici (pusher) motor', where: 'Detay 2', type: 'image' },
  { page: 'turcofighter', group: '"Daha yakından" detayları', slot: 'tf-detay-aviyonik', name: 'Aviyonik entegrasyonu', where: 'Detay 3', type: 'image' },
  { page: 'turcofighter', group: '"Daha yakından" detayları', slot: 'tf-detay-hedef', name: 'Görüntü tabanlı hedef tespiti', where: 'Detay 4', type: 'image' },
  { page: 'turcofighter', group: '"Daha yakından" detayları', slot: 'tf-detay-guc', name: 'Güç sistemi', where: 'Detay 5', type: 'image' },
  { page: 'turcofighter', group: 'Medya (sayfanın altı)', slot: 'tf-medya-1', name: 'İlk Uçuş Denemesi', where: 'Büyük kutu', type: 'any' },
  { page: 'turcofighter', group: 'Medya (sayfanın altı)', slot: 'tf-medya-2', name: 'Otonom Algoritma Testi', where: '2. kutu (video olabilir)', type: 'any' },
  { page: 'turcofighter', group: 'Medya (sayfanın altı)', slot: 'tf-medya-3', name: 'Aviyonik Entegrasyonu', where: '3. kutu', type: 'any' },
  { page: 'turcofighter', group: 'Medya (sayfanın altı)', slot: 'tf-medya-4', name: 'Yer Ekibi, Test Günü', where: '4. kutu', type: 'any' },
];
const PAGE_URL = { delifisek: '/vehicle/delifisek/', turcofighter: '/vehicle/turcofighter/' };
const CATS = { flight: 'Uçuş', build: 'Üretim', team: 'Takım', competition: 'Yarışma' };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let page = 'delifisek';
let rows = new Map();   // slot → { content_type, updated_at }
let gallery = [];       // galeri sırasıyla { id, path, category, caption_tr, caption_en }
let galCat = 'team';    // yeni fotoğrafların kategorisi
let uploading = false;
let texts = new Map();  // değiştirilen yazılar: anahtar → { tr, en }

function toast(msg, kind = '') {
  const t = document.createElement('div');
  t.className = `toast ${kind}`;
  t.setAttribute('role', 'status');
  t.textContent = msg;
  let box = $('#toasts');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toasts';
    document.body.append(box);
  }
  box.append(t);
  setTimeout(() => t.remove(), kind === 'err' ? 7000 : 3500);
}

const ago = (iso) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (m < 1) return 'az önce';
  if (m < 60) return `${m} dk önce`;
  if (m < 1440) return `${Math.round(m / 60)} sa önce`;
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};
const fileUrl = (slot, row) => `${BASE}/storage/v1/object/public/site/${slot}?v=${Date.parse(row.updated_at)}`;

/* ---------- Giriş ---------- */

async function showFor(session) {
  $('#loginCard').hidden = Boolean(session);
  $('#logoutBtn').hidden = !session;
  $('#who').textContent = '';
  $('#panel').hidden = true;
  $('#denied').hidden = true;
  if (!session) return;
  const { data: me, error } = await supabase.from('profiles').select('full_name, role, is_active').eq('id', session.user.id).maybeSingle();
  if (error || !me || !me.is_active || me.role !== 'admin') {
    $('#denied').hidden = false;
    return;
  }
  $('#who').textContent = me.full_name;
  $('#panel').hidden = false;
  await load();
}

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = $('#loginBtn');
  $('#loginError').textContent = '';
  btn.disabled = true;
  const { data, error } = await supabase.auth.signInWithPassword({ email: $('#email').value.trim(), password: $('#password').value });
  btn.disabled = false;
  if (error) {
    $('#loginError').textContent = /invalid/i.test(error.message) ? 'E-posta ya da şifre yanlış.' : error.message;
    return;
  }
  $('#password').value = '';
  await showFor(data.session);
});

$('#logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  await showFor(null);
});

/* ---------- Liste ---------- */

async function load() {
  const [media, gal, txt] = await Promise.all([
    supabase.from('site_media').select('slot, content_type, updated_at'),
    supabase.from('site_gallery').select('id, path, category, caption_tr, caption_en').order('sort_order'),
    supabase.from('site_text').select('key, tr, en'),
  ]);
  const error = media.error || gal.error || txt.error;
  if (error) {
    toast(`Liste alınamadı: ${error.message}`, 'err');
    return;
  }
  rows = new Map(media.data.map((r) => [r.slot, r]));
  gallery = gal.data;
  texts = new Map(txt.data.map((r) => [r.key, { tr: r.tr, en: r.en }]));
  render();
}

function thumb(s) {
  const row = rows.get(s.slot);
  const src = row ? fileUrl(s.slot, row) : s.def;
  const isVideo = row ? row.content_type.startsWith('video/') : /\.mp4$/.test(s.def || '');
  if (!src) return '<div class="thumb">Boş</div>';
  return `<div class="thumb">${isVideo
    ? `<video src="${esc(src)}" muted playsinline preload="metadata"></video>`
    : `<img src="${esc(src)}" alt="" loading="lazy" />`}</div>`;
}

function render() {
  $$tabs();
  if (page === 'galeri') {
    renderGallery();
    return;
  }
  if (page === 'metinler') {
    renderTexts();
    return;
  }
  const list = SLOTS.filter((s) => s.page === page);
  const filled = list.filter((s) => rows.has(s.slot)).length;
  const empty = list.filter((s) => !rows.has(s.slot) && !s.def).length;
  $('#summary').innerHTML = `${filled} alan yüklendi · ${empty} alan boş (sayfada boş kutu görünüyor) · `
    + `<a href="${PAGE_URL[page]}" target="_blank" rel="noopener">Sayfayı aç ↗</a>`;
  const groups = [...new Set(list.map((s) => s.group))];
  $('#groups').innerHTML = groups.map((g) => `
    <h2 class="group-title">${esc(g)}</h2>
    <div class="slots">${list.filter((s) => s.group === g).map((s) => {
      const row = rows.get(s.slot);
      const state = row ? `<span class="chip up">Yüklendi · ${esc(ago(row.updated_at))}</span>`
        : s.def ? '<span class="chip">Varsayılan görsel</span>' : '<span class="chip empty">Boş</span>';
      const accept = s.type === 'image' ? 'image/*' : 'image/*,video/*';
      return `
        <div class="slot ${!row && !s.def ? 'is-empty' : ''}" data-slot="${s.slot}">
          ${thumb(s)}
          <div>
            <div class="slot-name">${esc(s.name)}</div>
            <div class="slot-where">${esc(s.where)} · ${s.type === 'image' ? 'görsel' : 'görsel ya da video'}</div>
            ${state}
          </div>
          <div class="actions">
            <label class="btn btn-primary">${row ? 'Değiştir' : 'Yükle'}
              <input type="file" accept="${accept}" data-upload="${s.slot}" aria-label="${esc(s.name)} için dosya seç" />
            </label>
            ${row ? `<button type="button" class="btn btn-danger" data-remove="${s.slot}">Kaldır</button>` : ''}
          </div>
        </div>`;
    }).join('')}</div>`).join('');
}

function $$tabs() {
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('active', b.dataset.page === page));
}

$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('[data-page]');
  if (!b || (page === 'metinler' && b.dataset.page !== page && !leaveTexts())) return;
  page = b.dataset.page;
  render();
});

/* ---------- Yükle / kaldır ---------- */

// Fotoğraf: en uzun kenar 2400 px; PNG şeffaflığı korunur, gerisi JPEG
async function prepareImage(file) {
  let img;
  try {
    img = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    return { blob: file, type: file.type };
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
  if (scale === 1 && file.size < 2.5 * 1024 * 1024) return { blob: file, type: file.type };
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * scale);
  c.height = Math.round(img.height * scale);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise((r) => c.toBlob(r, type, 0.86));
  return { blob: blob || file, type: blob ? type : file.type };
}

async function upload(slot, file) {
  const s = SLOTS.find((x) => x.slot === slot);
  const isVideo = file.type.startsWith('video/');
  if (!file.type.startsWith('image/') && !isVideo) throw new Error('Sadece görsel ya da video yüklenebilir.');
  if (isVideo && s.type === 'image') throw new Error('Bu alana sadece görsel yüklenebilir.');
  if (isVideo && file.size > MAX_VIDEO) throw new Error(`Video ${Math.round(file.size / 1048576)} MB; en fazla 50 MB olabilir. Kısaltıp ya da sıkıştırıp tekrar dene.`);
  const { blob, type } = isVideo ? { blob: file, type: file.type } : await prepareImage(file);
  const { error } = await supabase.storage.from('site').upload(slot, blob, { upsert: true, contentType: type, cacheControl: '31536000' });
  if (error) throw error;
  const { error: rpcError } = await supabase.rpc('set_site_media', { p_slot: slot, p_content_type: type });
  if (rpcError) throw rpcError;
  if (type === 'video/quicktime') toast('Not: .mov videolar bazı tarayıcılarda oynamayabilir; mümkünse MP4 yükle.');
}

document.addEventListener('change', async (e) => {
  const input = e.target.closest('[data-upload]');
  if (!input || !input.files[0]) return;
  const file = input.files[0];
  const slot = input.dataset.upload;
  const label = input.closest('label');
  label.firstChild.textContent = 'Yükleniyor… ';
  label.classList.add('busy');
  input.disabled = true;
  try {
    await upload(slot, file);
    toast('Yüklendi, sayfada görünüyor.', 'ok');
  } catch (err) {
    toast(err.message || String(err), 'err');
  }
  await load();
});

document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-remove]');
  if (!b) return;
  const s = SLOTS.find((x) => x.slot === b.dataset.remove);
  if (!confirm(`"${s.name}" kaldırılsın mı? Sayfada ${s.def ? 'varsayılan görsel' : 'boş kutu'} görünür.`)) return;
  b.disabled = true;
  const { error } = await supabase.rpc('clear_site_media', { p_slot: s.slot });
  if (error) {
    toast(error.message, 'err');
    b.disabled = false;
    return;
  }
  await supabase.storage.from('site').remove([s.slot]);
  toast('Kaldırıldı.', 'ok');
  await load();
});

/* ---------- Galeri ---------- */

const publicUrl = (path) => `${BASE}/storage/v1/object/public/site/${path}`;
const thumbPath = (path) => path.replace(/\.(jpg|png|webp)$/, '-k.jpg');
const catOptions = (sel) => Object.entries(CATS)
  .map(([v, l]) => `<option value="${v}"${v === sel ? ' selected' : ''}>${l}</option>`).join('');

function renderGallery() {
  const n = gallery.length;
  $('#summary').innerHTML = `${n} fotoğraf · sitede bu sırayla görünür · `
    + '<a href="/gallery/" target="_blank" rel="noopener">Galeriyi aç ↗</a>';
  $('#groups').innerHTML = `
    <div class="gal-bar">
      <label class="inline" for="galCat">Yeni fotoğrafların kategorisi
        <select id="galCat">${catOptions(galCat)}</select></label>
      <label class="btn btn-primary" id="galAddBtn"><span>${uploading ? esc(uploading) : 'Fotoğraf ekle'}</span>
        <input type="file" accept="image/*" multiple id="galUpload" aria-label="Galeriye fotoğraf ekle" ${uploading ? 'disabled' : ''} /></label>
    </div>
    <p class="note">Birden fazla fotoğraf seçebilirsin, seçtiğin sırayla galerinin sonuna eklenir. Kategori ve başlık
      değişince kendiliğinden kaydedilir. Sırayı oklarla ya da sıra numarasını yazarak değiştir.</p>
    ${n ? '' : '<div class="card gal-empty">Galeri boş; sitede "Fotoğraflar yakında" yazıyor.</div>'}
    <div class="slots">${gallery.map((g, i) => `
      <div class="slot gal-row" data-id="${g.id}">
        <div class="thumb"><img src="${esc(publicUrl(thumbPath(g.path)))}" data-full="${esc(publicUrl(g.path))}" alt="" loading="lazy"
          onerror="this.onerror=null;this.src=this.dataset.full" /></div>
        <div class="gal-fields">
          <select data-field="category" aria-label="Kategori">${catOptions(g.category)}</select>
          <input type="text" data-field="caption_tr" maxlength="120" value="${esc(g.caption_tr)}" placeholder="Başlık (Türkçe, isteğe bağlı)" aria-label="Türkçe başlık" />
          <input type="text" data-field="caption_en" maxlength="120" value="${esc(g.caption_en)}" placeholder="Caption (English, optional)" aria-label="İngilizce başlık" />
        </div>
        <div class="actions">
          <input type="number" class="pos" min="1" max="${n}" value="${i + 1}" aria-label="Sıra" title="Sıra" />
          <button type="button" class="btn" data-move="-1" aria-label="Yukarı taşı" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" class="btn" data-move="1" aria-label="Aşağı taşı" ${i === n - 1 ? 'disabled' : ''}>↓</button>
          <button type="button" class="btn btn-danger" data-gal-del>Sil</button>
        </div>
      </div>`).join('')}</div>`;
}

// Galeri fotoğrafı: büyüğü en uzun kenar 2000 px, küçüğü 900 px, ikisi de JPEG
async function toJpeg(img, maxSide, quality) {
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * scale);
  c.height = Math.round(img.height * scale);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0D1117';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', quality));
  if (!blob) throw new Error('Fotoğraf hazırlanamadı.');
  return blob;
}

async function addGalleryPhoto(file) {
  let img;
  try {
    img = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error('açılamadı (HEIC olabilir). JPEG olarak kaydedip tekrar dene.');
  }
  const path = `galeri/${crypto.randomUUID()}.jpg`;
  const bucket = supabase.storage.from('site');
  const opts = { contentType: 'image/jpeg', cacheControl: '31536000' };
  try {
    const up1 = await bucket.upload(path, await toJpeg(img, 2000, 0.85), opts);
    if (up1.error) throw up1.error;
    const up2 = await bucket.upload(thumbPath(path), await toJpeg(img, 900, 0.8), opts);
    if (up2.error) throw up2.error;
    const { error } = await supabase.rpc('add_gallery_photo', { p_path: path, p_category: galCat, p_caption_tr: '', p_caption_en: '' });
    if (error) throw error;
  } catch (err) {
    await bucket.remove([path, thumbPath(path)]);
    throw err;
  }
}

async function uploadGallery(files) {
  const list = [...files];
  let ok = 0;
  for (const [i, file] of list.entries()) {
    uploading = `Yükleniyor ${i + 1}/${list.length}…`;
    const label = $('#galAddBtn span');
    if (label) label.textContent = uploading;
    try {
      if (!file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) throw new Error('fotoğraf değil.');
      await addGalleryPhoto(file);
      ok += 1;
    } catch (err) {
      toast(`${file.name}: ${err.message || err}`, 'err');
    }
  }
  uploading = false;
  if (ok) toast(`${ok} fotoğraf galeriye eklendi.`, 'ok');
  await load();
}

async function saveGalleryRow(row) {
  const g = gallery.find((x) => x.id === row.dataset.id);
  const val = (f) => row.querySelector(`[data-field="${f}"]`).value.trim();
  const next = { category: val('category'), caption_tr: val('caption_tr'), caption_en: val('caption_en') };
  const { error } = await supabase.rpc('update_gallery_photo', {
    p_id: g.id, p_category: next.category, p_caption_tr: next.caption_tr, p_caption_en: next.caption_en,
  });
  if (error) {
    toast(error.message, 'err');
    return;
  }
  Object.assign(g, next);
  toast('Kaydedildi.', 'ok');
}

async function moveGallery(id, to, focusSel) {
  const from = gallery.findIndex((g) => g.id === id);
  to = Math.max(0, Math.min(gallery.length - 1, to));
  if (from < 0 || from === to || !Number.isFinite(to)) {
    render();
    return;
  }
  const next = [...gallery];
  next.splice(to, 0, next.splice(from, 1)[0]);
  const { error } = await supabase.rpc('set_gallery_order', { p_ids: next.map((g) => g.id) });
  if (error) {
    toast(error.message, 'err');
    await load();
    return;
  }
  gallery = next;
  render();
  const row = document.querySelector(`.gal-row[data-id="${id}"]`);
  row?.scrollIntoView({ block: 'nearest' });
  const target = focusSel && row?.querySelector(focusSel);
  (target && !target.disabled ? target : row?.querySelector('.pos'))?.focus();
}

async function deleteGallery(id) {
  const i = gallery.findIndex((g) => g.id === id);
  if (!confirm(`${i + 1}. fotoğraf galeriden silinsin mi?`)) return;
  const { data: path, error } = await supabase.rpc('delete_gallery_photo', { p_id: id });
  if (error) {
    toast(error.message, 'err');
    return;
  }
  await supabase.storage.from('site').remove([path, thumbPath(path)]);
  toast('Silindi.', 'ok');
  await load();
}

$('#groups').addEventListener('change', (e) => {
  const el = e.target;
  if (el.id === 'galCat') galCat = el.value;
  else if (el.id === 'galUpload' && el.files.length) uploadGallery(el.files);
  else if (el.matches('.gal-row [data-field]')) saveGalleryRow(el.closest('.gal-row'));
  else if (el.matches('.gal-row .pos')) moveGallery(el.closest('.gal-row').dataset.id, Number(el.value) - 1, '.pos');
});

$('#groups').addEventListener('click', (e) => {
  const move = e.target.closest('[data-move]');
  const del = e.target.closest('[data-gal-del]');
  const row = e.target.closest('.gal-row');
  if (move) {
    const i = gallery.findIndex((g) => g.id === row.dataset.id);
    moveGallery(row.dataset.id, i + Number(move.dataset.move), `[data-move="${move.dataset.move}"]`);
  } else if (del) {
    deleteGallery(row.dataset.id);
  }
});

/* ---------- Metinler ----------
   Sayfanın varsayılan yazıları, sayfa gizli bir çerçevede ?varsayilan ile
   açılarak okunur (site-text.js o zaman değişiklik uygulamaz): data-i18n
   anahtarları + çevirileri, body'deki sayfa başlığı, data-text öğeleri.
   Böylece sitede yeni bir yazı eklenince panel ayrıca güncellenmez. */

const TEXT_PAGES = [
  { id: 'home', path: '/', name: 'Ana sayfa' },
  { id: 'team', path: '/team', name: 'Takım' },
  { id: 'vehicle', path: '/vehicle', name: 'Araçlar' },
  { id: 'vehicle/delifisek', path: '/vehicle/delifisek', name: 'DeliFişek' },
  { id: 'vehicle/turcofighter', path: '/vehicle/turcofighter', name: 'TurcoFighter (sadece Türkçe)' },
  { id: 'sponsors', path: '/sponsors', name: 'Sponsorlar' },
  { id: 'contact', path: '/contact', name: 'İletişim' },
  { id: 'gallery', path: '/gallery', name: 'Galeri' },
  { id: 'blog', path: '/blog', name: 'Blog' },
  { id: 'ortak', path: '/', name: 'Menü ve alt bilgi (her sayfada)' },
];
const KINDS = { H1: 'Başlık', H2: 'Başlık', H3: 'Ara başlık', H4: 'Ara başlık', P: 'Yazı', LI: 'Madde', A: 'Bağlantı', BUTTON: 'Buton' };
const catalog = new Map();   // sayfa id → { bilingual, items: [{ key, kind, tr, en, group }] }
let textPage = 'home';
let textQuery = '';

// HTML → kutuda düzenlenen yazı: <br> satır sonu olur, &amp; gibi kodlar çözülür
function toEdit(html) {
  const t = document.createElement('textarea');
  t.innerHTML = String(html ?? '').replace(/\s+/g, ' ').replace(/\s*<br\s*\/?>\s*/gi, '\n');
  return t.value.split('\n').map((l) => l.trim()).join('\n').trim();
}
const plain = (html) => toEdit(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function collectTexts(w, p) {
  const d = w.document;
  const T = w.BFLY_TRANSLATIONS;
  const items = [];
  const seen = new Set();
  const shared = (el) => el.closest('#navbar, .navbar, .mobile-menu, #mobileMenu, footer, .footer');
  const groupOf = (el) => {
    if (el.closest('nav, .navbar, .mobile-menu')) return 'Menü';
    if (el.closest('footer, .footer')) return 'Alt bilgi';
    const sec = el.closest('section, header, article, aside');
    const h = sec?.querySelector('h1, h2');
    if (!h) return 'Diğer';
    const k = h.dataset.i18n;
    return plain(k && T?.tr?.[k] !== undefined ? T.tr[k] : h.innerHTML).slice(0, 70) || 'Diğer';
  };
  const add = (it) => {
    if (seen.has(it.key)) return;
    seen.add(it.key);
    items.push({ ...it, tr: toEdit(it.tr), en: toEdit(it.en) });
  };
  if (p.id !== 'ortak' && d.body.dataset.pageHero === 'true') {
    for (const part of ['eyebrow', 'title', 'desc']) {
      const P = part[0].toUpperCase() + part.slice(1);
      const tr = d.body.dataset[`hero${P}Tr`] || '';
      const en = d.body.dataset[`hero${P}En`] || '';
      if (tr || en) {
        add({ key: `hero.${p.id}.${part}`, kind: { eyebrow: 'Üst yazı', title: 'Başlık', desc: 'Açıklama' }[part], tr, en, group: 'Sayfanın üstü' });
      }
    }
  }
  d.querySelectorAll('[data-i18n], [data-text]').forEach((el) => {
    if (p.id === 'ortak' ? !shared(el) : shared(el)) return;
    const key = el.dataset.i18n || el.dataset.text;
    const i18n = Boolean(el.dataset.i18n && T);
    add({
      key,
      kind: KINDS[el.tagName] || 'Etiket',
      tr: i18n ? T.tr?.[key] ?? el.innerHTML : el.innerHTML,
      en: i18n ? T.en?.[key] ?? el.innerHTML : '',
      group: groupOf(el),
    });
  });
  return { bilingual: Boolean(T), items };
}

function readPage(p) {
  return new Promise((resolve, reject) => {
    const f = document.createElement('iframe');
    f.className = 'reader';
    f.tabIndex = -1;
    f.setAttribute('aria-hidden', 'true');
    f.src = `${p.path}?varsayilan=1`;
    const timer = setTimeout(() => {
      f.remove();
      reject(new Error('Sayfa açılamadı, tekrar dene.'));
    }, 25000);
    f.addEventListener('load', () => {
      setTimeout(() => {   // sayfanın kendi betikleri (DOMContentLoaded) bitsin
        clearTimeout(timer);
        try {
          resolve(collectTexts(f.contentWindow, p));
        } catch (err) {
          reject(err);
        } finally {
          f.remove();
        }
      }, 400);
    }, { once: true });
    document.body.append(f);
  });
}

const textRows = () => [...document.querySelectorAll('.text-row')];
const isDirty = (row) => [...row.querySelectorAll('textarea')].some((t) => t.value !== t.defaultValue);
const leaveTexts = () => !textRows().some(isDirty) || confirm('Kaydedilmemiş yazı değişiklikleri var. Yine de çıkılsın mı?');

function textArea(item, lang, bilingual) {
  const o = texts.get(item.key);
  const value = o?.[lang] ?? item[lang];
  const lines = value.split('\n').length + Math.floor(value.length / 90);
  const label = bilingual ? (lang === 'tr' ? 'Türkçe' : 'İngilizce') : 'Yazı';
  const hint = lang === 'en' && !item.en ? 'Boşsa Türkçesi görünür' : '';
  return `<label class="text-field"><span>${label}</span>
    <textarea data-lang="${lang}" rows="${Math.min(8, Math.max(1, lines))}" maxlength="4000" placeholder="${hint}">${esc(value)}</textarea></label>`;
}

function textRowState(row) {
  const changed = texts.has(row.dataset.key);
  row.querySelector('.chip').hidden = !changed;
  row.querySelector('[data-text-reset]').hidden = !changed;
  row.querySelector('[data-text-save]').disabled = !isDirty(row);
}

function renderTexts() {
  const p = TEXT_PAGES.find((x) => x.id === textPage);
  const cat = catalog.get(textPage);
  const options = TEXT_PAGES.map((x) => `<option value="${x.id}"${x.id === textPage ? ' selected' : ''}>${esc(x.name)}</option>`).join('');
  const bar = `
    <div class="gal-bar">
      <label class="inline" for="textPage">Sayfa <select id="textPage">${options}</select></label>
      <label class="inline grow" for="textSearch">Ara
        <input type="search" id="textSearch" value="${esc(textQuery)}" placeholder="Yazının içinden bir kelime" /></label>
    </div>
    <p class="note">Yazıyı değiştirip <b>Kaydet</b>'e bas; sitede hemen görünür. Yeni satır için Enter. Vurgulu kelime:
      &lt;em&gt;kelime&lt;/em&gt;. "Varsayılana dön" koddaki asıl yazıya döndürür.</p>`;
  if (!cat) {
    $('#summary').innerHTML = `<a href="${p.path}" target="_blank" rel="noopener">Sayfayı aç ↗</a>`;
    $('#groups').innerHTML = `${bar}<div class="card gal-empty" id="textLoading">Sayfanın yazıları okunuyor…</div>`;
    readPage(p).then((c) => {
      catalog.set(p.id, c);
      if (page === 'metinler' && textPage === p.id) renderTexts();
    }).catch((err) => {
      const box = $('#textLoading');
      if (box) box.textContent = err.message;
    });
    return;
  }
  const changed = cat.items.filter((it) => texts.has(it.key)).length;
  $('#summary').innerHTML = `${cat.items.length} yazı · ${changed} değiştirildi · `
    + `<a href="${p.path}" target="_blank" rel="noopener">Sayfayı aç ↗</a>`;
  const groups = [...new Set(cat.items.map((it) => it.group))];
  $('#groups').innerHTML = bar + (cat.items.length ? '' : '<div class="card gal-empty">Bu sayfada düzenlenebilir yazı yok.</div>')
    + groups.map((g) => `
    <section class="text-group">
      <h2 class="group-title">${esc(g)}</h2>
      <div class="slots">${cat.items.filter((it) => it.group === g).map((it) => `
        <div class="slot text-row" data-key="${esc(it.key)}">
          <div class="text-head">
            <span class="slot-where">${esc(it.kind)}</span>
            <span class="chip up" hidden>Değiştirildi</span>
          </div>
          <div class="text-fields${cat.bilingual ? ' two' : ''}">
            ${textArea(it, 'tr', cat.bilingual)}${cat.bilingual ? textArea(it, 'en', true) : ''}
          </div>
          <div class="actions">
            <button type="button" class="btn btn-primary" data-text-save disabled>Kaydet</button>
            <button type="button" class="btn" data-text-reset hidden>Varsayılana dön</button>
          </div>
        </div>`).join('')}</div>
    </section>`).join('');
  textRows().forEach(textRowState);
  filterTexts();
}

function filterTexts() {
  const q = textQuery.trim().toLocaleLowerCase('tr');
  document.querySelectorAll('.text-group').forEach((g) => {
    let any = false;
    g.querySelectorAll('.text-row').forEach((row) => {
      const hay = [...row.querySelectorAll('textarea')].map((t) => t.value).join(' ').toLocaleLowerCase('tr');
      row.hidden = Boolean(q) && !hay.includes(q);
      any ||= !row.hidden;
    });
    g.hidden = !any;
  });
}

async function saveText(row, reset) {
  const key = row.dataset.key;
  const item = catalog.get(textPage).items.find((it) => it.key === key);
  const val = (lang) => {
    const t = row.querySelector(`textarea[data-lang="${lang}"]`);
    const v = t ? t.value.replace(/\r/g, '').trim() : '';
    return !reset && v && v !== item[lang] ? v : null;
  };
  const next = { tr: val('tr'), en: val('en') };
  row.querySelectorAll('button').forEach((b) => { b.disabled = true; });
  const { error } = await supabase.rpc('set_site_text', { p_key: key, p_tr: next.tr, p_en: next.en });
  row.querySelectorAll('button').forEach((b) => { b.disabled = false; });
  if (error) {
    toast(error.message, 'err');
    textRowState(row);
    return;
  }
  if (next.tr || next.en) texts.set(key, next);
  else texts.delete(key);
  row.querySelectorAll('textarea').forEach((t) => {
    if (reset) t.value = item[t.dataset.lang];
    t.defaultValue = t.value;
  });
  textRowState(row);
  const cat = catalog.get(textPage);
  const changed = cat.items.filter((it) => texts.has(it.key)).length;
  $('#summary').firstChild.textContent = `${cat.items.length} yazı · ${changed} değiştirildi · `;
  toast(next.tr || next.en ? 'Kaydedildi, sitede görünüyor.' : 'Varsayılana döndü.', 'ok');
}

$('#groups').addEventListener('input', (e) => {
  if (e.target.id === 'textSearch') {
    textQuery = e.target.value;
    filterTexts();
  } else if (e.target.matches('.text-row textarea')) {
    textRowState(e.target.closest('.text-row'));
  }
});

$('#groups').addEventListener('change', (e) => {
  if (e.target.id !== 'textPage') return;
  if (!leaveTexts()) {
    e.target.value = textPage;
    return;
  }
  textPage = e.target.value;
  textQuery = '';
  renderTexts();
});

$('#groups').addEventListener('click', (e) => {
  const save = e.target.closest('[data-text-save]');
  const reset = e.target.closest('[data-text-reset]');
  if (save) saveText(save.closest('.text-row'), false);
  else if (reset && confirm('Bu yazı koddaki asıl haline dönsün mü?')) saveText(reset.closest('.text-row'), true);
});

window.addEventListener('beforeunload', (e) => {
  if (textRows().some(isDirty)) e.preventDefault();
});

/* ---------- Başlangıç ---------- */

const { data: { session } } = await supabase.auth.getSession();
await showFor(session);
supabase.auth.onAuthStateChange((event, s) => {
  if (event === 'SIGNED_OUT') showFor(null);
  if (event === 'TOKEN_REFRESHED' && !s) showFor(null);
});
