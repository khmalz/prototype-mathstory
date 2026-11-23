# Rencana Implementasi (PLAN.md) — MathPersona PBK

Prototipe web statis **Sistem PBK Personalisasi Soal Cerita Matematika** (Kelompok 10, Ilmu Komputer UNJ) berdasarkan [PRD.md](.agents/PRD.md).  
Prinsip utama: **100% offline-ready (`file://`)**, **tanpa model AI/API eksternal**, **tanpa build tool**, dan **siap presentasi di proyektor**.

---

## 1. Pemetaan Skill terhadap Fitur PRD

Ketiga skill yang terpasang di `.agents/skills/` diterapkan secara eksplisit pada arsitektur dan UI prototipe:

| Skill Terpasang | Penerapan Spesifik pada Fitur PRD |
|---|---|
| **`frontend-design`** | - **Identitas visual khusus (*Academic Math Studio*)**: Menolak gaya template generik/AI-slop (tanpa background cream `#F4F1EA` + terracotta, tanpa label ALL-CAPS berlebihan, tanpa kartu SaaS seragam).<br>- **Hierarki radius & kontras**: Panel utama (`12px`), kontrol input (`8px`), badge status (`6px`). Panel kode *Symbolic Grounding* (Modul B) dijadikan satu jangkar visual gelap (`#0F172A`) yang kontras terhadap kanvas kerja terang (`#F4F7FB`).<br>- **Copywriting fungsional**: Bahasa Indonesia aktif & jelas pada CTA (misal: *"Jalankan Refinement Agent"*, *"Verifikasi Ulang"*, *"Terbitkan ke Mode Siswa"*), pesan kesalahan *evaluator* langsung menyebutkan penyebab + tindakan perbaikan tanpa basa-basi.<br>- **Motion terkendali**: Transisi hanya pada respons aksi pengguna (ganti preset, siklus refinement, verifikasi ulang, ganti mode Guru ↔ Siswa). |
| **`ui-ux-pro-max`** | - **Tipografi keterbacaan tinggi (*Academic/Research pairing*)**: Menggunakan `Atkinson Hyperlegible` (membedakan angka `0/O` dan `1/l/I` secara tegas di layar proyektor) untuk body/soal, `Plus Jakarta Sans` untuk heading, dan `JetBrains Mono` untuk panel *Symbolic Grounding* — dengan fallback font sistem instan saat offline.<br>- **Sistem token warna semantik & kontras WCAG ≥ 4.5:1**: Tidak pernah mengandalkan warna semata pada status 4 Agen (`LULUS` = hijau + ikon centang, `GAGAL` = merah + ikon silang, `PERINGATAN` = kuning + ikon seru).<br>- **Target interaksi & responsivitas**: Ukuran kontrol tombol minimal `40–44px`, layout 2 kolom desktop (`≥ 1024px`) meluruh rapi ke 1 kolom pada layar kecil (`≤ 768px`) tanpa *horizontal scroll*.<br>- **Ikon vektor murni**: Menggunakan ikon SVG bergaya Lucide (tanpa emoji sebagai ikon UI). |
| **`web-design-guidelines`** | - **Aksesibilitas & Semantik HTML**: `<button>` untuk semua aksi, `<label for="...">` eksplisit pada seluruh input Modul A/D/E, `aria-hidden="true"` pada ikon dekoratif, `aria-live="polite"` untuk status evaluasi agen, banner wajib verifikasi ulang, dan umpan balik jawaban siswa.<br>- **Focus & Form Hygiene**: `:focus-visible` dengan ring kontras tinggi (tanpa `outline: none` mentah), `autocomplete="off"`, `inputmode="decimal"`, `font-variant-numeric: tabular-nums` untuk seluruh koefisien/angka jawaban, serta tidak pernah memblokir *paste* di editor guru.<br>- **Animasi & Performa**: `prefers-reduced-motion` dihormati, dilarang memakai `transition: all` (properti CSS didaftarkan eksplisit), serta `overscroll-behavior: contain` pada panel/modal pratinjau. |

---

## 2. Arsitektur File & Keputusan Teknis

### Struktur Folder & File (3 File Statis Tanpa Build Step)

```text
transformasi-mtk-soalcerita/
├── index.html      # Struktur semantik (Header, Stepper 5 Tahap, Workbench Guru 2 Kolom, View Pratinjau Siswa)
├── style.css       # Design tokens (:root), layout grid responsif, gaya proyektor, status badge, reduced-motion
├── script.js       # State store, Math Engine, Template Engine, 4 Evaluator Agents, Refinement, Teacher Guard, Student View
├── PLAN.md         # Dokumen rencana implementasi ini
└── .agents/        # PRD & Skills (tidak dimuat oleh browser)
```

**Alasan memilih 3 file (`index.html`, `style.css`, `script.js`) dibanding 1 file monolitik:**
Tetap memenuhi Batasan Teknis PRD (maksimal 3 file, langsung buka `index.html` via protokol `file://` tanpa server/CORS issue karena `<script defer src="script.js">` klasik non-ESM bekerja 100% di `file://`), namun jauh lebih bersih, mudah diaudit, dan modular secara logika.

### Pustaka Ringan Sisi Klien (Terverifikasi via MCP Context7) & Strategi Offline-First

| Pustaka | Versi & Sumber Terverifikasi (Context7) | Strategi Penggunaan & Fallback Offline |
|---|---|---|
| **KaTeX** *(Opsional / Progressive Enhancement)* | `katex@0.19.1` via jsDelivr:<br>- CSS: `https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css` (`integrity="sha384-WwGtaC6ywCHxA5cstpj/3+xIZvTez8dq2IcBQaXRkenHZ7FVVq1ZROtURwfbtTlG"`)<br>- JS: `https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.js` (`integrity="sha384-a1WQdjRj162i159OYq041X6I4K8NenkrI09LlPmiHg0YOb7CR+wJOraXwK9abpnE"`) | - **Dipanggil secara terprogram via `katex.renderToString(tex, { throwOnError: false })`**, BUKAN `auto-render`. Alasan kritis: soal Kasus 1 mengandung simbol mata uang `$25` dan `$3`; `auto-render` akan keliru menafsirkan teks di antara dua `$` sebagai rumus LaTeX.<br>- **Fallback 100% Offline**: Jika dibuka tanpa internet (`typeof window.katex === 'undefined'`), helper `renderMath(tex, plainHtml)` otomatis merender markup HTML/Unicode rapi (`y = 25 − 3x`, `m²`, `a₁x + b₁y = c₁`). |
| **Ikon UI (Lucide Style)** | Context7 memverifikasi Lucide UMD CDN `https://unpkg.com/lucide@1.67.0/dist/umd/lucide.min.js`, **namun dipilih Inline SVG** | **Keputusan Teknis**: Menyematkan ~14 ikon SVG Lucide ringan langsung dalam kamus `ICONS` di `script.js` / `index.html` agar 100% tampil tajam baik saat online maupun offline tanpa *network request* atau *layout shift*. |
| **CSS Framework** | *Tidak memakai Tailwind Play CDN* | **Keputusan Teknis**: Tailwind Play CDN gagal total jika presentasi tanpa internet. Menggunakan Pure CSS (`style.css`) menjamin tampilan 100% identik offline maupun online. |
| **Tipografi** | Google Fonts (`Atkinson Hyperlegible`, `Plus Jakarta Sans`, `JetBrains Mono`) dengan `display=swap` | Dimuat non-blocking dengan fallback font lokal (`Segoe UI`, `system-ui`, `Consolas`) sehingga halaman instan tanpa jeda saat offline. |

---

## 3. Desain Sistem & Logika Deterministik (Client-Side)

### A. Struktur Data `state` Tunggal (`script.js`)

```js
const state = {
  activeView: 'teacher',       // 'teacher' | 'student'
  activeStage: 1,              // 1..5 (sinkron dengan stepper navigasi)
  activePreset: 'case1',       // 'case1' | 'case2' | 'case3' | 'custom'
  input: {
    topic: 'linear',           // 'linear' | 'spldv' | 'geometry'
    // Parameter Linear: y = c ± m*x
    linear: { c: 25, m: 3, x: 4, op: '-', currency: '$' },
    // Parameter SPLDV: a1*x + b1*y = c1; a2*x + b2*y = c2
    spldv: { a1: 1, b1: 1, c1: 40, a2: 2, b2: 5, c2: 140 },
    // Parameter Geometri: L = (p1*l1) + (p2*l2)
    geometry: {
      objectPreset: 'pc_keyboard',
      obj1Name: 'Unit PC', p1: 0.51, l1: 0.36,
      obj2Name: 'Keyboard', p2: 0.41, l2: 0.15,
      unit: 'm',
      convertToCmForSD: false
    },
    hobbyPreset: 'joes_juice_bar',
    hobbyKeyword: "Joe's Juice Bar",
    studentName: 'Alex',
    grade: 'SMP',              // 'SD' | 'SMP'
    difficulty: 'Easy',        // 'Easy' | 'Intermediate' | 'Advanced'
    maxWords: 65,
    showScaffolding: true
  },
  symbolicAnchor: {
    code: '',                  // String pseudo-Python read-only
    formulaLatex: '',          // String LaTeX untuk KaTeX
    formulaPlain: '',          // Fallback Unicode/HTML
    answer: null,              // { value } atau { x, y } + unit/currency
    steps: []                  // Array langkah penyelesaian simbolik
  },
  draft: {
    text: '',                  // Teks draf aktif (sumber untuk 4 agen & editor)
    iteration: 1,              // 1..5
    maxIterations: 5,
    refinementLogs: [],        // Catatan perbaikan tiap siklus untuk transparansi demo
    flags: {                   // Penanda skenario deterministik (misal flaw Kasus 2)
      useGenericHobby: false,
      ambiguousEntity: false,
      implicitMapping: false,
      baseSurfaceNotSpecified: false
    }
  },
  evaluation: {
    accuracy:     { status: 'PASS', metric: '', reason: '' },
    realism:      { status: 'PASS', metric: '', reason: '' },
    authenticity: { status: 'PASS', metric: '', reason: '' },
    readingLevel: { status: 'PASS', metric: '', reason: '' },
    allPassed: true
  },
  curation: {
    baselineText: '',          // Teks terverifikasi terakhir
    baselineSignature: '',     // Sidik jari angka + mata uang (untuk deteksi mutasi)
    needsReverification: false,
    reverificationMessage: '',
    isPublished: true
  },
  student: {
    inputPrimary: '',          // Jawaban Linear / Geometri atau nilai x (SPLDV)
    inputSecondary: '',        // Nilai y (SPLDV)
    checked: false,
    isCorrect: false,
    feedback: ''
  }
};
```

### B. Kamus Skenario Hobi (Template Engine Deterministik)
Mendukung 5 skenario hobi dari PRD (`joes_juice_bar`, `roblox`, `pc_keyboard`, `futsal`, `kpop`) untuk **ketiga topik matematika**, ditambah sisipan dinamis `hobbyKeyword` kustom pengguna. Prinsip *Significant Number Identification* ditegakkan: hanya angka yang berasal dari parameter input yang boleh muncul di narasi (tidak ada angka dekoratif seperti jam/tanggal/peringkat yang mengecoh).

### C. Logika 4 Agen Evaluator & Refinement Agent

1. **Mathematical Accuracy Agent**
   - Menghitung solusi deterministik di JS:
     - *Linear*: `y = op === '-' ? c - m * x : c + m * x`.
     - *SPLDV*: `D = a1*b2 - a2*b1`, `Dx = c1*b2 - c2*b1`, `Dy = a1*c2 - a2*c1`, `x = Dx/D`, `y = Dy/D`. Wajib `D !== 0`, `x > 0`, `y > 0`, dan keduanya bilangan bulat (`Number.isInteger`).
     - *Geometri*: `L1 = round6(p1*l1)`, `L2 = round6(p2*l2)`, `L = round6(L1 + L2)` (menghindari *floating point artifact* seperti `0.24510000000000002`).
   - Memverifikasi seluruh angka parameter input eksis di dalam `draft.text` (normalisasi koma/titik desimal Indonesia `0,51` ↔ `0.51` dan pemisah ribuan `25.000` ↔ `25000`).
   - **Cek Daya Diagnostik (SPLDV)**: Menandai `GAGAL` apabila `x === y` (solusi simetris yang rentan ditebak siswa tanpa memodelkan sistem persamaan).

2. **Realism Agent**
   - Memastikan semua kuantitas/jawaban bernilai positif (`≥ 0` untuk saldo sisa, `> 0` untuk dimensi & jumlah item).
   - **Aturan Beban Desimal SD (Geometri)**: Jika `grade === 'SD'` dan terdapat input atau hasil dengan > 2 angka di belakang koma (misal `0,2451 m²`), berstatus `GAGAL` dengan pesan spesifik menyarankan konversi satuan ke `cm` (dan pengingat bahwa pengukuran diarahkan ke tapak alas objek).
   - **Aturan Konsistensi Mata Uang vs Nominal**:
     - Jika teks mengandung `Rp` disertai nominal kecil tak wajar (`< 500`, misal `Rp3` atau `Rp25` untuk harga/saldo minuman), berstatus `GAGAL` (nominal Rupiah terlalu rendah/tidak realistis).
     - Jika teks mengandung `$` disertai nominal puluhan ribu (`≥ 5000`) untuk pembelian eceran harian, berstatus `GAGAL` (nominal Dolar tidak wajar).

3. **Authenticity Agent**
   - Memastikan `hobbyKeyword` (case-insensitive) muncul persis di dalam `draft.text`.
   - Mendeteksi frasa generik pengganti (misal `"game online"` tanpa menyebut `"Roblox"`) → `GAGAL`.
   - Mendeteksi kerancuan entitas ambigu yang berdekatan (pola seperti `"peti emas"` bersamaan dengan `"koin emas"`) → `GAGAL`.

4. **Reading-Level Agent**
   - Menghitung jumlah kata: `text.trim().split(/\s+/).filter(Boolean).length`. Jika `wordCount > maxWords` → `GAGAL`.
   - Menghitung rata-rata kata per kalimat; jika `grade === 'SD'` dan rata-rata > `18` kata/kalimat → `GAGAL`.
   - Mendeteksi informasi implisit pada pola tantangan–hadiah SPLDV: jika teks menyebut `"tantangan"` dan `"peti"` tetapi tidak memuat pernyataan eksplisit (`/(setiap|tiap)\s*(1|satu)?\s*tantangan/i`) → `GAGAL`.

5. **Refinement Agent (Siklus Maksimal 5 Iterasi)**
   - Tombol aktif hanya jika `!evaluation.allPassed && draft.iteration < 5`.
   - Saat diklik, agen mengeksekusi rencana perbaikan deterministik atas semua agen yang `GAGAL`:
     - *Accuracy (SPLDV simetris)*: menyesuaikan konstanta `c2` (pada Kasus 2: `140 → 155` sehingga solusi menjadi `x = 15, y = 25`; pada kasus kustom simetris lain: geser `c2` secara proporsional agar `x ≠ y` tetap bulat positif) dan memperbarui *Symbolic Anchor* + draf.
     - *Authenticity*: mengganti istilah generik (`"game online"` → `"permainan Roblox"` atau menyisipkan `hobbyKeyword` yang hilang) dan membedakan entitas ambigu (`"peti emas"` → `"peti berlian"`).
     - *Reading-Level*: menyisipkan kalimat eksplisit (`"Setiap 1 tantangan yang diselesaikan memberikan tepat 1 peti."`) atau meringkas kalimat berlebih jika melebihi `maxWords`.
     - *Realism (Geometri SD)*: mengaktifkan `convertToCmForSD = true`, mengonversi dimensi meter ke sentimeter bulat (`× 100`), memperjelas *"tapak alas"*, dan menghitung ulang luas (`2451 cm²`).
   - Menaikkan `draft.iteration`, mencatat ringkasan perbaikan ke `refinementLogs`, lalu menjalankan ulang keempat agen evaluator.

### D. Mekanisme Kurasi Guru (*Teacher-in-the-Loop*) & Regex Verifikasi Ulang
- **Pemantauan `oninput`**: Setiap ketikan guru di `<textarea>` mengekstrak **sidik jari numerik & mata uang** via regex (`/(?:Rp\.?\s*|\$)?\d+(?:[.,]\d+)*/gi` + deteksi token `Rp` / `$`).
- **Trigger Wajib Verifikasi**:
  - Jika sidik jari angka/mata uang berubah dibanding `baselineSignature` → set `curation.needsReverification = true`, status berubah ke banner kuning **"Perubahan Terdeteksi — Wajib Verifikasi Ulang"**, tombol **"Terbitkan ke Mode Siswa"** dinonaktifkan (`disabled`).
  - Jika guru hanya mengganti nama siswa (misal `Alex → Budi`) tanpa mengubah angka/mata uang → tetap aman, namun seluruh perubahan teks tetap tersinkron ke pratinjau siswa setelah dikonfirmasi.
- **Tombol Aksi Cepat (*Epistemic Moves*)**:
  1. `Ganti Nama Murid` (rotasi `Alex → Budi → Rani → Sari`).
  2. `Lokalisi Mata Uang ($ → Rp)` (mengganti simbol `$` menjadi `Rp` secara langsung agar presenter mudah mendemonstrasikan deteksi penolakan `Rp3` oleh *Realism Agent* pada Kasus 1).
  3. `Skala ke Rupiah Wajar (×1.000)` (membantu demo cepat mengubah `Rp25` & `Rp3` menjadi `Rp25.000` & `Rp3.000`, atau presenter dapat mengetiknya manual di textarea).
- **Saat "Verifikasi Ulang" Diklik**:
  - Parser regex mengekstrak seluruh nilai numerik & mata uang dari teks hasil suntingan guru.
  - Pada topik *Linear* (Kasus 1): jika nilai `c` dan `m` diubah konsisten oleh guru (misal `Rp25.000` dan `Rp3.000` dengan `x = 4`), sistem menyinkronkan parameter perhitungan, memperbarui rumus & kunci jawaban otomatis (`Rp13.000`), lalu menjalankan ulang keempat agen.
  - Jika *Realism* / *Accuracy* mendeteksi ketidakwajaran (misal `Rp25` dan `Rp3`, atau rumus eksplisit di teks tidak cocok dengan angka narasi) → tetap `GAGAL` dan tombol terbitkan tetap terkunci hingga diperbaiki.

### E. Mode Pratinjau Siswa (*Student Exercise View*)
- Antarmuka bersih bebas panel teknis agen (menyerupai lembar latihan digital SD/SMP).
- Menampilkan: chip identitas (Materi, Jenjang, Tag Minat), teks soal final hasil kurasi guru, kotak **Bantuan Rumus (Scaffolding)** jika dicentang (dirender via KaTeX/fallback), kolom input jawaban (`1` input untuk Linear/Geometri; `2` input berlabel `x` dan `y` untuk SPLDV).
- Toleransi parsing jawaban siswa: menerima titik atau koma desimal (`0,2451` = `0.2451`), pemisah ribuan (`13.000` = `13000`), serta simbol mata uang/satuan opsional (`$13`, `Rp13.000`, `2451 cm2`).
- Klik **"Periksa Jawaban"** menampilkan umpan balik **Benar / Belum Tepat** (via `aria-live="polite"`) dan membuka kotak **Langkah Penyelesaian Simbolik** (diketahui → model matematika → substitusi/eliminasi → hasil akhir).

---

## 4. Rancangan 3 Preset Kasus Demo (Sesuai Bab 3.4 Proposal)

| Preset | Parameter Awal | Kondisi Awal 4 Agen | Alur Demo Presentasi |
|---|---|---|---|
| **Kasus 1 — Aljabar Linear** *(Joe's Juice Bar)* | $y = 25 - 3x$ ($c=25, m=3, x=4$), Minat: `Joe's Juice Bar`, Jenjang: `SMP`, Kesulitan: `Easy`, Scaffolding: `Aktif`, Batas Kata: `65`. | **4/4 `LULUS`** (Kunci: `$13`). | 1. Tunjukkan *Symbolic Grounding* Python & 4 agen `LULUS`.<br>2. Di Editor Guru, klik *Lokalisi ($ → Rp)* → muncul status **Wajib Verifikasi Ulang**.<br>3. Klik *Verifikasi Ulang* → *Realism Agent* `GAGAL` (`Rp3` tidak realistis).<br>4. Ubah ke `Rp25.000` & `Rp3.000` (manual atau tombol skala `×1.000`), klik *Verifikasi Ulang* → `LULUS` (Kunci otomatis jadi `Rp13.000`).<br>5. Buka *Mode Siswa* dan uji jawaban `13000`. |
| **Kasus 2 — SPLDV** *(Roblox — Deteksi Celah & Refinement)* | $x + y = 40$, $2x + 5y = 140$, Minat: `Roblox`, Jenjang: `SMP`, Kesulitan: `Intermediate`, Batas Kata: `70`. Draf awal sengaja memuat *"game online"*, *"peti emas"* vs *"koin emas"*, & tanpa keterangan *"1 tantangan = 1 peti"*. | **3 `GAGAL`, 1 `LULUS`**<br>- Accuracy: `GAGAL` ($x=20, y=20$ simetris)<br>- Authenticity: `GAGAL` (generik & ambigu)<br>- Reading-Level: `GAGAL` (info implisit)<br>- Realism: `LULUS` | 1. Sorot bagaimana 3 celah pedagogis terdeteksi otomatis.<br>2. Klik **"Jalankan Refinement Agent"** → Iterasi naik ke `2 / 5`: persamaan disesuaikan ke $2x + 5y = 155$ ($x=15, y=25$), teks menyebut `"permainan Roblox"`, `"peti berlian"`, dan aturan `"Setiap 1 tantangan ... tepat 1 peti"`.<br>3. Semua 4 agen berubah menjadi **`LULUS`** dan log revisi tampil.<br>4. Uji jawaban `x = 15`, `y = 25` di *Mode Siswa*. |
| **Kasus 3 — Geometri Luas Gabungan** *(PC & Keyboard — ARCore SD)* | $L = (p_1 \times l_1) + (p_2 \times l_2)$, Unit PC `0.51 m × 0.36 m`, Keyboard `0.41 m × 0.15 m`, Minat: `Perangkat Komputer Meja`, Jenjang: `SD`, Kesulitan: `Advanced`, Konversi cm SD: `Nonaktif`. | **1 `GAGAL`, 3 `LULUS`**<br>- Realism: `GAGAL` (beban 4 desimal `0,2451 m²` melampaui kurikulum SD + catatan tapak alas)<br>- Accuracy, Authenticity, Reading-Level: `LULUS`. | 1. Tunjukkan peringatan *Realism Agent* untuk jenjang SD.<br>2. Klik **"Jalankan Refinement Agent"** (atau centang *"Konversi ke cm untuk SD"*) → dimensi berubah ke `51 cm × 36 cm` & `41 cm × 15 cm`, total `2451 cm²`, keterangan tapak alas ditambahkan.<br>3. Semua 4 agen berubah menjadi **`LULUS`**.<br>4. Uji jawaban `2451` di *Mode Siswa*. |

---

## 5. Rencana Tata Letak UI/UX (Ramah Proyektor & Layar Lebar)

```text
+-----------------------------------------------------------------------------------+
| HEADER: MathPersona PBK — Simulasi Alur Kendali Berlapis & Teacher-in-the-Loop    |
| [Preset 1: Linear (Juice Bar)] [Preset 2: SPLDV (Roblox)] [Preset 3: Geometri SD] |
|                                                Mode: (● Workbench Guru | ○ Siswa) |
+-----------------------------------------------------------------------------------+
| STEPPER ALUR BAB 3:                                                               |
| [1. Input] ── [2. Symbolic & Draf] ── [3. Evaluasi 4 Agen] ── [4. Kurasi] ── [5. Siswa] |
+-----------------------------------------------------------------------------------+
| KOLOM KIRI (44% lebar desktop)       | KOLOM KANAN (56% lebar desktop)            |
|                                      |                                            |
| +----------------------------------+ | +----------------------------------------+ |
| | MODUL A: Parameter Sistem        | | | MODUL C: Evaluasi 4 Agen Otonom        | |
| | - Pilih Materi (Tabs/Select)     | | | [Accuracy: LULUS/GAGAL] [Realism: ...] | |
| | - Form Koefisien Dinamis         | | | [Authenticity: ...]     [Reading: ...] | |
| | - Minat Granular + Keyword Bebas | | | -------------------------------------- | |
| | - Jenjang, Kesulitan, Max Kata   | | | Iterasi 1/5  [Jalankan Refinement]     | |
| | - [x] Scaffolding / [ ] Konv. cm | | | (Log perubahan ringkas bila ada)       | |
| | [Bangkitkan Ulang Draf]          | | +----------------------------------------+ |
| +----------------------------------+ |                                            |
|                                      | +----------------------------------------+ |
| +----------------------------------+ | | MODUL D: Kurasi Guru (Teacher-in-Loop) | |
| | MODUL B: Symbolic Grounding      | | | Status: Terverifikasi / Wajib Cek      | |
| | (Blok Kode Gelap Python-style)   | | | Aksi Cepat: [Ganti Nama] [$→Rp] [×1000]| |
| | c = 25 # saldo awal              | | | +------------------------------------+ | |
| | def hitung_sisa(c, m, x): ...    | | | | <textarea> Teks Soal Interaktif    | | |
| | Kunci Simbolik: $13              | | | +------------------------------------+ | |
| +----------------------------------+ | | [Verifikasi Ulang]  [Terbitkan→Siswa]  | |
|                                      | +----------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

**Mode Pratinjau Siswa (View Terpisah saat tab/tombol Siswa aktif):**
- Layout terpusat `max-width: 780px` dengan ruang napas lega agar nyaman dibaca seluruh ruangan kelas di proyektor.
- Kartu soal bersih (ukuran teks soal `18–19px`), kotak scaffolding rumus terpisah di bawah narasi, input jawaban besar dengan tombol **"Periksa Jawaban"**, serta panel **Langkah Penyelesaian Simbolik** yang muncul rapi di bawahnya.

---

## 6. Checklist Tahapan Pengerjaan & Pengujian

### Tahapan Implementasi
- **Phase 1 — Fondasi HTML & Design System (`index.html`, `style.css`)**: Membangun struktur semantik lengkap (Header + Preset Toolbar, Stepper 5 Tahap, Grid 2 Kolom Guru, View Siswa), variabel warna WCAG, tipografi *Atkinson Hyperlegible*, ikon SVG, dan responsivitas.
- **Phase 2 — Core Engine & Template Generator (`script.js`)**: Mengimplementasikan `state`, kalkulator deterministik (Linear, SPLDV, Geometri), generator kode *Symbolic Grounding*, helper `renderMath` (KaTeX + fallback offline), serta *Template Engine* untuk 3 materi × 5 skenario hobi + keyword kustom.
- **Phase 3 — 4 Agen Evaluator & Refinement Engine (`script.js`)**: Mengimplementasikan 4 fungsi evaluator deterministik + tombol & siklus *Refinement Agent* (maks. 5 iterasi) + log revisi.
- **Phase 4 — Kurasi Guru & Verifikasi Ulang Regex (`script.js`)**: Mengimplementasikan editor `<textarea>`, tombol *Epistemic Moves*, deteksi perubahan angka/mata uang secara *real-time*, penguncian tombol terbit, dan sinkronisasi ulang jawaban saat verifikasi ulang.
- **Phase 5 — Mode Pratinjau Siswa & 3 Preset Demo (`script.js`)**: Mengimplementasikan 3 tombol preset persis Bab 3.4 proposal, form jawaban siswa, pengecekan akurat, dan langkah penyelesaian simbolik.
- **Phase 6 — Audit & Polishing**: Review kode terhadap aturan `web-design-guidelines` dan `ui-ux-pro-max`, serta uji fungsional menyeluruh di browser.

### Checklist Uji Manual Sebelum Presentasi
- [ ] **Uji Offline (`file://`)**: Putuskan koneksi internet, buka `index.html` langsung di browser — layout utuh, ikon tampil, rumus fallback terbaca jelas, dan **0 error di Console**.
- [ ] **Uji Preset 1 (Linear)**: Klik Kasus 1 → 4 agen `LULUS` (`$13`); ubah `$` ke `Rp` → status *Wajib Verifikasi Ulang* muncul & tombol terbit terkunci; klik *Verifikasi Ulang* → *Realism* `GAGAL`; sesuaikan ke `Rp25.000` & `Rp3.000` → *Verifikasi Ulang* `LULUS` (kunci menjadi `Rp13.000`).
- [ ] **Uji Preset 2 (SPLDV)**: Klik Kasus 2 → tepat 3 agen `GAGAL` (Accuracy, Authenticity, Reading-Level) & 1 `LULUS` (Realism); klik *Jalankan Refinement Agent* → Iterasi `2 / 5` & seluruh 4 agen `LULUS` (solusi non-simetris `x=15, y=25`).
- [ ] **Uji Preset 3 (Geometri)**: Klik Kasus 3 → *Realism* `GAGAL` (beban 4 desimal `0,2451 m²` untuk SD); klik *Jalankan Refinement Agent* atau centang konversi cm → dimensi jadi `cm` bulat, total `2451 cm²`, seluruh 4 agen `LULUS`.
- [ ] **Uji Input Kustom**: Masukkan angka bebas & kata kunci minat baru (misal: `Futsal` / `K-Pop` / kata kunci bebas) pada ketiga materi — *Symbolic Grounding*, 4 agen, dan kunci jawaban ikut terhitung dinamis.
- [ ] **Uji Mode Siswa**: Coba jawaban benar dan jawaban salah untuk ketiga materi; cek apakah kotak *Scaffolding* muncul/sembunyi sesuai checkbox dan langkah penyelesaian simbolik akurat.
- [ ] **Uji Proyektor & Aksesibilitas**: Uji pada lebar `1440px`, `1024px`, dan `375px`; pastikan navigasi keyboard (`Tab`/`Enter`) menampilkan ring fokus jelas dan tidak ada *horizontal overflow*.
