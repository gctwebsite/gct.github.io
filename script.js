const yasakliKelimeler = ["küfür1", "küfür2", "argo1", "aptal", "salak"];

// ÇOKLU DİL SÖZLÜĞÜ
const diller = {
    tr: {
        search: "Konularda arama yapın...", home: "🏠 Ana Sayfa", popular: "🔥 Popüler Konular",
        favs: "⭐ Favorilerim", tech: "Teknoloji", code: "Yazılım / Kodlama", life: "Gündem / Yaşam",
        formHeading: "✍️ Yeni Konu Paylaş", error: "🛑 Hata: Yazınızda argo veya küfürlü kelimeler tespit edilmiştir!",
        titlePlaceholder: "Konu Başlığı", bodyPlaceholder: "Sorununuzu detaylıca açıklayın...",
        btnCreate: "Konuyu Oluştur", stats: "📊 Platform İstatistikleri", members: "Toplam Üye:", active: "Aktif Konular:"
    },
    en: {
        search: "Search in topics...", home: "🏠 Home", popular: "🔥 Popular Topics",
        favs: "⭐ My Favorites", tech: "Technology", code: "Software / Coding", life: "Agenda / Life",
        formHeading: "✍️ Share New Topic", error: "🛑 Error: Bad words or slang detected!",
        titlePlaceholder: "Topic Title", bodyPlaceholder: "Explain your problem...",
        btnCreate: "Create Topic", stats: "📊 Platform Statistics", members: "Total Members:", active: "Active Topics:"
    },
    de: {
        search: "Themen durchsuchen...", home: "🏠 Startseite", popular: "🔥 Beliebte Themen",
        favs: "⭐ Meine Favoriten", tech: "Technologie", code: "Software / Kodierung", life: "Agenda / Leben",
        formHeading: "✍️ Neues Thema teilen", error: "🛑 Fehler: Schimpfwörter erkannt!",
        titlePlaceholder: "Thementitel", bodyPlaceholder: "Erklären Sie Ihr Problem...",
        btnCreate: "Thema erstellen", stats: "📊 Plattform-Statistiken", members: "Gesamtmitglieder:", active: "Aktive Themen:"
    }
};

// DİL DEĞİŞTİRME ETKİNLİĞİ
const langSelect = document.getElementById("language-select");
langSelect.addEventListener("change", (e) => {
    const secilenDil = diller[e.target.value];
    document.getElementById("forum-search").placeholder = secilenDil.search;
    document.getElementById("menu-home").innerText = secilenDil.home;
    document.getElementById("menu-popular").innerText = secilenDil.popular;
    document.getElementById("menu-favs").innerText = secilenDil.favs;
    document.getElementById("cat-tech").innerText = secilenDil.tech;
    document.getElementById("cat-code").innerText = secilenDil.code;
    document.getElementById("cat-life").innerText = secilenDil.life;
    document.getElementById("form-heading").innerText = secilenDil.formHeading;
    document.getElementById("kufur-uyarisi").innerText = secilenDil.error;
    document.getElementById("post-title-input").placeholder = secilenDil.titlePlaceholder;
    document.getElementById("post-body-input").placeholder = secilenDil.bodyPlaceholder;
    document.getElementById("submit-post-btn").innerText = secilenDil.btnCreate;
    document.getElementById("stats-heading").innerText = secilenDil.stats;
    document.getElementById("stat-members").innerText = secilenDil.members;
    document.getElementById("stat-active").innerText = secilenDil.active;
});

// METİN İÇİNDEKİ LİNKLERİ BULUP OTO TIKLANABİLİR YAPMA
function linkleriBaglantiyaDonustur(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

// TEMA DEGISTIRICI
const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        themeBtn.innerText = "🌙";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeBtn.innerText = "☀️";
    }
});

function toggleComments(btn) {
    const postCard = btn.closest(".post-card");
    const commentSection = postCard.querySelector(".comments-section");
    commentSection.style.display = (commentSection.style.display === "block") ? "none" : "block";
}

function handleVote(btn, type) {
    const parent = btn.parentElement;
    const upBtn = parent.children[0];
    const downBtn = parent.children[1];
    const countSpan = upBtn.querySelector(".count");
    let currentCount = parseInt(countSpan.innerText);

    if (type === 'up') {
        if (upBtn.classList.contains('upvoted')) {
            upBtn.classList.remove('upvoted');
            countSpan.innerText = currentCount - 1;
        } else {
            if (downBtn.classList.contains('downvoted')) downBtn.classList.remove('downvoted');
            upBtn.classList.add('upvoted');
            countSpan.innerText = currentCount + 1;
        }
    } else if (type === 'down') {
        if (downBtn.classList.contains('downvoted')) {
            downBtn.classList.remove('downvoted');
        } else {
            if (upBtn.classList.contains('upvoted')) {
                upBtn.classList.remove('upvoted');
                countSpan.innerText = currentCount - 1;
            }
            downBtn.classList.add('downvoted');
        }
    }
}

function addComment(btn) {
    const commentForm = btn.parentElement;
    const input = commentForm.querySelector("input");
    const commentList = commentForm.nextElementSibling;
    const countText = commentForm.parentElement.parentElement.querySelector(".c-count");
    
    let text = input.value.trim();
    if (!text) return;

    let temizMetin = text.toLowerCase();
    let icerikTemizMi = true;
    yasakliKelimeler.forEach(kelime => {
        if (temizMetin.includes(kelime)) icerikTemizMi = false;
    });

    if (!icerikTemizMi) {
        alert("Uygunsuz içerik engellendi!");
        return;
    }

    let guvenliYorum = escapeHTML(text);
    let linkliYorum = linkleriBaglantiyaDonustur(guvenliYorum);

    const yeniYorum = document.createElement("div");
    yeniYorum.classList.add("comment-item");
    yeniYorum.innerHTML = `
        <div class="comment-meta"><span>@Kullanici_1</span><span>Şimdi</span></div>
        ${linkliYorum}
    `;

    commentList.appendChild(yeniYorum);
    countText.innerText = parseInt(countText.innerText) + 1;
    input.value = "";
}

// YENİ KONU EKLEME
const submitPostBtn = document.getElementById("submit-post-btn");
const postTitleInput = document.getElementById("post-title-input");
const postCategoryInput = document.getElementById("post-category-input");
const postBodyInput = document.getElementById("post-body-input");
const kufurUyarisi = document.getElementById("kufur-uyarisi");
const forumFeed = document.getElementById("forum-feed");

submitPostBtn.addEventListener("click", () => {
    const baslik = postTitleInput.value.trim();
    const kategori = postCategoryInput.value;
    const icerik = postBodyInput.value.trim();

    if (!baslik || !icerik) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    const tamMetin = (baslik + " " + icerik).toLowerCase();
    let kontrolTemizMi = true;
    yasakliKelimeler.forEach(kelime => {
        if (tamMetin.includes(kelime)) kontrolTemizMi = false;
    });

    if (!kontrolTemizMi) {
        kufurUyarisi.style.display = "block";
        return;
    }

    kufurUyarisi.style.display = "none";

    let badgeClass = "badge-gundem", badgeText = "Gündem", avatarColor = "var(--accent-color)";
    if (kategori === "tech") { badgeClass = "badge-tech"; badgeText = "Teknoloji"; avatarColor = "var(--primary-color)"; }
    if (kategori === "yazilim") { badgeClass = "badge-yazilim"; badgeText = "Yazılım"; avatarColor = "var(--success-color)"; }

    let guvenliIcerik = escapeHTML(icerik);
    let linkliIcerik = linkleriBaglantiyaDonustur(guvenliIcerik);

    const yeniPost = document.createElement("div");
    yeniPost.classList.add("post-card");
    yeniPost.setAttribute("data-category", kategori);

    yeniPost.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="avatar" style="background-color: ${avatarColor};">U</div>
                <div class="user-details">
                    <div class="username">Kullanici_1 <span class="badge ${badgeClass}">${badgeText}</span></div>
                    <div class="meta">Şimdi paylaşıldı</div>
                </div>
            </div>
            <button class="mod-btn" onclick="this.closest('.post-card').remove()">Sil</button>
        </div>
        <div class="post-title">${escapeHTML(baslik)}</div>
        <div class="post-body">${linkliIcerik}</div>
        <div class="post-actions">
            <button class="action-btn" onclick="handleVote(this, 'up')">🔺 <span class="count">0</span></button>
            <button class="action-btn" onclick="handleVote(this, 'down')">🔻</button>
            <button class="action-btn" onclick="toggleComments(this)">💬 Yorumlar (<span class="c-count">0</span>)</button>
            <button class="action-btn" onclick="this.classList.toggle('favorited')">⭐</button>
        </div>
        <div class="comments-section">
            <div class="comment-form">
                <input type="text" class="form-control" placeholder="Cevabınızı yazın...">
                <button class="btn btn-primary" onclick="addComment(this)">Gönder</button>
            </div>
            <div class="comment-list"></div>
        </div>
    `;

    forumFeed.insertBefore(yeniPost, forumFeed.firstChild);
    postTitleInput.value = "";
    postBodyInput.value = "";
});

// ARAMA MOTORU
const searchInput = document.getElementById("forum-search");
searchInput.addEventListener("input", (e) => {
    const arananKelime = e.target.value.toLowerCase();
    const postlar = forumFeed.querySelectorAll(".post-card");

    postlar.forEach(post => {
        const baslik = post.querySelector(".post-title").innerText.toLowerCase();
        const icerik = post.querySelector(".post-body").innerText.toLowerCase();
        
        if (baslik.includes(arananKelime) || icerik.includes(arananKelime)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
});

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                               }
