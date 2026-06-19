const yasakliKelimeler = ["küfür1", "küfür2", "argo1"];

// DÜNYADAKİ TÜM PREMİUM DİLLERİN SÖZLÜĞÜ
const diller = {
    tr: {
        search: "Evrende arama yapın...", home: "🏠 Ana Sayfa", popular: "🔥 Popüler Konular", favs: "⭐ Favorilerim",
        tech: "Teknoloji", code: "Yazılım", life: "Gündem", accHeading: "👤 Hesap Oluştur / Değiştir",
        formHeading: "✍️ Yeni Bir Konu Fırlat", error: "🛑 Argo/Sanal dışı kelime tespit edildi!",
        titlePlaceholder: "Konu Başlığı", bodyPlaceholder: "Fikirlerini evrene duyur...",
        btnCreate: "Konuyu Evrene Gönder", myProfile: "📊 Profil Durumun", gStats: "🌐 Global İstatistikler",
        members: "Toplam Üye:", active: "Aktif Sinyal:", deleteBtn: "Yok Et", following: "Takip Edilen:", followers: "Takipçi:"
    },
    en: {
        search: "Search across the universe...", home: "🏠 Home", popular: "🔥 Popular", favs: "⭐ Favorites",
        tech: "Technology", code: "Software", life: "Agenda", accHeading: "👤 Create/Switch Account",
        formHeading: "✍️ Launch New Topic", error: "🛑 Toxic words detected!",
        titlePlaceholder: "Topic Title", bodyPlaceholder: "Broadcast your mind...",
        btnCreate: "Launch to Universe", myProfile: "📊 Profile Stats", gStats: "🌐 Global Stats",
        members: "Total Members:", active: "Active Signals:", deleteBtn: "Annihilate", following: "Following:", followers: "Followers:"
    },
    de: {
        search: "Suche im Universum...", home: "🏠 Startseite", popular: "🔥 Beliebt", favs: "⭐ Favoriten",
        tech: "Technologie", code: "Software", life: "Agenda", accHeading: "👤 Konto erstellen",
        formHeading: "✍️ Neues Thema starten", error: "🛑 Unangemessene Wörter erkannt!",
        titlePlaceholder: "Thementitel", bodyPlaceholder: "Sende deine Gedanken...",
        btnCreate: "Ins Universum senden", myProfile: "📊 Profilstatus", gStats: "🌐 Globale Statistiken",
        members: "Mitglieder gesamt:", active: "Aktive Signale:", deleteBtn: "Löschen", following: "Gefolgt:", followers: "Follower:"
    },
    es: {
        search: "Buscar en el universo...", home: "🏠 Inicio", popular: "🔥 Popular", favs: "⭐ Favoritos",
        tech: "Tecnología", code: "Software", life: "Agenda", accHeading: "👤 Crear Cuenta",
        formHeading: "✍️ Lanzar nuevo tema", error: "🛑 ¡Palabras tóxicas detectadas!",
        titlePlaceholder: "Título", bodyPlaceholder: "Transmite tu mente...",
        btnCreate: "Lanzar al Universo", myProfile: "📊 Estado del Perfil", gStats: "🌐 Estadísticas Globales",
        members: "Total Miembros:", active: "Señales Activas:", deleteBtn: "Eliminar", following: "Siguiendo:", followers: "Seguidores:"
    },
    zh: {
        search: "在宇宙中搜索...", home: "🏠 首页", popular: "🔥 热门话题", favs: "⭐ 个人收藏",
        tech: "技术探索", code: "软件开发", life: "每日生计", accHeading: "👤 账户创建与切换",
        formHeading: "✍️ 发射新话题", error: "🛑 检测到违规词汇！",
        titlePlaceholder: "话题标题", bodyPlaceholder: "广播你的思想...",
        btnCreate: "发射到宇宙", myProfile: "📊 个人状态", gStats: "🌐 全局数据",
        members: "总会员数:", active: "活跃信号:", deleteBtn: "摧毁", following: "正在关注:", followers: "粉丝数:"
    },
    ja: {
        search: "全宇宙を検索...", home: "🏠 ホーム", popular: "🔥 トレンド", favs: "⭐ お気に入り",
        tech: "技術", code: "開発", life: "ライフ", accHeading: "👤 アカウント作成・切替",
        formHeading: "✍️ 新トピック射出", error: "🛑 不適切な表現が含まれています！",
        titlePlaceholder: "タイトル", bodyPlaceholder: "思考を空間に放て...",
        btnCreate: "宇宙へポスト", myProfile: "📊 プロファイルステータス", gStats: "🌐 全体統計",
        members: "総メンバー数:", active: "アクティブシグナル:", deleteBtn: "抹消", following: "フォロー中:", followers: "フォロワー:"
    },
    ru: {
        search: "Поиск по вселенной...", home: "🏠 Главная", popular: "🔥 Популярное", favs: "⭐ Избранное",
        tech: "Технологии", code: "Софт", life: "Повестка", accHeading: "👤 Создать профиль",
        formHeading: "✍️ Запустить топик", error: "🛑 Обнаружен запрещенный контент!",
        titlePlaceholder: "Заголовок темы", bodyPlaceholder: "Транслируйте мысли...",
        btnCreate: "Запустить во вселенную", myProfile: "📊 Статус профиля", gStats: "🌐 Глобальная статистика",
        members: "Всего участников:", active: "Активные сигналы:", deleteBtn: "Уничтожить", following: "Подписки:", followers: "Подписчики:"
    }
};

// AKTİF KULLANICI NESNESİ
let aktifKullanici = {
    username: "Matrix_Neo",
    bio: "Evreni optimize eden bir kodlayıcı.",
    color: "#00f0ff",
    following: []
};

document.addEventListener("DOMContentLoaded", () => {
    // LocalStorage'dan hesabı geri çağır
    const kayitliHesap = localStorage.getItem("forum_aktif_hesap");
    if (kayitliHesap) {
        aktifKullanici = JSON.parse(kayitliHesap);
    }
    
    // Varsayılan input alanlarını doldur
    document.getElementById("acc-username").value = aktifKullanici.username;
    document.getElementById("acc-bio").value = aktifKullanici.bio;
    document.getElementById("acc-avatar-color").value = aktifKullanici.color;

    profilArayuzunuGuncelle();
    postlariYukle();
    
    const kayitliDil = localStorage.getItem("forum_dil") || "tr";
    document.getElementById("language-select").value = kayitliDil;
    dilDegistir(kayitliDil);
});

// HESAP SİSTEMİNİ KAYDETME VE GÜNCELLEME
document.getElementById("btn-save-account").addEventListener("click", () => {
    const uName = document.getElementById("acc-username").value.trim();
    const uBio = document.getElementById("acc-bio").value.trim();
    const uColor = document.getElementById("acc-avatar-color").value;

    if (!uName) return alert("Kullanıcı adı boş bırakılamaz!");

    aktifKullanici.username = uName;
    aktifKullanici.bio = uBio || "Sistem sakini.";
    aktifKullanici.color = uColor;

    localStorage.setItem("forum_aktif_hesap", JSON.stringify(aktifKullanici));
    profilArayuzunuGuncelle();
    postlariYukle(); // Gönderilerdeki ismini ve renklerini dinamik tazelemek için
    alert("Hesap senkronizasyonu tamamlandı!");
});

function profilArayuzunuGuncelle() {
    const ilkHarf = aktifKullanici.username.charAt(0).toUpperCase();
    
    // Navigasyon Güncelleme
    document.getElementById("nav-avatar").innerText = ilkHarf;
    document.getElementById("nav-avatar").style.backgroundColor = aktifKullanici.color;
    document.getElementById("nav-username").innerText = aktifKullanici.username;

    // Sağ Panel Profil Kartı Güncelleme
    document.getElementById("stats-avatar").innerText = ilkHarf;
    document.getElementById("stats-avatar").style.backgroundColor = aktifKullanici.color;
    document.getElementById("stats-avatar").style.boxShadow = `0 0 20px ${aktifKullanici.color}`;
    document.getElementById("stats-username").innerText = aktifKullanici.username;
    document.getElementById("stats-bio").innerText = aktifKullanici.bio;
    document.getElementById("user-following-count").innerText = aktifKullanici.following.length;
}

// TAKİP ETME MOTORU
function takipEt(hedefUser, btn) {
    if (hedefUser === aktifKullanici.username) return alert("Kendini takip edemezsin, evren döngüye girer!");

    const index = aktifKullanici.following.indexOf(hedefUser);
    if (index > -1) {
        aktifKullanici.following.splice(index, 1);
        btn.innerText = "Takip Et";
        btn.classList.remove("following");
    } else {
        aktifKullanici.following.push(hedefUser);
        btn.innerText = "Takip Ediliyor";
        btn.classList.add("following");
    }

    localStorage.setItem("forum_aktif_hesap", JSON.stringify(aktifKullanici));
    document.getElementById("user-following-count").innerText = aktifKullanici.following.length;
}

// YENİ KONU BAŞLATMA
document.getElementById("submit-post-btn").addEventListener("click", () => {
    const tInput = document.getElementById("post-title-input");
    const cInput = document.getElementById("post-category-input");
    const bInput = document.getElementById("post-body-input");
    const uyarici = document.getElementById("kufur-uyarisi");

    const baslik = tInput.value.trim();
    const icerik = bInput.value.trim();

    if (!baslik || !icerik) return alert("Alanlar boş bırakılamaz!");

    const tarama = (baslik + " " + icerik).toLowerCase();
    let temiz = true;
    yasakliKelimeler.forEach(k => { if(tarama.includes(k)) temiz = false; });

    if(!temiz) { uyarici.style.display = "block"; return; }
    uyarici.style.display = "none";

    const yeniPost = {
        id: Date.now(),
        baslik: baslik,
        icerik: icerik,
        kategori: cInput.value,
        yazar: aktifKullanici.username,
        yazarRenk: aktifKullanici.color,
        oy: 0,
        favori: false,
        yorumlar: []
    };

    const veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    veri.unshift(yeniPost);
    localStorage.setItem("cyber_posts", JSON.stringify(veri));

    postEkranaBas(yeniPost);
    tInput.value = ""; bInput.value = "";
    dilDegistir(document.getElementById("language-select").value);
});

function postEkranaBas(post) {
    const feed = document.getElementById("forum-feed");
    let bClass = "badge-gundem", bText = "Gündem";
    if(post.kategori === "tech") { bClass = "badge-tech"; bText = "Teknoloji"; }
    if(post.kategori === "yazilim") { bClass = "badge-yazilim"; bText = "Yazılım"; }

    const isFollowing = aktifKullanici.following.includes(post.yazar) ? "following" : "";
    const followText = aktifKullanici.following.includes(post.yazar) ? "Takip Ediliyor" : "Takip Et";

    const kart = document.createElement("div");
    kart.classList.add("post-card");
    kart.setAttribute("data-id", post.id);
    kart.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="avatar" style="background-color:${post.yazarRenk}">${post.yazar.charAt(0).toUpperCase()}</div>
                <div class="user-details">
                    <div class="username">${escapeHTML(post.yazar)} <span class="badge ${bClass}">${bText}</span></div>
                    <div class="meta">Sinyal Aktif</div>
                </div>
                <button class="btn follow-btn ${isFollowing}" onclick="takipEt('${escapeHTML(post.yazar)}', this)">${followText}</button>
            </div>
            <button class="mod-btn" onclick="postYokEt(${post.id}, this)">Yok Et</button>
        </div>
        <div class="post-title">${escapeHTML(post.baslik)}</div>
        <div class="post-body">${linkleriBaglantiyaDonustur(escapeHTML(post.icerik))}</div>
        <div class="post-actions">
            <button class="action-btn" onclick="oyla(${post.id}, this)">🔺 <span class="count">${post.oy}</span></button>
            <button class="action-btn" onclick="toggleYorumlar(this)">💬 Yorumlar (${post.yorumlar.length})</button>
            <button class="action-btn ${post.favori?'favorited':''}" onclick="favoriYap(${post.id}, this)">⭐</button>
        </div>
        <div class="comments-section">
            <div class="comment-form">
                <input type="text" class="form-control" placeholder="Alt yorum satırı...">
                <button class="btn btn-primary" style="width:auto;" onclick="yorumAt(${post.id}, this)">Gönder</button>
            </div>
            <div class="comment-list">
                ${post.yorumlar.map(c => `<div class="comment-item"><strong>${escapeHTML(c.kim)}:</strong> ${escapeHTML(c.ne)}</div>`).join('')}
            </div>
        </div>
    `;
    feed.insertBefore(kart, feed.firstChild);
}

function postlariYukle() {
    document.getElementById("forum-feed").innerHTML = "";
    const veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    veri.reverse().forEach(p => postEkranaBas(p));
}

function postYokEt(id, btn) {
    let veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    veri = veri.filter(p => p.id !== id);
    localStorage.setItem("cyber_posts", JSON.stringify(veri));
    btn.closest(".post-card").remove();
}

function oyla(id, btn) {
    let veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    const span = btn.querySelector(".count");
    veri.forEach(p => {
        if(p.id === id) { p.oy += 1; span.innerText = p.oy; btn.classList.add("upvoted"); }
    });
    localStorage.setItem("cyber_posts", JSON.stringify(veri));
}

function favoriYap(id, btn) {
    let veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    veri.forEach(p => {
        if(p.id === id) { p.favori = !p.favori; btn.classList.toggle("favorited"); }
    });
    localStorage.setItem("cyber_posts", JSON.stringify(veri));
}

function yorumAt(id, btn) {
    const inp = btn.parentElement.querySelector("input");
    const txt = inp.value.trim();
    if(!txt) return;

    let veri = JSON.parse(localStorage.getItem("cyber_posts")) || [];
    veri.forEach(p => {
        if(p.id === id) {
            p.yorumlar.push({ kim: aktifKullanici.username, ne: txt });
            const list = btn.closest(".comments-section").querySelector(".comment-list");
            list.innerHTML += `<div class="comment-item"><strong>${escapeHTML(aktifKullanici.username)}:</strong> ${escapeHTML(txt)}</div>`;
        }
    });
    localStorage.setItem("cyber_posts", JSON.stringify(veri));
    inp.value = "";
}

function toggleYorumlar(btn) {
    const sec = btn.closest(".post-card").querySelector(".comments-section");
    sec.style.display = (sec.style.display === "block") ? "none" : "block";
}

// ENGINE TOOLS
function linkleriBaglantiyaDonustur(t) { return t.replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank">${url}</a>`); }
function escapeHTML(t) { return t.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// THEME SYSTEM
document.getElementById("theme-btn").addEventListener("click", () => {
    const mode = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    document.getElementById("theme-btn").innerText = mode === "light" ? "☀️" : "🌙";
});

// DİL ÇEVİRİ MOTORU
function dilDegistir(d) {
    const slc = diller[d];
    localStorage.setItem("forum_dil", d);
    document.getElementById("forum-search").placeholder = slc.search;
    document.getElementById("menu-home").innerText = slc.home;
    document.getElementById("menu-popular").innerText = slc.popular;
    document.getElementById("menu-favs").innerText = slc.favs;
    document.getElementById("cat-tech").innerText = slc.tech;
    document.getElementById("cat-code").innerText = slc.code;
    document.getElementById("cat-life").innerText = slc.life;
    document.getElementById("acc-heading").innerText = slc.accHeading;
    document.getElementById("form-heading").innerText = slc.formHeading;
    document.getElementById("kufur-uyarisi").innerText = slc.error;
    document.getElementById("post-title-input").placeholder = slc.titlePlaceholder;
    document.getElementById("post-body-input").placeholder = slc.bodyPlaceholder;
    document.getElementById("submit-post-btn").innerText = slc.btnCreate;
    document.getElementById("my-profile-heading").innerText = slc.myProfile;
    document.getElementById("stats-heading").innerText = slc.gStats;
    document.getElementById("stat-members").innerHTML = slc.members + " <strong>99,821</strong>";
    document.getElementById("stat-active").innerHTML = slc.active + " <strong>4,112</strong>";
    document.getElementById("lbl-following").innerText = slc.following;
    document.getElementById("lbl-followers").innerText = slc.followers;
    document.querySelectorAll(".mod-btn").forEach(b => b.innerText = slc.deleteBtn);
}
document.getElementById("language-select").addEventListener("change", (e) => dilDegistir(e.target.value));

// CANLI ARAMA MOTORU
document.getElementById("forum-search").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll(".post-card").forEach(p => {
        const title = p.querySelector(".post-title").innerText.toLowerCase();
        const body = p.querySelector(".post-body").innerText.toLowerCase();
        p.style.display = (title.includes(val) || body.includes(val)) ? "block" : "none";
    });
});
                   
