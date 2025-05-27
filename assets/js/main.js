// --- DİL AYARI ---

// URL'den dili oku, geçerli değilse 'en' yap
const urlParams = new URLSearchParams(location.search);
const supportedLangs = ["tr", "en"];
let lang = urlParams.get("lang");
if (!supportedLangs.includes(lang)) {
    lang = "en"; // varsayılan dil
}
const otherLang = lang === "tr" ? "en" : "tr";

// --- TEMA AYARI ---

function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    const icon = document.querySelector("#themeToggle i");
    if (icon) {
        icon.className = theme === "dark" ? "bi bi-moon" : "bi bi-sun";
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-bs-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
}

// --- SAYFA YÜKLENDİĞİNDE ---
document.addEventListener("DOMContentLoaded", () => {
    // Tema ayarını yükle
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Tema butonu tıklanınca değiştir
    document.addEventListener("click", e => {
        if (e.target.closest("#themeToggle")) {
            toggleTheme();
        }
    });

    // Header yükle
    fetch("partials/header.html")
        .then(res => res.text())
        .then(html => {
            document.querySelector("header").innerHTML = html;

            // Dil butonu güncelle
            const langSwitcher = document.getElementById("langSwitcher");
            if (langSwitcher) {
                langSwitcher.textContent = otherLang.toUpperCase();
                const url = new URL(location.href);
                url.searchParams.set("lang", otherLang);
                langSwitcher.href = url.pathname + url.search;
            }
        });

    fetch(`/data/strings-${lang}.json`)
        .then(res => res.json())
        .then(t => {
            // Hero kısmı
            document.getElementById("hero-title").textContent = t.heroTitle;
            document.getElementById("hero-subtitle").textContent = t.heroSubtitle;
            document.getElementById("hero-button").textContent = t.heroButton;
            document.getElementById("hero-button").href = "pages/contact.html";

            // Menü başlıklarını güncelle
            document.querySelectorAll('#mainMenu [data-menu-key]').forEach(link => {
                const key = link.getAttribute("data-menu-key");
                if (t.menu[key]) {
                    link.textContent = t.menu[key];
                }
            });
        });


    // Footer yükle
    fetch("partials/footer.html")
        .then(res => res.text())
        .then(html => {
            document.querySelector("footer").innerHTML = html;
        });

    // Hero içeriklerini dil bazlı JSON'dan çek
    fetch(`/data/strings-${lang}.json`)
        .then(res => res.json())
        .then(t => {
            document.getElementById("hero-title").textContent = t.heroTitle;
            document.getElementById("hero-subtitle").textContent = t.heroSubtitle;
            document.getElementById("hero-button").textContent = t.heroButton;
            document.getElementById("hero-button").href = "pages/contact.html";
        });
});

