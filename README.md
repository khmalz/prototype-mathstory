# MathPersona PBK

Prototipe web statis **Sistem Pengajaran Berbantuan Komputer (PBK) Berbasis Kendali Berlapis untuk Mengubah Rumus Matematika Menjadi Soal Cerita Sesuai Kegemaran Siswa**.

---

## Fitur Utama

Prototipe ini mensimulasikan secara deterministik (100% *client-side* tanpa API AI eksternal) arsitektur kendali empat lapis:

1. **Modul A — Input Terstruktur & Sensor Konteks Nyata**
   - Mendukung 3 materi: **Fungsi Linear Dua Langkah** (`y = c ± mx`), **SPLDV**, dan **Geometri Luas Bangun Gabungan**.
   - Profil minat granular siswa (dropdown skenario hobi + kata kunci bebas), jenjang (`SD`, `SMP Kelas 7 Pembaca Pemula`, `SMP Kelas 8–9`), tingkat kesulitan, batas kata, *scaffolding* rumus, serta simulasi input sensor **TensorFlow Lite & Google ARCore**.
2. **Modul B — Penjangkaran Simbolik & Prompt Kendala**
   - **Langkah A (`Kode Python`):** Memetakan variabel matematis ke kode Python *read-only* lengkap dengan kunci jawaban simbolik.
   - **Langkah B (`Prompt Kendala`):** Menampilkan *instructional-based prompt* terstruktur (`Peran`, `Tugas`, `Aturan khusus`, SNI, dan batas kata).
3. **Modul C — Evaluasi 4 Agen Otonom & Refinement Agent**
   - Penilaian biner (`LULUS` / `GAGAL`) oleh **Mathematical Accuracy Agent**, **Realism Agent**, **Authenticity Agent**, dan **Reading-Level & SNI Agent** (termasuk deteksi angka dekoratif).
   - **Refinement Agent** memperbaiki isu secara otomatis hingga maksimal 5 iterasi disertai log revisi.
4. **Modul D — Kurasi Guru (*Teacher-in-the-Loop*)**
   - Editor soal interaktif dengan aksi cepat (*Ganti Nama Murid*, *Ubah Harga (+Rp1.000)*, *Uji Salah Ketik Nol (Rp)* / *Skala Rupiah Wajar*).
   - Deteksi perubahan angka atau mata uang secara *real-time* yang mengunci penerbitan hingga guru menekan **Verifikasi Ulang**.
5. **Modul E — Mode Pratinjau Siswa**
   - Tampilan lembar latihan bersih, bantuan rumus opsional (KaTeX + fallback offline), pengecekan jawaban fleksibel (`Rp13.000`, `13000`, `0,2451`), dan langkah penyelesaian simbolik.

## 3 Preset Kasus Demo

- **Kasus 1 — Aljabar Linear (`Kedai Es Teh Nusantara`):** Simulasi *scaffolding* untuk SMP Kelas 7 (`Rp25.000`, `Rp3.000`, `x = 4` → `Rp13.000`) dan demo deteksi ketidakwajaran nominal oleh *Realism Agent*.
- **Kasus 2 — SPLDV (`Roblox`):** Mendemonstrasikan 3 kegagalan awal (*solusi simetris*, *generik & entitas ambigu*, *informasi implisit*) lalu diperbaiki otomatis oleh *Refinement Agent* (`x = 15, y = 25`).
- **Kasus 3 — Geometri Luas Gabungan (`Unit PC & Keyboard`):** Mendemonstrasikan penolakan beban 4 desimal untuk siswa SD (`0,2451 m²`) dan penegasan sisi alas ARCore, lalu konversi ke sentimeter bulat (`2451 cm²`).

---

## Cara Menjalankan Secara Lokal

Aplikasi berjalan **100% statis** tanpa *build tools* maupun server backend:

1. Buka langsung file `index.html` di browser (`file://`), atau
2. Jalankan server statis lokal opsional:
   ```bash
   python -m http.server 8000
   ```
   Lalu buka `http://localhost:8000`.

---

## Struktur File

```text
.
├── index.html      # Struktur semantik Workbench Guru (Modul A–D) dan Mode Siswa (Modul E)
├── style.css       # Design system Academic Math Studio, responsif, WCAG-compliant
├── script.js       # State store, Math & Template Engine, 4 Evaluator Agents, Refinement, Kurasi
└── PLAN.md         # Rencana arsitektur dan implementasi
```
