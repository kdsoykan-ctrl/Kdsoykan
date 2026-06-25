// ==========================================================================
// FENERBAHÇE ŞÜKRÜ SARACOĞLU - TAM AÇIK JS ÇEKİRDEĞİ (ULTRA SÜRÜM)
// Tüm modüller birbirinden bağımsızdır, hata toleransı maksimuma çıkarılmıştır.
// ==========================================================================

// --------------------------------------------------------------------------
// 1. SİNEMATİK YÜKLEME VE AÇILIŞ (PRELOADER)
// --------------------------------------------------------------------------
let progress = 0;
const progBar = document.querySelector('.loading-progress');
const startBtn = document.getElementById('start-btn');
const loadingBar = document.querySelector('.loading-bar');
const loadingText = document.getElementById('loading-text');

// Sahte Yükleme Çubuğu Simülasyonu
const loadInt = setInterval(() => {
    progress += Math.random() * 15;
    
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadInt);
        
        if (progBar) {
            progBar.style.width = '100%';
        }
        
        if (loadingText) {
            loadingText.innerHTML = 'Yükleme Tamamlandı. Kapılar Açılmaya Hazır.';
        }
        
        // 600ms sonra barı gizle ve butonu göster
        setTimeout(() => {
            if (loadingBar) {
                loadingBar.style.display = 'none';
            }
            if (loadingText) {
                loadingText.style.display = 'none';
            }
            if (startBtn) {
                startBtn.style.display = 'inline-block';
            }
        }, 600);
        
    } else {
        if (progBar) {
            progBar.style.width = progress + '%';
        }
        if (loadingText) {
            loadingText.innerHTML = 'Yükleniyor... %' + Math.floor(progress);
        }
    }
}, 150);

// Nükleer Güvenlikli Buton Fonksiyonu (HTML İçinden Tetiklenir)
window.openStadium = function() {
    const splash = document.getElementById("splash-screen");
    
    if (splash) {
        // CSS patlama efektini tetikler
        splash.classList.add("opening"); 
        
        setTimeout(() => {
            splash.style.display = "none";
            
            // Donanım Kilitlerini (Scroll Yasaklarını) Aç
            document.body.classList.remove("no-scroll");
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
            
            // GSAP yüklüyse açılış animasyonlarını başlat
            if (typeof initHeroAnimations === "function") {
                initHeroAnimations();
            }
        }, 1000); // Patlama süresi kadar bekleme
    }
};

// --------------------------------------------------------------------------
// 2. KUSURSUZ ZAMAN SİSTEMLERİ (SAAT VE DERBİ SAYACI)
// --------------------------------------------------------------------------
function initTimeSystems() {
    
    // Canlı Saat Döngüsü
    function tickClock() {
        const clockElement = document.getElementById('clock');
        if (!clockElement) return;
        
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        clockElement.innerHTML = `${hours}<span class="blink">:</span>${minutes}`;
    }
    
    setInterval(tickClock, 1000);
    tickClock();

    // Derbi Geri Sayım Sayacı (Şu andan 10 gün 5 saat sonraya ayarlıdır)
    const countDownDate = new Date().getTime() + (10 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        if (distance < 0) return;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const eD = document.getElementById("cd-days");
        const eH = document.getElementById("cd-hours");
        const eM = document.getElementById("cd-mins");
        const eS = document.getElementById("cd-secs");
        
        if (eD) eD.innerText = String(days).padStart(2, '0');
        if (eH) eH.innerText = String(hours).padStart(2, '0');
        if (eM) eM.innerText = String(minutes).padStart(2, '0');
        if (eS) eS.innerText = String(seconds).padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

initTimeSystems();

// --------------------------------------------------------------------------
// 3. TAM KAPSAMLI DİL VE ÇEVİRİ SÖZLÜĞÜ (TR / EN)
// --------------------------------------------------------------------------
const dict = {
    tr: {
        "splash-title": "BİR MABEDİN DOĞUŞU",
        "splash-desc": "Papazın Çayırı'ndan Milyonların Kalbine...",
        "hero-derby": "BÜYÜK DERBİYE",
        "lbl-days": "GÜN",
        "lbl-hours": "SAAT",
        "lbl-mins": "DAKİKA",
        "lbl-secs": "SANİYE",
        "hero-sub": "Burası Kadıköy, Buradan Çıkış Yok!",
        "scroll-text": "Keşfet",
        "tag-founder": "EFSANE BAŞKAN",
        "title-founder": "Mehmet Şükrü Saracoğlu",
        "story-h3": "Bir Devlet Adamı, Yürekten Bir Fenerbahçeli",
        "story-p1": "Fenerbahçe tarihinin en uzun süre görev yapan başkanı olan Mehmet Şükrü Saracoğlu (1934-1950), kulübü sadece sportif başarılarla değil, kurumsal bir vizyonla geleceğe taşımıştır.",
        "story-h4": "<i class='fas fa-flag-checkered'></i> 1932: Tarihi Dönüm Noktası",
        "story-p2": "O dönem 'Papazın Çayırı' olarak bilinen arazi, Saracoğlu'nun şahsi kefaleti sayesinde 9.000 TL gibi bir bedelle Fenerbahçe'ye kazandırıldı. Bu adım, Türkiye'de bir kulübün kendi stadyum mülkiyetine sahip olduğu ilk andı.",
        "stat-1": "Yıl Başkanlık",
        "stat-2": "Mülkiyet Alımı",
        "stat-3": "İsim Verilişi",
        "tag-trophy": "ŞANLI TARİH",
        "title-trophy": "Kupa Odası",
        "desc-trophy": "Alın teri, inanç ve milyonların duasıyla kazanılan efsanevi zaferler.",
        "tr-1": "Türkiye Şampiyonlukları",
        "tr-2": "Balkan Kupası",
        "tr-3": "Türkiye Kupası",
        "tag-legends": "ÖLÜMSÜZLER",
        "title-legends": "Çubukluya Hayat Verenler",
        "leg-1": "Fenerbahçe tarihinin en ikonik figürü. Heykeli dikilen ilk futbolcu.",
        "leg-2": "İtalyanların Sinyor lakabını taktığı, zerafetin sahaya yansımış hali.",
        "leg-3": "Heykeli dikilen Brezilyalı efsane. Kadıköy'ün unutulmaz 10 numarası.",
        "leg-4": "17 yıl boyunca Fenerbahçe kalesini koruyan büyük kaptan.",
        "role-4": "Efsane Kaleci",
        "tag-time": "ZAMAN ÇİZELGESİ",
        "title-time": "Evrimin Adımları",
        "time-h1": "<i class='fas fa-futbol'></i> 1908 - İlk Maçlar",
        "time-p1": "O zamanlar Papazın Çayırı olarak bilinen alanda, ahşap tribünler önünde ilk futbol müsabakaları oynanmaya başlandı.",
        "time-h2": "<i class='fas fa-file-signature'></i> 1932 - Stadyum Tapusu",
        "time-p2": "Şükrü Saracoğlu önderliğinde arazi Fenerbahçe Spor Kulübü tarafından satın alındı ve kurumsallaşma adımı atıldı.",
        "time-h3": "<i class='fas fa-hammer'></i> 1999 - Yeniden İnşa Başlıyor",
        "time-p3": "Aziz Yıldırım döneminde, maçlar oynanmaya devam ederken tribünler tek tek yıkılıp baştan yapıldı.",
        "time-h4": "<i class='fas fa-stadium'></i> 2006 - Modern Mabet",
        "time-p4": "Tribünlerin sahaya sıfırlaştırıldığı, tamamı kapalı, alttan ısıtmalı ve devasa akustiğe sahip modern yapı açıldı.",
        "tag-arch": "MİMARİ",
        "title-arch": "Stadyum Anatomisi",
        "arch-h1": "Tribün Akustiği",
        "arch-p1": "Çatı sistemi, taraftarın sesini doğrudan sahaya yansıtacak şekilde özel bir eğimle tasarlanmıştır. Bu sayede Kadıköy'deki desibel oranları rakipler için boğucu bir atmosfere dönüşür.",
        "arch-h2": "VIP & Localar",
        "arch-p2": "Toplam 198 adet son teknoloji donanımlı loca, 1907 Tribünü ve Fenerium bölümleriyle üst düzey maç izleme deneyimi sunulmaktadır.",
        "arch-h3": "Hibrit Çim Teknolojisi",
        "arch-p3": "Zeminde doğal çim ile sentetik liflerin birleşimi olan hibrit çim sistemi kullanılır. Saha her mevsim kusursuz futbol oynamaya müsaittir.",
        "arch-h4": "Aydınlatma & Skorbord",
        "arch-p4": "UEFA Elite stadyum standartlarına uygun LED aydınlatma sistemi ve devasa yüksek çözünürlüklü skorbordlar mevcuttur.",
        "stat-lbl-1": "Kapasite",
        "stat-lbl-2": "Saha Uzunluğu (m)",
        "stat-lbl-3": "Saha Genişliği (m)",
        "stat-lbl-4": "İsim Veriliş Yılı",
        "tag-chants": "TÜYLERİ DİKEN DİKEN EDENLER",
        "title-chants": "Kadıköy Marşları",
        "tag-gal": "GÖRSEL ŞÖLEN",
        "title-gal": "Mabedin Yüzleri",
        "gal-1": "Stadyum Dış Cephesi",
        "gal-2": "Derbi Atmosferi",
        "gal-3": "Saha İçi Görünüm",
        "gal-4": "Fenerbahçe Müzesi",
        "gal-5": "Çubuklu Sevda",
        "gal-6": "Kadıköy Geceleri",
        "foot-desc": "Sporun beşiği, milyonların sevgilisi. Cumhuriyetin feneri Kadıköy'den yanmaya devam ediyor.",
        "foot-links": "Hızlı Linkler",
        "link-1": "Müze Ziyareti",
        "link-2": "Stadyum Turu",
        "link-3": "Kombine & Bilet",
        "link-4": "Fenerium",
        "foot-dev": "Geliştirici",
        "dev-1": "Kırşehir Ahi Evran Üniversitesi Bilgisayar Destekli Tasarım ve Animasyon öğrencisi.",
        "dev-2": "3D modelleme, web animasyonları, oyun geliştirme ve dijital deneyim tasarımı alanlarında uzmanlaşmaktadır."
    },
    en: {
        "splash-title": "BIRTH OF A TEMPLE",
        "splash-desc": "From the Priest's Meadow to Millions of Hearts...",
        "hero-derby": "TO THE BIG DERBY",
        "lbl-days": "DAYS",
        "lbl-hours": "HRS",
        "lbl-mins": "MINS",
        "lbl-secs": "SECS",
        "hero-sub": "This is Kadikoy, No Way Out!",
        "scroll-text": "Explore",
        "tag-founder": "LEGENDARY PRESIDENT",
        "title-founder": "Mehmet Sukru Saracoglu",
        "story-h3": "A Statesman, A True Fenerbahce Fan",
        "story-p1": "Mehmet Şükrü Saracoğlu, the longest-serving president in Fenerbahçe's history, carried the club to the future not only with sporting achievements but with an institutional vision.",
        "story-h4": "<i class='fas fa-flag-checkered'></i> 1932: Historical Turning Point",
        "story-p2": "The land, then known as 'Priest's Meadow', was acquired by Fenerbahçe for 9,000 TL thanks to Saracoğlu's personal guarantee. This step was the first time a club owned its stadium property in Turkey.",
        "stat-1": "Years Presidency",
        "stat-2": "Property Acquired",
        "stat-3": "Name Given",
        "tag-trophy": "GLORIOUS HISTORY",
        "title-trophy": "Trophy Room",
        "desc-trophy": "Legendary victories won with sweat, belief, and the prayers of millions.",
        "tr-1": "Turkish Championships",
        "tr-2": "Balkans Cup",
        "tr-3": "Turkish Cup",
        "tag-legends": "IMMORTALS",
        "title-legends": "Those Who Gave Life to the Stripes",
        "leg-1": "The most iconic figure in Fenerbahce history. First player to have a statue built.",
        "leg-2": "The epitome of elegance on the pitch, unforgettable Signor of the Italians.",
        "leg-3": "The Brazilian legend with a statue. The unforgettable number 10 of Kadıköy.",
        "leg-4": "The great captain who guarded the Fenerbahçe goal for 17 years.",
        "role-4": "Legend Goalkeeper",
        "tag-time": "TIMELINE",
        "title-time": "Steps of Evolution",
        "time-h1": "<i class='fas fa-futbol'></i> 1908 - First Matches",
        "time-p1": "The first football matches started to be played in front of wooden tribunes in the area known as the Priest's Meadow.",
        "time-h2": "<i class='fas fa-file-signature'></i> 1932 - Stadium Title Deed",
        "time-p2": "Under the leadership of Şükrü Saracoğlu, the land was purchased by Fenerbahçe Sports Club and an institutionalization step was taken.",
        "time-h3": "<i class='fas fa-hammer'></i> 1999 - Rebuilding Begins",
        "time-p3": "During the Aziz Yıldırım era, while matches continued to be played, the tribunes were torn down and rebuilt one by one.",
        "time-h4": "<i class='fas fa-stadium'></i> 2006 - Modern Temple",
        "time-p4": "The modern structure, where the tribunes were brought to zero to the pitch, completely closed, under-heated and with huge acoustics, was opened.",
        "tag-arch": "ARCHITECTURE",
        "title-arch": "Stadium Anatomy",
        "arch-h1": "Tribune Acoustics",
        "arch-p1": "The roof system is designed with a special slope to reflect the sound of the fans directly to the pitch. This turns Kadıköy into a nightmare for opponents.",
        "arch-h2": "VIP & Lodges",
        "arch-p2": "A high-level match viewing experience is offered with a total of 198 state-of-the-art equipped lodges and the 1907 Tribune.",
        "arch-h3": "Hybrid Turf Technology",
        "arch-p3": "A hybrid turf system, which is a combination of natural grass and synthetic fibers, is used on the ground.",
        "arch-h4": "Lighting & Scoreboard",
        "arch-p4": "There is an LED lighting system suitable for UEFA Elite stadium standards and huge high-resolution scoreboards.",
        "stat-lbl-1": "Capacity",
        "stat-lbl-2": "Pitch Length (m)",
        "stat-lbl-3": "Pitch Width (m)",
        "stat-lbl-4": "Name Given Year",
        "tag-chants": "GOOSEBUMPS",
        "title-chants": "Kadikoy Chants",
        "tag-gal": "VISUAL FEAST",
        "title-gal": "Faces of the Temple",
        "gal-1": "Stadium Exterior",
        "gal-2": "Derby Atmosphere",
        "gal-3": "Pitch View",
        "gal-4": "Fenerbahce Museum",
        "gal-5": "Striped Love",
        "gal-6": "Kadikoy Nights",
        "foot-desc": "The cradle of sports, the darling of millions. The lantern of the Republic continues to burn from Kadıköy.",
        "foot-links": "Quick Links",
        "link-1": "Museum Visit",
        "link-2": "Stadium Tour",
        "link-3": "Tickets",
        "link-4": "Fenerium",
        "foot-dev": "Developer",
        "dev-1": "Kirsehir Ahi Evran University Computer Aided Design and Animation student.",
        "dev-2": "Specializes in 3D modeling, web animations, game development and digital design."
    }
};

window.switchLang = function(lang) {
    document.getElementById('lang-tr').classList.remove('active');
    document.getElementById('lang-en').classList.remove('active');
    
    document.getElementById('lang-' + lang).classList.add('active');

    // Data-tr ve Data-en Nitelikli Alanları Çevir (Menüler ve Butonlar)
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.innerText = el.getAttribute('data-' + lang);
    });

    // ID İle Eşleşen Metinleri Çevir
    for (let key in dict[lang]) {
        let el = document.getElementById(key);
        if (el) {
            el.innerHTML = dict[lang][key];
        }
    }
};

// --------------------------------------------------------------------------
// 4. MÜZİK ÇALAR SİMÜLASYONU (MARŞLAR)
// --------------------------------------------------------------------------
window.currentChantAudio = null;
window.currentChantBox = null;

const chantFallbacks = {
    'audio/yasa-fenerbahce.mp3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'audio/mohikan-marsi.mp3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'audio/100-yil-marsi.mp3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
};

function stopCurrentChant() {
    if (window.currentChantAudio) {
        window.currentChantAudio.pause();
        window.currentChantAudio.currentTime = 0;
        window.currentChantAudio = null;
        window.currentChantBox = null;
    }
    document.querySelectorAll('.chant-box').forEach(b => b.classList.remove('playing'));
}

function startChantAudio(src, box) {
    const chantAudio = new Audio(src);
    chantAudio.loop = true;
    chantAudio.volume = 0.55;

    chantAudio.onerror = () => {
        const fallback = chantFallbacks[src];
        if (fallback && fallback !== src) {
            console.warn('Yerel ses bulunamadı, yedek parça yüklenecek:', fallback);
            startChantAudio(fallback, box);
        } else {
            console.error('Şarkı çalınamadı ve yedek yok:', src);
        }
    };

    chantAudio.play().then(() => {
        window.currentChantAudio = chantAudio;
        window.currentChantBox = box;
        box.classList.add('playing');
    }).catch(err => {
        console.warn('Şarkı çalma hatası:', src, err);
        const fallback = chantFallbacks[src];
        if (fallback && fallback !== src) {
            startChantAudio(fallback, box);
        }
    });
}

window.playChant = function(box) {
    const isPlaying = box.classList.contains('playing');
    const audioSrc = box.dataset.audio;

    stopCurrentChant();

    if (!isPlaying && audioSrc) {
        startChantAudio(audioSrc, box);
    }
};

// ==========================================================================
// 5. ANA SİSTEM (DOM YÜKLENDİKTEN SONRA TETİKLENEN MOTORLAR)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // Açılışta scroll'u kilitli tut
    document.body.classList.add("no-scroll");

    // ----------------------------------------------------------------------
    // A. PARTİKÜL MOTORU (KANVAS)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particlesArray = [];
        
        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        window.addEventListener('mousemove', (e) => { 
            mouse.x = e.x; 
            mouse.y = e.y; 
        });
        
        window.addEventListener('mouseout', () => { 
            mouse.x = undefined; 
            mouse.y = undefined; 
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 1; 
                this.density = (Math.random() * 40) + 1;
                
                const randomColor = Math.random();
                if (randomColor > 0.6) {
                    this.color = 'rgba(255, 209, 0, 0.6)'; 
                } else if (randomColor > 0.3) {
                    this.color = 'rgba(255, 255, 255, 0.15)'; 
                } else {
                    this.color = 'rgba(0, 31, 91, 0.4)'; 
                }

                this.speedY = (Math.random() * 0.8) - 0.4;
                this.speedX = (Math.random() * 0.8) - 0.4;
            }
            
            update() {
                this.y += this.speedY; 
                this.x += this.speedX;
                
                // Ekran dışına çıkınca diğer taraftan belirmesi
                if (this.y < 0) {
                    this.y = canvas.height;
                }
                if (this.y > canvas.height) {
                    this.y = 0;
                }
                if (this.x < 0) {
                    this.x = canvas.width;
                }
                if (this.x > canvas.width) {
                    this.x = 0;
                }
                
                // Mouse İtme Etkileşimi
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x; 
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance; 
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        
                        this.x -= (forceDirectionX * force * this.density);
                        this.y -= (forceDirectionY * force * this.density);
                    }
                }
            }
            
            draw() {
                ctx.fillStyle = this.color; 
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
                ctx.closePath(); 
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 8000; 
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) { 
                particlesArray[i].update(); 
                particlesArray[i].draw(); 
            }
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
            initParticles(); 
        });
        
        initParticles(); 
        animateParticles();
    }

    // ----------------------------------------------------------------------
    // B. KUSURSUZ İMLEÇ VE DALGALANMA (RIPPLE)
    // ----------------------------------------------------------------------
    const cursor = document.getElementById('cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorRipple = document.querySelector('.cursor-ripple');

    if (cursor) {
        let mouseX = -100; 
        let mouseY = -100;
        let ringX = -100; 
        let ringY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; 
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`; 
            cursorDot.style.top = `${mouseY}px`;
        });

        // RequestAnimationFrame ile pürüzsüz lerp takibi
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.4;
            ringY += (mouseY - ringY) * 0.4;
            
            cursorRing.style.left = `${ringX}px`; 
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Tıklama Ripple Animasyonu
        window.addEventListener('mousedown', (e) => {
            cursorRipple.style.left = `${e.clientX}px`;
            cursorRipple.style.top = `${e.clientY}px`;
            cursorRipple.classList.remove('active');
            
            // Reflow tetikleme (Animasyonu baştan başlatır)
            void cursorRipple.offsetWidth; 
            
            cursorRipple.classList.add('active');
        });

        // Hover Efektleri (A, Button, Galeri)
        const interactables = document.querySelectorAll('a, button, .gallery-item, .social-links a, .lang-switch span, .chant-box, .trophy-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // ----------------------------------------------------------------------
    // C. HEADER EFEKTİ (SCROLL DURUMUNDA ARKA PLAN DEĞİŞİMİ)
    // ----------------------------------------------------------------------
    const header = document.querySelector('.main-header');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const logoTopButton = document.getElementById('logo-top-button');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (logoTopButton) {
        logoTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = mobileNavPanel?.querySelectorAll('a');

    const toggleMobileNav = (open) => {
        if (!mobileNavPanel) return;
        if (open) {
            mobileNavPanel.classList.add('open');
            mobileNavPanel.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNavPanel.classList.remove('open');
            mobileNavPanel.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMobileNav(true));
    mobileNavClose?.addEventListener('click', () => toggleMobileNav(false));
    mobileNavPanel?.addEventListener('click', (event) => {
        if (event.target === mobileNavPanel) {
            toggleMobileNav(false);
        }
    });
    mobileNavLinks?.forEach(link => {
        link.addEventListener('click', () => toggleMobileNav(false));
    });

    const legendDetailOverlay = document.getElementById('legend-detail-overlay');
    const legendDetailImage = legendDetailOverlay?.querySelector('.legend-detail-img img');
    const legendDetailName = legendDetailOverlay?.querySelector('.legend-detail-name');
    const legendDetailRole = legendDetailOverlay?.querySelector('.legend-detail-role');
    const legendDetailText = legendDetailOverlay?.querySelector('.legend-detail-text');
    const legendDetailClose = legendDetailOverlay?.querySelector('.legend-detail-close');

    document.querySelectorAll('.legend-card').forEach(card => {
        card.addEventListener('click', () => {
            const cardImg = card.querySelector('img');
            const cardName = card.querySelector('h3')?.textContent || '';
            const cardRole = card.querySelector('.legend-role')?.textContent || '';
            const cardDetail = card.dataset.detail || card.querySelector('p')?.textContent || '';

            if (legendDetailImage && cardImg) {
                legendDetailImage.src = cardImg.src;
                legendDetailImage.alt = cardImg.alt || cardName;
            }
            if (legendDetailName) legendDetailName.textContent = cardName;
            if (legendDetailRole) legendDetailRole.textContent = cardRole;
            if (legendDetailText) legendDetailText.textContent = cardDetail;

            legendDetailOverlay?.classList.add('open');
            if (legendDetailOverlay) legendDetailOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.legend-detail-panel', { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
            }
        });
    });

    const closeLegendDetail = () => {
        if (!legendDetailOverlay) return;
        legendDetailOverlay.classList.remove('open');
        legendDetailOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    legendDetailClose?.addEventListener('click', closeLegendDetail);
    legendDetailOverlay?.addEventListener('click', (event) => {
        if (event.target === legendDetailOverlay) {
            closeLegendDetail();
        }
    });

    const trophyDetailOverlay = document.getElementById('trophy-detail-overlay');
    const trophyDetailTitle = trophyDetailOverlay?.querySelector('.trophy-detail-title');
    const trophyDetailMeta = trophyDetailOverlay?.querySelector('.trophy-detail-meta');
    const trophyDetailText = trophyDetailOverlay?.querySelector('.trophy-detail-text');
    const trophyDetailClose = trophyDetailOverlay?.querySelector('.trophy-detail-close');

    document.querySelectorAll('.trophy-card').forEach(card => {
        card.addEventListener('click', () => {
            const trophyName = card.querySelector('h3')?.textContent || '';
            const trophyDetail = card.dataset.detail || '';
            const trophyYear = card.dataset.year || '';

            if (trophyDetailTitle) trophyDetailTitle.textContent = trophyName;
            if (trophyDetailText) trophyDetailText.textContent = trophyDetail;
            if (trophyDetailMeta) trophyDetailMeta.textContent = trophyYear ? `Yıl: ${trophyYear}` : '';

            trophyDetailOverlay?.classList.add('open');
            if (trophyDetailOverlay) trophyDetailOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.trophy-detail-panel', { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
            }
        });
    });

    const closeTrophyDetail = () => {
        if (!trophyDetailOverlay) return;
        trophyDetailOverlay.classList.remove('open');
        trophyDetailOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    trophyDetailClose?.addEventListener('click', closeTrophyDetail);
    trophyDetailOverlay?.addEventListener('click', (event) => {
        if (event.target === trophyDetailOverlay) {
            closeTrophyDetail();
        }
    });

    // ----------------------------------------------------------------------
    // D. DONANIM HIZLANDIRMALI LENIS SCROLL (KASMA ENGELLEYİCİ)
    // ----------------------------------------------------------------------
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP kütüphanesi yüklenemedi. Site temel haliyle çalışacaktır.");
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);

    if (typeof Lenis !== "undefined") {
        try {
            const lenis = new Lenis({ 
                duration: 1.2, 
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
                smoothWheel: true,
                syncTouch: true 
            });
            
            lenis.on('scroll', ScrollTrigger.update);
            
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            
            gsap.ticker.lagSmoothing(0);
            
        } catch (e) {
            document.documentElement.style.overflow = "auto"; 
            document.body.style.overflow = "auto";
        }
    }

    // ----------------------------------------------------------------------
    // E. GSAP SCROLL ANİMASYONLARI VE TIMELINE'LAR
    // ----------------------------------------------------------------------
    window.initHeroAnimations = function() {
        const tl = gsap.timeline();
        
        tl.from(".hero-badge", { 
            y: 40, 
            opacity: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "back.out(1.5)" 
        })
        .from(".countdown-wrapper", { 
            scale: 0.8, 
            opacity: 0, 
            duration: 1, 
            ease: "power3.out" 
        }, "-=0.5")
        .from(".hero-title", { 
            scale: 0.9, 
            opacity: 0, 
            duration: 1.2, 
            ease: "power3.out" 
        }, "-=0.5")
        .from(".hero-subtitle", { 
            y: 30, 
            opacity: 0, 
            duration: 1 
        }, "-=0.7")
        .from(".scroll-indicator", { 
            opacity: 0, 
            y: 20, 
            duration: 1 
        }, "-=0.5");
    };

    // Bölüm Başlıkları Animasyonu
    gsap.utils.toArray(".section-header").forEach(header => {
        gsap.from(header, { 
            scrollTrigger: { 
                trigger: header, 
                start: "top 85%" 
            }, 
            y: 50, 
            opacity: 0, 
            duration: 1, 
            ease: "power2.out" 
        });
    });
    
    // Hikaye İçerik Kartları Animasyonu
    gsap.from(".story-image-box", { 
        scrollTrigger: { 
            trigger: "#story", 
            start: "top 75%" 
        }, 
        x: -80, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.out" 
    });
    
    gsap.from(".story-text-content", { 
        scrollTrigger: { 
            trigger: "#story", 
            start: "top 75%" 
        }, 
        x: 80, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.out" 
    });

    // 3D Kupa Kartları Animasyonu
    gsap.from(".trophy-card", { 
        scrollTrigger: { 
            trigger: ".trophy-showcase", 
            start: "top 80%" 
        }, 
        y: 100, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "back.out(1.2)" 
    });

    // Efsaneler Kartları Animasyonu
    gsap.from(".legend-card", { 
        scrollTrigger: { 
            trigger: ".legends-grid", 
            start: "top 80%" 
        }, 
        y: 60, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.2)" 
    });
    
    // Sayaçların Sayma Efekti (Odometer)
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter, 
            start: "top 90%", 
            once: true,
            onEnter: () => {
                let target = +counter.getAttribute('data-target');
                let obj = { value: 0 };
                gsap.to(obj, { 
                    value: target, 
                    duration: 2.5, 
                    ease: "power2.out", 
                    onUpdate: () => { 
                        counter.innerText = Math.floor(obj.value).toLocaleString("tr-TR"); 
                    } 
                });
            }
        });
    });

    // Parallax Arkaplan Kayması
    gsap.to(".parallax-bg", { 
        scrollTrigger: { 
            trigger: ".parallax-section", 
            start: "top bottom", 
            end: "bottom top", 
            scrub: true 
        }, 
        y: 200, 
        ease: "none" 
    });

    // Galeri Kartları Stagger Animasyonu
    gsap.utils.toArray(".gallery-item").forEach((item, i) => {
        gsap.from(item, { 
            scrollTrigger: { 
                trigger: ".gallery-masonry", 
                start: "top 85%" 
            }, 
            scale: 0.9, 
            opacity: 0, 
            duration: 0.8, 
            delay: (i % 3) * 0.15, 
            ease: "power2.out" 
        });
    });

});

// ==========================================================================
// MOBIL OPTİMİZASYONLARI (TELEFONLARDA SORUNSUZ ÇALIŞMA)
// ==========================================================================

// 1. MOBIL VIEWPORT YÜKSEKLİĞİ SORUNU FİKSİ (100VH İSSUE)
function fixMobileViewportHeight() {
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

fixMobileViewportHeight();

// 2. MOBİL TOUCH OPTİMİZASYONLARI
function initMobileTouchOptimizations() {
    // Touch event handling
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const mobileNavPanel = document.getElementById('mobile-nav-panel');
        
        // Dikey kaymaya karşı yatay kaymayı tercih et
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50 && mobileNavPanel?.classList.contains('open')) {
                // Sağdan sola kaydı - menüyü kapat
                const toggleMobileNav = window.toggleMobileNav;
                if (typeof toggleMobileNav === 'function') {
                    toggleMobileNav(false);
                }
            }
        }
    }
}

initMobileTouchOptimizations();

// 3. MOBİL PERFORMANS OPTİMİZASYONLARI
function initMobilePerformanceOptimizations() {
    // Mobil cihazların eğer belirlenmesi
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Video otomatik oynatmayı devre dışı bırak (mobilde veri tasarrufu)
        const bgVideo = document.getElementById('background-video');
        if (bgVideo && window.innerWidth < 768) {
            bgVideo.autoplay = false;
            bgVideo.pause();
            bgVideo.style.opacity = '0.7';
        }
        
        // Particle effects'i mobilde azalt
        const particlesCanvas = document.getElementById('particles-bg');
        if (particlesCanvas) {
            particlesCanvas.style.opacity = '0.5';
        }
        
        // Touch delay'ini kaldır (300ms tap delay)
        document.addEventListener('touchstart', () => {}, { passive: true });
    }
}

initMobilePerformanceOptimizations();

// 4. MOBIL MENÜ AÇMA/KAPAMA FONKSİYONU (GLOBAL)
window.toggleMobileNav = function(open) {
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    if (!mobileNavPanel) return;
    
    if (open) {
        mobileNavPanel.classList.add('open');
        mobileNavPanel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNavPanel.classList.remove('open');
        mobileNavPanel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

// 5. MOBİL SPLASH SCREEN OPTİMİZASYONU
function optimizeSplashScreenForMobile() {
    const isMobile = window.innerWidth < 768;
    const splash = document.getElementById('splash-screen');
    
    if (isMobile && splash) {
        // Mobil cihazlarda yükleme süresini kısalt
        let mobileProgress = 0;
        const mobileLoadInt = setInterval(() => {
            mobileProgress += Math.random() * 25;
            
            if (mobileProgress >= 100) {
                mobileProgress = 100;
                clearInterval(mobileLoadInt);
                
                const progBar = document.querySelector('.loading-progress');
                if (progBar) progBar.style.width = '100%';
                
                setTimeout(() => {
                    const loadingBar = document.querySelector('.loading-bar');
                    const loadingText = document.getElementById('loading-text');
                    const startBtn = document.getElementById('start-btn');
                    
                    if (loadingBar) loadingBar.style.display = 'none';
                    if (loadingText) loadingText.style.display = 'none';
                    if (startBtn) startBtn.style.display = 'inline-block';
                }, 300);
            }
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', optimizeSplashScreenForMobile);

// 6. MOBİL CIHAZLARDA KEYBOARD AÇILMASINI ÖNLE
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.classList.remove('no-scroll');
    }, 100);
});

// 7. MOBIL CIHAZLARDA DOUBLE TAP ZOOM'U DEVRE DIŞI BIRAK
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 8. MOBİL DETAY PANELI OPTİMİZASYONU
function optimizeDetailPanelsForMobile() {
    const legendOverlay = document.getElementById('legend-detail-overlay');
    const trophyOverlay = document.getElementById('trophy-detail-overlay');
    
    if (legendOverlay && trophyOverlay) {
        const isMobile = window.innerWidth < 768;
        
        [legendOverlay, trophyOverlay].forEach(overlay => {
            const panel = overlay.querySelector('[class*="-panel"]');
            if (panel && isMobile) {
                panel.style.maxHeight = '90vh';
                panel.style.overflowY = 'auto';
                panel.style.WebkitOverflowScrolling = 'touch';
            }
        });
    }
}

window.addEventListener('load', optimizeDetailPanelsForMobile);
window.addEventListener('resize', optimizeDetailPanelsForMobile);