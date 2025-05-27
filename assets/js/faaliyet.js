const urlParams = new URLSearchParams(location.search);
const slug = urlParams.get("slug");
const lang = urlParams.get("lang") || "tr";

if (!slug) {
    location.href = "404.html"; // veya basit bir hata mesajı gösterebilirsin
}

fetch(`/data/faaliyetler-${lang}.json`)
    .then(res => res.json())
    .then(list => {
        const item = list.find(i => i.slug === slug);
        if (!item) {
            document.getElementById("faaliyet-title").textContent = "İçerik bulunamadı";
            return;
        }

        document.title = item.title + " | Kırat Hukuk";
        document.getElementById("page-title").textContent = item.title;
        document.getElementById("faaliyet-title").textContent = item.title;
        document.getElementById("faaliyet-content").innerHTML = item.content;

        if (item.image) {
            const img = document.getElementById("faaliyet-image");
            img.src = `assets/img/${item.image}`;
            img.alt = item.title;
            img.classList.remove("d-none");
        }
    });
