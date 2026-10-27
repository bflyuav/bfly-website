/* =============================================
   BFL'Y — team.js
   Filter pills · Team-page translations
   ============================================= */

// ---------- TEAM PAGE TRANSLATIONS ----------
// components.js'deki BFLY_TRANSLATIONS objesine eklenir
document.addEventListener('DOMContentLoaded', () => {

  const teamTranslations = {
    en: {
      team_hero_eyebrow:    'Baykar Science High School · Aviation Team',
      team_hero_title:      'We are <em>BFL\'Y</em>.',
      team_hero_desc:       'From design to flight, from software to integration — a team of 14 working toward one goal.',
      team_who_eyebrow:     'Who We Are',
      team_who_title:       'Engineering is a team sport.',
      team_who_p1:          'We are a 14-strong UAV team founded in 2025 within Baykar Science High School, driven by the vision of the National Technology Initiative. From our first original project, TurcoFighter to our newest aircraft Delifişek, we design and build original aerospace solutions from scratch.',
      team_who_p2:          'We compete shoulder to shoulder with well-established university teams at the TEKNOFEST Combat UAV and international SUAS competitions, achieving remarkable results at high-school level. Last year we made history as the only high school team to reach the semifinals in the Combat UAV category; this year we\'re back even stronger, and we\'re fully confident we\'ll reach the finals. Inspired by our roots, we are shaping tomorrow\'s aviation technologies today.',
      stat_members_label:   'Active Members',
      stat_subsystems:      'Sub-systems',
      stat_goal:            'Shared Goal',
      stat_problems:        'Competitions',
      timeline_eyebrow:     'Our Journey',
      timeline_title:       'Team timeline',
      tl1_date:             'October 2025',
      tl1_title:            'Team Founded',
      tl1_body:             'Following a year of experience under a different name, BFL\'Y was officially founded within Baykar Science High School. At the first meeting, the team\'s goals, sub-systems, and task assignments were defined, and work began right away.',
      tl2_date:             'February 2026',
      tl2_title:            'Delifişek\'s Design Completed',
      tl2_body:             'Inspired by the Akıncı, Delifişek\'s design was largely finalized. The aircraft\'s overall structure and technical specifications were determined, and a roadmap for production was set.',
      tl3_date:             'March 2026',
      tl3_title:            'Production Began, Applications Submitted',
      tl3_body:             'Production of the wing ribs marked the start of manufacturing. That same month, we completed our applications for the TEKNOFEST Combat UAV and SUAS competitions.',
      tl4_date:             'April 2026',
      tl4_title:            'Wing Production Completed',
      tl4_body:             'The wing production process for Delifişek was successfully completed, and the team moved on to fuselage production.',
      tl5_date:             'May 2026',
      tl5_title:            'Strong Result at KTR',
      tl5_body:             'In the report stage of the TEKNOFEST Combat UAV competition, known as KTR, we placed 7th out of 110 teams — a major achievement.',
      tl6_date:             'June – July 2026',
      tl6_title:            'First Flight and Test Flights',
      tl6_body:             'Delifişek\'s production was completed and the aircraft successfully completed its first flight. Throughout July, a series of test flights evaluated the aircraft\'s performance, and mission videos were submitted for both the SUAS and TEKNOFEST Combat UAV competitions.',
      tl7_date:             'October 2026',
      tl7_title:            'Starting Again',
      tl7_body:             'After reaching the semifinals in the 2026 season, we have started working toward the 2027 season.',
      members_eyebrow:      'Our Team',
      members_title:        '14 people, one goal',
      filter_all:           'All',
      filter_mech:          'Mechanical',
      filter_elec:          'Electronics',
      filter_soft:          'Software',
      filter_pr:            'PR',
      filter_danisman:      'Advisor',
      filter_budget:        'Budget',
    },
    tr: {
      team_hero_eyebrow:    'Baykar Fen Lisesi · Havacılık Takımı',
      team_hero_title:      'Biz <em>BFL\'Y</em>\'iz.',
      team_hero_desc:       'Tasarımdan uçuşa, yazılımdan entegrasyona — ortak bir hedef için çalışan 14 kişilik bir ekip.',
      team_who_eyebrow:     'Biz Kimiz',
      team_who_title:       'Mühendislik bir ekip sporudur.',
      team_who_p1:          'Millî Teknoloji Hamlesi vizyonuyla yola çıkan, Baykar Fen Lisesi bünyesinde 2025 yılında kurulmuş 14 kişilik bir insansız hava aracı takımıyız. İlk özgün projemiz TurcoFighter\'dan  en yeni aracımız Delifişek\'e uzanan bir yolculukla, sıfırdan özgün havacılık ve uzay çözümleri tasarlıyor, üretiyoruz.',
      team_who_p2:          'TEKNOFEST Savaşan İHA ve uluslararası SUAS yarışmalarında, köklü üniversite takımlarıyla omuz omuza yarışarak lise seviyesinde büyük başarılara imza atıyoruz. Geçtiğimiz yıl Savaşan İHA kategorisinde yarı finale kalan tek lise takımı olarak tarihe geçtik; bu yıl çok daha güçlü bir şekilde geri döndük ve finale kalacağımıza tüm kalbimizle inanıyoruz. Köklerimizden aldığımız ilhamla, yarının havacılık teknolojilerini bugünden şekillendiriyoruz.',
      stat_members_label:   'Aktif Üye',
      stat_subsystems:      'Alt Sistem',
      stat_goal:            'Ortak Hedef',
      stat_problems:        'Yarışma',
      timeline_eyebrow:     'Yolculuğumuz',
      timeline_title:       'Takım zaman çizelgesi',
      tl1_date:             'Ekim 2025',
      tl1_title:            'Takımın Kuruluşu',
      tl1_body:             'Farklı bir isim altında geçirdiğimiz bir yıllık deneyimin ardından, BFL\'Y adıyla Baykar Fen Lisesi bünyesinde resmi olarak kuruldu. İlk toplantıda takımın hedefleri, alt sistemleri ve görev dağılımları netleştirildi ve çalışmalara hızla başlandı.',
      tl2_date:             'Şubat 2026',
      tl2_title:            'Delifişek\'in Tasarımı Tamamlandı',
      tl2_body:             'Akıncı\'dan ilham alınarak şekillendirilen Delifişek\'in tasarımı büyük oranda tamamlandı. Aracın genel yapısı ve teknik özellikleri netleşti, üretim için yol haritası çıkarıldı.',
      tl3_date:             'Mart 2026',
      tl3_title:            'Üretime Başlandı, Başvurular Tamamlandı',
      tl3_body:             'Kanat riblerinin üretimiyle ilk üretim çalışmalarına başlandı. Aynı ay içinde TEKNOFEST Savaşan İHA ve SUAS yarışmaları için başvurularımızı tamamladık.',
      tl4_date:             'Nisan 2026',
      tl4_title:            'Kanat Üretimi Tamamlandı',
      tl4_body:             'Delifişek\'in kanat üretim süreci başarıyla tamamlandı ve ekip gövde üretimine odaklandı.',
      tl5_date:             'Mayıs 2026',
      tl5_title:            'KTR\'de Büyük Başarı',
      tl5_body:             'TEKNOFEST Savaşan İHA yarışmasının rapor aşaması olan KTR\'de 110 takım arasından 7. olarak büyük bir başarıya imza attık.',
      tl6_date:             'Haziran - Temmuz 2026',
      tl6_title:            'İlk Uçuş ve Deneme Uçuşları',
      tl6_body:             'Delifişek\'in üretimi tamamlandı ve aracımız ilk uçuşunu başarıyla gerçekleştirdi. Temmuz ayında art arda yapılan deneme uçuşlarıyla aracın performansı test edildi; hem SUAS hem de TEKNOFEST Savaşan İHA için görev videolarımız yüklendi.',
      tl7_date:             'Ekim 2026',
      tl7_title:            'Yeniden Başlıyoruz',
      tl7_body:             '2026 sezonunda yarı finalistliğimizin ardından 2027 sezonu için çalışmalara başladık.',
      members_eyebrow:      'Ekibimiz',
      members_title:        '14 kişi, bir hedef',
      filter_all:           'Tümü',
      filter_mech:          'Mekanik',
      filter_elec:          'Elektronik',
      filter_soft:          'Yazılım',
      filter_pr:            'PR',
      filter_danisman:      'Danışman',
      filter_budget:        'Bütçe',
    }
  };

  // components.js'deki global translations objesine merge et
  if (window.BFLY_TRANSLATIONS) {
    Object.keys(teamTranslations).forEach(lang => {
      Object.assign(window.BFLY_TRANSLATIONS[lang], teamTranslations[lang]);
    });
    // Sayfa dilini uygula (components.js boot'tan sonra)
    if (window.applyLanguage) applyLanguage(window.BFLY_CURRENT_LANG || 'en');
  }

  // ---------- FILTER PILLS ----------
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.member-card');

  // Filtre pill'lerinin data-filter değerlerini dile göre güncelle
  function updateFilterLabels(lang) {
    const map = {
      'all':       teamTranslations[lang].filter_all,
      'Mekanik':   teamTranslations[lang].filter_mech,
      'Elektronik':teamTranslations[lang].filter_elec,
      'Yazılım':   teamTranslations[lang].filter_soft,
      'PR':        teamTranslations[lang].filter_pr,
      'Danışman':  teamTranslations[lang].filter_danisman,
      'Bütçe':     teamTranslations[lang].filter_budget,
    };
    Object.keys(map).forEach(filterKey => {
      const el = document.querySelector(`[data-filter="${filterKey}"]`);
      if (el) el.textContent = map[filterKey];
    });
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      cards.forEach(card => {
        // Bir üye birden fazla departmanda olabilir; data-dept boşlukla ayrılmış liste tutar.
        const depts = (card.dataset.dept || '').split(' ');
        card.style.display = (filter === 'all' || depts.includes(filter)) ? '' : 'none';
      });
    });
  });

  // Dil değişimini dinle (components.js langToggle click'inden sonra)
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      // components.js click handler'ı dili değiştirdikten sonra
      // kısa timeout ile yeni dili oku
      setTimeout(() => {
        updateFilterLabels(window.BFLY_CURRENT_LANG);
      }, 10);
    });
  }

  updateFilterLabels('en');
});