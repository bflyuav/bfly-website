/* =============================================
   BFL'Y — vehicle-delifisek.js
   Translations + page interactions
   ============================================= */

/* applyLanguage'i sarmalayarak data-i18n dışındaki
   (hotspot tooltip, accordion label) özel çevirileri de
   dil değişince güncelle. components.js önce yüklenmeli. */
(function () {
  const originalApply = window.applyLanguage;
  window.applyLanguage = function (lang) {
    if (originalApply) originalApply(lang);

    document.querySelectorAll('.hotspot[data-tip-en]').forEach(hs => {
      const tip = lang === 'tr' ? hs.dataset.tipTr : hs.dataset.tipEn;
      const tipEl = hs.querySelector('.hotspot-tooltip');
      if (tipEl) tipEl.innerHTML = tip || '';
    });

    const activeTrigger = document.querySelector('.accordion-trigger.active');
    const clLabel = document.getElementById('clLabel');
    if (activeTrigger && clLabel) {
      clLabel.textContent = lang === 'tr' ? activeTrigger.dataset.labelTr : activeTrigger.dataset.labelEn;
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ===== TRANSLATIONS ===== */
  const delifisekTranslations = {
    en: {
      df_hero_class:        "BFL'Y SUAS Team &middot; Our Second Aircraft",
      df_hero_subtitle:     'Fully Autonomous Unmanned Aerial Vehicle',
      df_hero_desc:         "DeliFişek is BFL'Y's second autonomous platform, fully designed and built by high school students. With its all-carbon-fiber airframe, V-tail configuration and 2.2 m wingspan, it's built to handle both TEKNOFEST Combat UAV and SUAS competition missions with a single aircraft.",
      df_stat_speed_label:      'Max Speed',
      df_stat_endurance_label:  'Flight Endurance',
      df_stat_mtow_label:       'Max Takeoff Weight',
      df_unit_min:               'min',
      df_cta_specs:   'Technical Specs ↓',
      df_cta_gallery: 'Gallery',
      df_scroll_hint: 'Scroll to explore',

      df_num_speed:     'Maximum Speed',
      df_num_endurance: 'Flight Endurance',
      df_num_mtow:      'Max Takeoff Weight',
      df_num_payload:   'Payload Capacity',
      df_num_twr:       'Thrust-to-Weight Ratio',

      df_feat_eyebrow: 'Highlights',
      df_feat_title:   "What makes DeliFişek different?",

      df_feat1_label: 'Full Carbon Fiber Body',
      df_feat1_tag:   'Feature 01 / 04',
      df_feat1_title: 'Full Carbon Fiber<br/>Body',
      df_feat1_desc:  "DeliFişek's fully carbon fiber airframe combines light weight with durability. This gives the aircraft a higher payload capacity and longer flight endurance. Designed and built entirely in-house by a high school team, this airframe is one of the key reasons we can compete at the same level as university teams.",

      df_feat2_label: 'Modular Structure',
      df_feat2_tag:   'Feature 02 / 04',
      df_feat2_title: 'Modular<br/>Structure',
      df_feat2_desc:  "Both wings and the V-tail of DeliFişek detach from the single-piece fuselage. This makes the aircraft easy to transport, and speeds up maintenance and field repairs.",

      df_feat3_label: 'Autonomous System',
      df_feat3_tag:   'Feature 03 / 04',
      df_feat3_title: 'Autonomous<br/>System',
      df_feat3_desc:  "Running entirely on our own software, the aircraft carries out autonomous flight, target lock-on, payload release and point-to-point missions without human intervention. Advanced computer vision algorithms handle target detection and lock-on tasks.",

      df_feat4_label: 'Avionics',
      df_feat4_tag:   'Feature 04 / 04',
      df_feat4_title: 'Avionics<br/>Features',
      df_feat4_desc:  "Every avionics component on board was chosen to work seamlessly with the rest of the system. Range, capacity and response time were selected with the aircraft's autonomous mission requirements in mind, with failsafe modes built into the system.",

      df_design_eyebrow:  'Design',
      df_design_headline: "Elegant lines.<br/>Inspired by <em>Akıncı</em>.",
      df_design_desc:     "DeliFişek's design draws inspiration from Baykar's Akıncı UAV. The straight wing, V-tail and streamlined fuselage lines target both maneuverability and long-endurance autonomous flight stability. The result is a design that's as functional as it is eye-catching.",

      df_sw_eyebrow: 'Software',
      df_sw_title:   'Built from scratch —<br/>our own software.',
      df_sw_desc:    "DeliFişek's autopilot and mission software was developed entirely from scratch by the BFL'Y software team. It brings fully autonomous flight, target lock-on, payload release, point-to-point mission execution and advanced computer vision into a single system.",
      df_sw_mod1_name: 'Autonomous Flight',
      df_sw_mod1_desc: 'Fully autonomous flight mode from takeoff to landing, with no human intervention required',
      df_sw_mod2_name: 'Lock-on & Vision',
      df_sw_mod2_desc: 'Advanced computer vision for target detection, tracking and lock-on missions',
      df_sw_mod3_name: 'Payload Release',
      df_sw_mod3_desc: 'Autonomous payload release logic for point-to-point missions',
      df_sw_mod4_name: 'Failsafe',
      df_sw_mod4_desc: 'Multi-layer safety modes for connection loss and unexpected situations',

      df_cl_eyebrow: 'Details',
      df_cl_title:   'Designed down to the last bolt.',
      df_cl1_label: 'Wing Structure',
      df_cl1_desc:  'The 2.2 m straight wing was built by wrapping carbon fiber over balsa ribs. Both wings detach independently from the fuselage, making the aircraft easy to transport and speeding up field maintenance.',
      df_cl2_label: 'V-Tail Structure',
      df_cl2_desc:  'The V-tail was built with fiberglass over balsa ribs. Both tail surfaces are designed to detach from the fuselage. The V-tail geometry gives the aircraft both maneuverability and aerodynamic efficiency.',
      df_cl3_label: 'One-Piece Body',
      df_cl3_desc:  'The entire fuselage was produced as a single piece with a total of 3 access panels for easy maintenance. The design was inspired by Baykar\'s Akıncı UAV.',
      df_cl4_label: 'Payload Bay',
      df_cl4_desc:  'The bay can carry up to 3 kg of payload and works with the autonomous software for release scenarios in SUAS missions.',
      df_cl5_label: 'Power System',
      df_cl5_desc:  'Power system details coming soon.',

      df_ov_label:  'General Info',
      df_ov_school: 'Baykar Science High School SUAS',
      df_ov_p1: "BFL'Y is a 14-person SUAS team made up of Baykar Science High School students, working alongside our advisors. While the competitions we enter are mostly filled with university teams, we design and build our own carbon fiber autonomous aircraft from scratch as a high school team. DeliFişek is the second product of this approach.",
      df_ov_p2: "With its all-carbon-fiber airframe, V-tail configuration and 2.2 m wingspan, DeliFişek is a fully autonomous platform with strong maneuverability. It's being developed for both the TEKNOFEST Combat UAV competition and the SUAS competition at the same time — meaning a single aircraft can meet the mission requirements of two different competitions. Every stage, from design to software, was carried out entirely by high school students.",

      df_zoom_eyebrow: 'Detailed Inspection',
      df_zoom_title:   'Every angle<br/>matters.',
      df_zoom_desc:    "Scroll to get closer to DeliFişek — from the full airframe view down to the avionics and payload bay details.",
      df_zoom_step1: 'Full airframe — wingspan, V-tail and overall proportions',
      df_zoom_step2: 'Mid distance — wing/tail connection points and panel details',
      df_zoom_step3: 'Close-up — avionics bay, payload bay and connections',

      df_tl_eyebrow: 'Season',
      df_tl_title:   'Competition Roadmap',
      df_phase_done:     'Completed',
      df_phase_active:   'Active',
      df_phase_upcoming: 'Upcoming',
      df_tl1_node: 'MFG', df_tl1_title: 'Design and Manufacturing', df_tl1_desc: 'Wing, V-tail and fuselage design were completed; the aircraft was fully built and put through the required tests.',
      df_tl2_node: 'FF',  df_tl2_title: 'First Flight', df_tl2_desc: 'DeliFişek completed its first flight successfully, followed by numerous test flights.',
      df_tl3_node: 'AUT', df_tl3_title: 'Autonomous Takeoff, Landing and Taxi', df_tl3_desc: 'Autonomous takeoff, landing and taxi trials were completed successfully. Our own ground control interface went live.',
      df_tl4_node: 'NOW', df_tl4_title: 'Storage Box & Sponsorship', df_tl4_desc: "The TEKNOFEST mission video and required SUAS materials are complete. We're currently focused on producing the storage box and sponsorship efforts.",
      df_tl5_node: 'PD',  df_tl5_title: 'Payload Release Tests', df_tl5_desc: 'Autonomous payload release tests will be carried out as part of the SUAS missions.',
      df_tl6_node: 'LK',  df_tl6_title: 'Lock-on & QR Code Tests', df_tl6_desc: 'Target lock-on and QR code reading tests are planned for the Combat UAV missions.',

      df_specs_eyebrow: 'Technical Info',
      df_specs_title:   'Technical Data',
      df_spec_cat1: 'Airframe',
      df_spec1_1_key: 'Max Takeoff Weight',
      df_spec1_2_key: 'Wingspan',
      df_spec1_3_key: 'Wing Structure', df_spec1_3_val: 'Balsa Rib + Carbon Fiber',
      df_spec1_4_key: 'Tail Structure',  df_spec1_4_val: 'V-Tail, Balsa Rib + Fiberglass',
      df_spec1_5_key: 'Fuselage', df_spec1_5_val: 'One-Piece, 3 Access Panels',
      df_spec_cat2: 'Performance',
      df_spec2_1_key: 'Max Speed',
      df_spec2_2_key: 'Flight Endurance',
      df_spec2_3_key: 'Payload',
      df_spec2_4_key: 'Thrust-to-Weight Ratio',
      df_spec2_5_key: 'Maneuverability', df_spec2_5_val: 'High',
      df_spec_cat3: 'Software & Mission',
      df_spec3_1_key: 'Flight Mode', df_spec3_1_val: 'Fully Autonomous',
      df_spec3_2_key: 'Target Lock-on', df_spec3_2_val: 'Vision-Assisted',
      df_spec3_3_key: 'Payload Release', df_spec3_3_val: 'Autonomous',
      df_spec3_4_key: 'Safety', df_spec3_4_val: 'Multi-Layer Failsafe',
      df_spec3_5_key: 'Software', df_spec3_5_val: "100% BFL'Y Developed",
      df_spec_cat4: 'Avionics & Power',
      df_spec4_1_key: 'Battery',
      df_spec4_3_key: 'Communication',
      df_spec4_4_key: 'Camera / Vision',
      df_spec4_5_key: 'Motor / Propulsion',
      df_spec_soon: 'Coming soon',

      df_gallery_eyebrow: 'Gallery',
      df_gallery_title:   'Media',
      df_gallery_tab_all:    'All',
      df_gallery_tab_photos: 'Photos',
      df_gallery_tab_videos: 'Videos',
      df_gallery1: 'Speed Run Track Day',
      df_gallery2: 'Autonomous Waypoint Mission',
      df_gallery3: 'Avionics Build',
      df_gallery4: 'Payload Drop Test',

      df_mission_badge:    'Active Development &mdash; 2025/26 Season',
      df_mission_headline: 'Production complete.<br/>Preparing for competition.',
      df_mission_desc:     "DeliFişek's production and flight tests are complete. We're currently working on the storage box, sponsorship efforts and final pre-competition tests. Keep following BFL'Y's TEKNOFEST and SUAS journey.",
      df_mission_btn1: 'Meet the Team',
      df_mission_btn2: 'Go to Gallery',
    },
    tr: {
      df_hero_class:        "BFL'Y SUAS Team &middot; İkinci Aracımız",
      df_hero_subtitle:     'Tam Otonom İnsansız Hava Aracı',
      df_hero_desc:         "DeliFişek, BFL'Y takımının tamamen lise öğrencileri tarafından tasarlanıp üretilen ikinci otonom platformu. Tam karbon fiber gövdesi, V kuyruk yapısı ve 2.2 metrelik kanat açıklığıyla hem TEKNOFEST Savaşan İHA hem de SUAS yarışmalarındaki görevleri tek bir araçla yerine getirebilecek şekilde geliştirildi.",
      df_stat_speed_label:      'Maks. Hız',
      df_stat_endurance_label:  'Havada Kalış',
      df_stat_mtow_label:       'Maks. Kalkış Ağırlığı',
      df_unit_min:               'dk',
      df_cta_specs:   'Teknik Bilgiler ↓',
      df_cta_gallery: 'Galeri',
      df_scroll_hint: 'Keşfetmek için kaydır',

      df_num_speed:     'Maksimum Hız',
      df_num_endurance: 'Havada Kalış Süresi',
      df_num_mtow:      'Maks. Kalkış Ağırlığı',
      df_num_payload:   'Faydalı Yük Kapasitesi',
      df_num_twr:       'İtki-Ağırlık Oranı',

      df_feat_eyebrow: 'Öne Çıkanlar',
      df_feat_title:   "DeliFişek'i farklı kılan nedir?",

      df_feat1_label: 'Tam Karbon Fiber Gövde',
      df_feat1_tag:   'Özellik 01 / 04',
      df_feat1_title: 'Tam Karbon Fiber <br/>Gövde',
      df_feat1_desc:  "DeliFişek'in tamamen karbon fiberden imal edilen gövdesi hafiflik ve dayanıklılığı bir arada sunuyor. Bu sayede araç, daha yüksek faydalı yük kapasitesine ve uzun süreli uçuş yeteneğine sahip oluyor. Bir lise takımının kendi tasarımı ve üretimiyle ortaya çıkan bu gövde, üniversite takımlarıyla aynı seviyede yarışabilmemizin en önemli sebeplerinden biri.",

      df_feat2_label: 'Modüler Yapı',
      df_feat2_tag:   'Özellik 02 / 04',
      df_feat2_title: 'Modüler<br/>Yapı',
      df_feat2_desc:  "DeliFişek'in her iki kanadı ve V kuyruğu, tek parça olarak üretilen gövdeden ayrılabiliyor. Bu sayede araç kolayca taşınabiliyor, bakım ve saha müdahaleleri hızla yapılabiliyor.",

      df_feat3_label: 'Otonom Yapı',
      df_feat3_tag:   'Özellik 03 / 04',
      df_feat3_title: 'Otonom <br/>Yapı',
      df_feat3_desc:  "Araç, tamamen kendi geliştirdiğimiz yazılım ile insan müdahalesi olmadan otonom uçuş, kilitlenme, yük bırakma ve nokta-dan-noktaya görevlerini yerine getirebiliyor. İleri düzey görüntü işleme algoritmaları hedef tespiti ve kilitlenme görevlerinde kullanılıyor.",

      df_feat4_label: 'Aviyonik',
      df_feat4_tag:   'Özellik 04 / 04',
      df_feat4_title: 'Aviyonik<br/>Özellikler',
      df_feat4_desc:  "Araç üzerindeki her aviyonik bileşen birbiriyle uyumlu çalışacak şekilde seçildi. Menzil, kapasite ve tepki hızı gibi kriterler, aracın otonom görev gereksinimleri göz önünde bulundurularak belirlendi. Failsafe modları da sisteme entegre edildi.",

      df_design_eyebrow:  'Tasarım',
      df_design_headline: "Zarif hatlar.<br/><em>Akıncı'dan</em> ilhamla.",
      df_design_desc:     "DeliFişek'in tasarımı, Baykar tarafından üretilen Akıncı İHA'sından ilham alındı. Düz kanat, V kuyruk ve akışkan gövde hatları hem manevra kabiliyetini hem de uzun süreli otonom uçuş kararlılığını hedefliyor. Sonuç, göz alıcı olduğu kadar işlevsel bir tasarım.",

      df_sw_eyebrow: 'Yazılım',
      df_sw_title:   'Baştan sona<br/>kendi yazılımımız.',
      df_sw_desc:    "DeliFişek'in otopilot ve görev yazılımı tamamen BFL'Y yazılım ekibi tarafından sıfırdan geliştirildi. Yazılım; tam otonom uçuş, hedef kilitlenme, yük bırakma, nokta-dan-noktaya görev icrası ve ileri düzey görüntü işleme yeteneklerini tek bir sistemde birleştiriyor.",
      df_sw_mod1_name: 'Otonom Uçuş',
      df_sw_mod1_desc: 'Kalkıştan inişe kadar tamamen otonom, insan müdahalesi gerektirmeyen uçuş modu',
      df_sw_mod2_name: 'Kilitlenme &amp; Görüntü İşleme',
      df_sw_mod2_desc: 'Hedef tespiti, takibi ve kilitlenme görevleri için ileri düzey görüntü işleme',
      df_sw_mod3_name: 'Yük Bırakma',
      df_sw_mod3_desc: 'Nokta-dan-noktaya görevlerde otonom faydalı yük bırakma mantığı',
      df_sw_mod4_name: 'Failsafe',
      df_sw_mod4_desc: 'Bağlantı kaybı ve beklenmedik durumlarda çok katmanlı güvenlik modları',

      df_cl_eyebrow: 'Detaylar',
      df_cl_title:   'Son cıvatasına kadar tasarlandı.',
      df_cl1_label: 'Kanat Yapısı',
      df_cl1_desc:  '2.2 metre açıklığındaki düz kanat, balsa ribler üzerine karbon fiber sarılarak üretildi. Her iki kanat da gövdeden bağımsız olarak ayrılabiliyor; bu sayede araç kolayca taşınabiliyor ve saha bakımı hızlanıyor.',
      df_cl2_label: 'V Kuyruk Yapısı',
      df_cl2_desc:  'V kuyruk, balsa ribler üzerine cam elyaf kaplanarak üretildi. Her iki kuyruk yüzeyi de gövdeden ayrılabilir yapıda tasarlandı. V kuyruk geometrisi, araca hem manevra kabiliyeti hem de aerodinamik verimlilik kazandırıyor.',
      df_cl3_label: 'Tek Parça Gövde',
      df_cl3_desc:  "Tüm gövde tek parça olarak üretildi ve üzerinde bakım ile erişim kolaylığı sağlayan toplam 3 adet kapak bulunuyor. Tasarımda Baykar tarafından üretilen Akıncı İHA'sından ilham alındı.",
      df_cl4_label: 'Faydalı Yük Bölmesi',
      df_cl4_desc:  "3 kg'a kadar faydalı yük taşıyabilen bölme, SUAS görevlerindeki yük bırakma senaryoları için otonom yazılımla entegre çalışıyor.",
      df_cl5_label: 'Güç Sistemi',
      df_cl5_desc:  'Güç sistemi detayları yakında eklenecek.',

      df_ov_label:  'Genel Bilgi',
      df_ov_school: 'Baykar Fen Lisesi SUAS',
      df_ov_p1: "BFL'Y, danışmanlarımızla birlikte toplam 14 kişilik, Baykar Fen Lisesi öğrencilerinden oluşan bir SUAS takımı. Katıldığımız yarışmalara çoğunlukla üniversite takımları katılırken, biz bir lise takımı olarak kendi karbon fiber otonom aracımızı baştan sona tasarlayıp üretiyoruz. DeliFişek, bu yaklaşımın ikinci ürünü.",
      df_ov_p2: "DeliFişek; tam karbon fiber gövdesi, V kuyruk yapısı ve 2.2 metrelik kanat açıklığıyla iyi bir manevra kabiliyetine sahip, tamamen otonom hareket eden bir platform. Araç aynı anda hem TEKNOFEST Savaşan İHA yarışması hem de SUAS yarışması için geliştiriliyor; yani tek bir araç, iki farklı yarışmanın tüm görev gereksinimlerini karşılayabiliyor. Tasarımdan yazılıma kadar her aşama, tamamen lise öğrencileri tarafından hayata geçirildi.",

      df_zoom_eyebrow: 'Detaylı İnceleme',
      df_zoom_title:   'Her açı<br/>önemli.',
      df_zoom_desc:    "DeliFişek'e yakınlaşmak için kaydır — tüm gövde görünümünden aviyonik ve yük bölmesi detaylarına kadar.",
      df_zoom_step1: 'Tüm gövde — kanat açıklığı, V kuyruk ve genel oranlar',
      df_zoom_step2: 'Orta mesafe — kanat/kuyruk bağlantı noktaları ve kapak detayları',
      df_zoom_step3: 'Yakın detay — aviyonik bölmesi, faydalı yük bölmesi ve bağlantılar',

      df_tl_eyebrow: 'Sezon',
      df_tl_title:   'Yarışma Yol Haritası',
      df_phase_done:     'Tamamlandı',
      df_phase_active:   'Aktif',
      df_phase_upcoming: 'Yakında',
      df_tl1_node: 'ÜRT', df_tl1_title: 'Tasarım ve Üretim', df_tl1_desc: 'Kanat, V kuyruk ve gövde tasarımı tamamlandı; araç tamamen üretildi ve gerekli testlerden geçirildi.',
      df_tl2_node: 'İU',  df_tl2_title: 'İlk Uçuş', df_tl2_desc: 'DeliFişek ilk uçuşunu başarıyla gerçekleştirdi, ardından çok sayıda deneme uçuşu yapıldı.',
      df_tl3_node: 'OTN', df_tl3_title: 'Otonom Kalkış, İniş ve Sürüş', df_tl3_desc: 'Otonom kalkış, iniş ve sürüş denemeleri başarıyla tamamlandı. Kendi geliştirdiğimiz yer kontrol arayüzü devreye alındı.',
      df_tl4_node: 'ŞİMDİ', df_tl4_title: 'Depolama Kutusu &amp; Sponsorluk', df_tl4_desc: 'TEKNOFEST görev videosu ve SUAS için gerekli materyaller tamamlandı. Şu anda depolama kutusu üretimi ve sponsorluk çalışmaları üzerinde yoğunlaşıyoruz.',
      df_tl5_node: 'YB',  df_tl5_title: 'Yük Bırakma Testleri', df_tl5_desc: 'SUAS görevleri kapsamında otonom faydalı yük bırakma testleri gerçekleştirilecek.',
      df_tl6_node: 'KL',  df_tl6_title: 'Kilitlenme &amp; QR Kod Testleri', df_tl6_desc: 'Savaşan İHA görevleri için hedefe kilitlenme ve QR kod okuma testleri planlanıyor.',

      df_specs_eyebrow: 'Teknik Bilgiler',
      df_specs_title:   'Teknik Veriler',
      df_spec_cat1: 'Gövde',
      df_spec1_1_key: 'Maks. Kalkış Ağırlığı',
      df_spec1_2_key: 'Kanat Açıklığı',
      df_spec1_3_key: 'Kanat Yapısı', df_spec1_3_val: 'Balsa Rib + Karbon Fiber',
      df_spec1_4_key: 'Kuyruk Yapısı', df_spec1_4_val: 'V Kuyruk, Balsa Rib + Cam Elyaf',
      df_spec1_5_key: 'Gövde', df_spec1_5_val: 'Tek Parça, 3 Kapak',
      df_spec_cat2: 'Performans',
      df_spec2_1_key: 'Maks. Hız',
      df_spec2_2_key: 'Havada Kalış',
      df_spec2_3_key: 'Faydalı Yük',
      df_spec2_4_key: 'İtki-Ağırlık Oranı',
      df_spec2_5_key: 'Manevra Kabiliyeti', df_spec2_5_val: 'Yüksek',
      df_spec_cat3: 'Yazılım &amp; Görev',
      df_spec3_1_key: 'Uçuş Modu', df_spec3_1_val: 'Tam Otonom',
      df_spec3_2_key: 'Hedef Kilitlenme', df_spec3_2_val: 'Görüntü İşleme Destekli',
      df_spec3_3_key: 'Yük Bırakma', df_spec3_3_val: 'Otonom',
      df_spec3_4_key: 'Güvenlik', df_spec3_4_val: 'Çok Katmanlı Failsafe',
      df_spec3_5_key: 'Yazılım', df_spec3_5_val: "%100 BFL'Y Geliştirimi",
      df_spec_cat4: 'Aviyonik &amp; Güç',
      df_spec4_1_key: 'Batarya',
      df_spec4_3_key: 'Haberleşme',
      df_spec4_4_key: 'Kamera / Görüntü',
      df_spec4_5_key: 'Motor / İtki Sistemi',
      df_spec_soon: 'Yakında eklenecek',

      df_gallery_eyebrow: 'Galeri',
      df_gallery_title:   'Medya',
      df_gallery_tab_all:    'Tümü',
      df_gallery_tab_photos: 'Fotoğraflar',
      df_gallery_tab_videos: 'Videolar',
      df_gallery1: 'Hız Testi Pist Günü',
      df_gallery2: 'Otonom Rota Görevi',
      df_gallery3: 'Aviyonik Montajı',
      df_gallery4: 'Yük Bırakma Testi',

      df_mission_badge:    'Aktif Geliştirme &mdash; 2025/26 Sezonu',
      df_mission_headline: 'Üretim tamam.<br/>Yarışmaya hazırlanıyoruz.',
      df_mission_desc:     "DeliFişek'in üretimi ve uçuş testleri tamamlandı. Şu anda depolama kutusu, sponsorluk çalışmaları ve yarışma öncesi son testler üzerinde ilerliyoruz. BFL'Y'nin TEKNOFEST ve SUAS yolculuğunu takip etmeye devam edin.",
      df_mission_btn1: 'Takımla Tanışın',
      df_mission_btn2: 'Galeriye Git',
    }
  };

  if (window.BFLY_TRANSLATIONS) {
    Object.keys(delifisekTranslations).forEach(lang => {
      Object.assign(window.BFLY_TRANSLATIONS[lang], delifisekTranslations[lang]);
    });
    if (window.applyLanguage) applyLanguage(window.BFLY_CURRENT_LANG || 'en');
  }

  /* ===== Hotspots ===== */
  document.querySelectorAll('.hotspot').forEach(hs => {
    const tip = hs.querySelector('.hotspot-tooltip');
    const lang = window.BFLY_CURRENT_LANG || 'en';
    tip.innerHTML = (lang === 'tr' ? hs.dataset.tipTr : hs.dataset.tipEn) || '';
    hs.addEventListener('mouseenter', () => hs.classList.add('active'));
    hs.addEventListener('mouseleave', () => hs.classList.remove('active'));
    hs.addEventListener('click', () => hs.classList.toggle('active'));
  });

  /* ===== Carousel ===== */
  const track = document.getElementById('featuresTrack');
  const dots  = document.querySelectorAll('.carousel-dot');
  let current = 0, autoTimer;
  const total = 4;
  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); resetAuto(); }));
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(current + 1), 5000); }
  resetAuto();

  /* ===== Accordion ===== */
  const clImage = document.getElementById('clImage');
  const clPlaceholder = document.getElementById('clPlaceholder');
  const clLabel = document.getElementById('clLabel');
  // Görsel: yönetim sayfasından yüklendiyse o (site-media.js), yoksa assets/images'taki dosya
  function showDetail(btn) {
    const lang = window.BFLY_CURRENT_LANG || 'en';
    const label = lang === 'tr' ? btn.dataset.labelTr : btn.dataset.labelEn;
    const uploaded = window.BFLY_MEDIA && window.BFLY_MEDIA[btn.dataset.slot];
    const src = uploaded ? uploaded.url : `/assets/images/${btn.dataset.image}`;
    clLabel.textContent = label || '';
    clImage.src = src; clImage.alt = label || ''; clImage.style.display = 'block';
    clImage.onerror = () => { clImage.style.display = 'none'; clPlaceholder.style.display = 'flex'; };
    clImage.onload  = () => { clPlaceholder.style.display = 'none'; };
  }
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('active');
      document.querySelectorAll('.accordion-trigger').forEach(b => {
        b.classList.remove('active');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('active'); btn.nextElementSibling.classList.add('open'); }
      showDetail(btn);
    });
  });
  document.addEventListener('bfly:media', () => {
    const active = document.querySelector('.accordion-trigger.active');
    if (active) showDetail(active);
  });

  /* ===== Scroll Zoom ===== */
  const s3d = document.getElementById('scroll3dSection');
  const img3d = document.getElementById('drone3dImg');
  const progress = document.getElementById('droneProgress');
  const steps = document.querySelectorAll('.scroll-step');
  window.addEventListener('scroll', () => {
    const total3 = s3d.offsetHeight - window.innerHeight;
    const scrolled = window.scrollY - s3d.offsetTop;
    const p = Math.max(0, Math.min(1, scrolled / total3));
    const scale = 1 + p * 0.75;
    const ty = p * -8;
    if (img3d) {
      img3d.style.transform = `scale(${scale}) translateY(${ty}%)`;
      img3d.style.filter = `drop-shadow(0 20px 60px rgba(255,77,28,${0.2 + p * 0.3}))`;
    }
    progress.style.height = `${p * 100}%`;
    const si = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
    steps.forEach((s, i) => s.classList.toggle('active', i === si));
  }, { passive: true });

  /* ===== Reveal ===== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ===== Gallery tabs ===== */
  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

});