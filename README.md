# MathPersona PBK

Aplikasi web statis untuk mengubah rumus matematika jadi soal cerita sesuai hobi siswa — lengkap dengan cek kualitas otomatis, edit manual guru, dan mode latihan siswa.

---

## Fitur Utama

Aplikasi ini jalan **100% di browser** tanpa API AI eksternal atau server backend:

1. **Atur Soal & Minat (Modul A)**
   - Mendukung 3 materi: **Fungsi Linear** (`y = c ± mx`), **SPLDV**, dan **Geometri (Luas Gabungan)**.
   - Bisa pilih hobi/topik spesifik (plus ketik kata kunci sendiri), atur jenjang (`SD`, `SMP Kelas 7 Pemula`, `SMP Kelas 8–9`), level soal, batas kata, rumus bantuan, dan ukuran benda dari simulasi sensor **TensorFlow Lite & Google ARCore**.
2. **Rumus Kunci & Aturan Soal (Modul B)**
   - **Kode Python:** Mengunci hitungan angka di kode Python biar jawaban nggak meleset.
   - **Aturan Prompt:** Menampilkan aturan pembuatan soal cerita (target kelas, kata kunci hobi, larangan angka pengecoh/SNI, dan batas kata).
3. **Cek Kualitas Otomatis — 4 Agen (Modul C)**
   - Mengecek soal dengan status `LULUS` / `GAGAL` lewat 4 agen: **Cek Hitungan (Accuracy)**, **Cek Masuk Akal (Realism)**, **Cek Hobi (Authenticity)**, dan **Cek Bahasa & SNI (Reading-Level)**.
   - Tombol **Perbaiki Otomatis** (*Refinement Agent*) otomatis membenahi soal yang gagal sampai maksimal 5 kali revisi.
4. **Edit Guru (Modul D)**
   - Guru bebas edit teks soal secara manual atau pakai tombol cepat (*Ganti Nama Siswa*, *Naikkan Harga*, *Tes Salah Ketik Nol*).
   - Kalau ada angka atau mata uang yang diubah, sistem otomatis mengunci akses ke Mode Siswa sampai guru klik **Cek Ulang**.
5. **Mode Siswa (Tahap 5)**
   - Tampilan latihan yang bersih buat siswa, lengkap dengan rumus bantuan opsional, cek jawaban fleksibel (`Rp13.000`, `13000`, `0,2451`), dan langkah cara ngerjainnya.

## 3 Contoh Kasus Siap Demo

- **Kasus 1 — Linear (`Kedai Es Teh Nusantara`):** Soal cerita dengan rumus bantuan buat SMP Kelas 7 (`Rp25.000`, `Rp3.000`, `x = 4` → `Rp13.000`) plus demo cek nominal Rupiah yang nggak wajar.
- **Kasus 2 — SPLDV (`Roblox`):** Awalnya sengaja punya 3 masalah (jawaban kembar `x = y = 20`, istilah umum `"game online"` & `"peti emas"`/`"koin emas"`, dan aturan tantangan yang belum ditulis), lalu dibenerin otomatis jadi `x = 15, y = 25`.
- **Kasus 3 — Geometri SD (`Unit PC & Keyboard`):** Awalnya ditolak karena pakai 4 angka di belakang koma (`0,2451 m²`) buat anak SD, lalu dikonversi otomatis ke sentimeter bulat (`2451 cm²`).

---

## Cara Menjalankan

1. Buka langsung file `index.html` di browser, atau
2. Jalankan server lokal opsional:
   ```bash
   python -m http.server 8000
   ```
   Lalu buka `http://localhost:8000`.

---

## Struktur File

```text
.
├── index.html      # Tampilan utama (Mode Per Langkah, Lihat Semua, dan Mode Siswa)
├── style.css       # Desain antarmuka responsif dan ramah proyektor
├── script.js       # Logika hitung, template soal, 4 agen cek, perbaikan otomatis, dan mode siswa
└── PLAN.md         # Rencana implementasi awal
```
