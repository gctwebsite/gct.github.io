// KÜFÜR VE ARGO FİLTRE LİSTESİ
// Algılanmasını istediğin tüm kelimeleri buraya ekleyebilirsin
const yasakliKelimeler = ["küfür1", "küfür2", "argo1", "aptal", "salak"];

// 1. TEMA YÖNETİMİ (Koyu / Açık Tema Değişimi)
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

// 2. YORUM PANELİNİ AÇMA / KAPATMA
function toggleComments(btn) {
    const postCard = btn.closest(".post-card");
    const commentSection = postCard.querySelector(".comments-section");
    commentSection.style.display = (commentSection.style.display === "block") ? "none" : "block";
}

// 3. BEĞENİ VE OYLAMA SİSTEMİ (Upvote / Downvote)
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

// 4. DİNAMİK YORUM EKLEME VE YORUM İÇİ KÜFÜR KONTROLÜ
function addComment(btn) {
    const commentForm = btn.parentElement;
    const input = commentForm.querySelector("input");
    const commentList = commentForm.nextElementSibling;
    const countText = commentForm.parentElement.parentElement.querySelector(".c-count");
    
    let text = input.value.trim();
    if (!text) return;

    // Küfür Kontrolü
    let temizMetin = text.toLowerCase();
    let icerikTemizMi = true;
    yasakliKelimeler.forEach(kelime => {
        if (temizMetin.includes(kelime)) icerikTemizMi = false;
    });

    if (!icerikTemizMi) {
        alert("Yorumunuz uygunsuz kelimeler içerdiği için sistem tarafından reddedildi!");
        return;
    }

    // Yorum Kartını Basma
    const yeniYorum = document.createElement("div");
    yeniYorum.classList.add("comment-item");
    yeniYorum.innerHTML = `
        <div class="comment-meta"><span>@Kullanici_1</span><span>Şimdi</span></div>
        ${escapeHTML(text)}
    `;

    commentList.appendChild(yeniYorum);
    countText.innerText = parseInt(countText.innerText) + 1;
    input.value = "";
}

// 5. YENİ KONU OLUŞTURMA VE SANSÜR SİSTEMİ
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
        alert("Lütfen alanları boş bırakmayın!");
        return;
    }

    // Küfür Tarayıcı Motoru
    const tamMetin = (baslik + " " + icerik).toLowerCase();
    let kontrolTemizMi = true;
    yasakliKelimeler.forEach(kelime => {
        if (tamMetin.includes(kelime)) kontrolTemizMi = false;
    });

    if (!kontrolTemizMi) {
        kufurUyarisi.style.display = "block";
        window.scrollTo({ top: kufurUyarisi.offsetTop - 100, behavior: 'smooth' });
        return;
    }

    kufurUyarisi.style.display = "none";

    // Kategorilendirme Ayarları
    let badgeClass = "badge-gundem", badgeText = "Gündem", avatarColor = "var(--accent-color)";
    if (kategori === "tech") { badgeClass = "badge-tech"; badgeText = "Teknoloji"; avatarColor = "var(--primary-color)"; }
    if (kategori === "yazilim") { badgeClass = "badge-yazilim"; badgeText = "Yazılım"; avatarColor = "var(--success-color)"; }

    // Yeni Konu HTML Şablon Enjeksiyonu
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
        <div class="post-body">${escapeHTML(icerik)}</div>
        <div class="post-actions">
            <button class="action-btn" onclick="handleVote(this, 'up')">🔺 <span class="count">0</span></button>
            <button class="action-btn" onclick="handleVote(this, 'down')">🔻</button>
            <button class="action-btn" onclick="toggleComments(this)">💬 Yorumlar (<span class="c-count">0</span>)</button>
            <button class="action-btn" onclick="this.classList.toggle('favorited')">⭐</button>
        </div>
        <div class="comments-section">
            <div class="comment-form">
                <input type="text" class="form-control" placeholder="Cevabınızı veya yardımınızı yazın...">
                <button class="btn btn-primary" onclick="addComment(this)">Gönder</button>
            </div>
            <div class="comment-list"></div>
        </div>
    `;

    forumFeed.insertBefore(yeniPost, forumFeed.firstChild);
    postTitleInput.value = "";
    postBodyInput.value = "";
});

// 6. CANLI ARAMA MOTORU
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

// XSS GÜVENLİK FİLTRESİ (HTML Kod Enjeksiyonu Engeller)
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                               }
