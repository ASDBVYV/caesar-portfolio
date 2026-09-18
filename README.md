# Caesar Ibrahim — Portfolio Website

Website portfolio pribadi untuk Caesar Ibrahim, seorang UI/UX Designer & Website Developer. Dibangun murni dengan HTML5, CSS3, dan JavaScript Vanilla berdasarkan desain `Landing Page.svg`.

## 🔗 Live Demo

_(isi setelah deploy ke Vercel)_

## ✨ Features

- Hero section dengan foto profil dan tautan sosial media
- About Me dengan animated skill/progress bar (UX, Website Design, App Design, Graphic Design)
- Services grid (UI/UX, Web Design, App Design, Graphic Design)
- My Projects dengan filter kategori (All, UI/UX, Web Design, App Design, Graphic Design) menggunakan JavaScript
- Testimonials slider/carousel otomatis dengan dukungan swipe di mobile
- Contact form dengan validasi email sederhana
- Navbar sticky dengan mobile hamburger menu
- Smooth scrolling antar section
- Scroll reveal animation yang ringan
- Fully responsive: 1920px, 1440px, 1024px, 768px, 480px, 375px
- Semantic HTML, alt text pada gambar, label pada form, dan fokus keyboard yang terlihat

## 🛠️ Technologies

- HTML5
- CSS3 (custom properties, Grid & Flexbox)
- JavaScript Vanilla (ES6+, tanpa framework/library)
- [Google Fonts](https://fonts.google.com/) — Baloo 2 (heading) & Poppins (body)

## 📁 Struktur Folder

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/       # foto profil, thumbnail proyek, avatar testimoni
│   └── icons/        # (cadangan jika ingin memakai file ikon sendiri)
└── README.md
```

## ▶️ Cara Menjalankan Project

Karena project ini adalah static site (tanpa build tool), kamu bisa langsung membukanya:

**Opsi 1 — Buka langsung**
Klik dua kali `index.html`, atau buka lewat browser.

**Opsi 2 — Live Server (disarankan, agar path & font lebih stabil)**
1. Buka folder ini di VS Code
2. Install extension **Live Server**
3. Klik kanan `index.html` → **Open with Live Server**

**Opsi 3 — Python simple server**
```bash
cd portfolio
python3 -m http.server 5500
```
Lalu buka `http://localhost:5500` di browser.

## 🚀 Cara Deploy

### Deploy ke Vercel
1. Push project ini ke repository GitHub kamu.
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repository tersebut.
3. Framework preset pilih **Other** (static HTML/CSS/JS), build command kosongkan, output directory `.` (root).
4. Klik **Deploy**.

### Deploy ke GitHub Pages (alternatif gratis)
1. Push project ke GitHub.
2. Masuk ke **Settings → Pages**.
3. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.

## ✏️ Cara Mengedit Portfolio

- **Ganti nama, deskripsi, teks** → edit langsung di `index.html` (semua teks ditulis apa adanya, tidak digenerate JS).
- **Ganti foto** → ganti file di `assets/images/` dengan nama file yang sama, atau ubah atribut `src` di `index.html`.
- **Ubah warna** → semua warna terpusat di bagian `:root { ... }` paling atas `style.css` (`--color-orange`, `--color-bg`, dll).
- **Tambah/ubah proyek** → duplikasi satu blok `<article class="project-card" data-category="...">` di section `#projects`, lalu sesuaikan gambar, judul, dan `data-category` (`uiux`, `web`, `app`, `graphic`).
- **Tambah testimoni** → duplikasi satu blok `<figure class="testi-card">` di section `#testimonials`; slider & dot akan otomatis menyesuaikan jumlah slide.
- **Ubah skill bar** → ubah nilai `style="--value:88%"` pada tiap `.skill__fill`.

## ⚠️ Known Issues / Catatan

- Tombol sosial media, "Download CV", dan form kontak saat ini adalah placeholder (belum terhubung ke akun nyata / backend email). Sambungkan sesuai kebutuhanmu.
- Form kontak hanya melakukan validasi format email di sisi client — belum mengirim email sungguhan. Untuk itu perlu backend/layanan pihak ketiga (mis. Formspree, EmailJS, atau API sendiri).

---

© 2026 Caesar Ibrahim. All rights reserved.
