(function () {
  'use strict';

  /* ==========================================================================
   * 1. Inline SVG Icon Dictionary (Lucide-style, 100% offline-ready)
   * ========================================================================== */
  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"></path><path d="M5 19l.8 2.2L8 22l-2.2.8L5 25l-.8-2.2L2 22l2.2-.8L5 19z"></path></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
    sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>',
    shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>'
  };

  /* ==========================================================================
   * 2. Domain Dictionaries & Preset Configurations
   * ========================================================================== */
  const STUDENT_NAMES = ['Raka', 'Budi', 'Rani', 'Sari', 'Dimas'];

  const HOBBY_CONFIGS = {
    joes_juice_bar: {
      label: 'Kedai Es Teh Nusantara',
      defaultKeyword: 'Kedai Es Teh Nusantara',
      linearItem: 'gelas es teh manis',
      linearItemShort: 'es teh manis',
      linearContainer: 'kartu jajan',
      spldvMission: 'promo minuman',
      spldvUnit: 'gelas',
      spldvItemX: 'es teh manis',
      spldvItemY: 'es jeruk peras',
      spldvReward: 'poin hadiah',
      geoContext: 'meja saji'
    },
    roblox: {
      label: 'Roblox',
      defaultKeyword: 'Roblox',
      linearItem: 'paket aksesori avatar',
      linearItemShort: 'aksesori avatar',
      linearContainer: 'saldo Robux',
      spldvMission: 'misi permainan',
      spldvUnit: 'peti',
      spldvItemX: 'peti kayu',
      spldvItemY: 'peti berlian',
      spldvReward: 'koin emas',
      geoContext: 'area markas'
    },
    pc_keyboard: {
      label: 'Perangkat Komputer Meja',
      defaultKeyword: 'perangkat komputer meja',
      linearItem: 'komponen meja kerja',
      linearItemShort: 'komponen meja',
      linearContainer: 'anggaran rakit',
      spldvMission: 'perakitan',
      spldvUnit: 'komponen',
      spldvItemX: 'kabel modul',
      spldvItemY: 'tombol mekanis',
      spldvReward: 'poin rakit',
      geoContext: 'meja belajar'
    },
    futsal: {
      label: 'Futsal',
      defaultKeyword: 'Futsal',
      linearItem: 'sesi sewa lapangan',
      linearItemShort: 'sesi latihan',
      linearContainer: 'uang kas tim',
      spldvMission: 'latihan rutin',
      spldvUnit: 'perlengkapan',
      spldvItemX: 'rompi latihan',
      spldvItemY: 'bola latihan',
      spldvReward: 'poin perlengkapan',
      geoContext: 'ruang peralatan'
    },
    kpop: {
      label: 'Konser Musik Indonesia',
      defaultKeyword: 'Konser Musik Indonesia',
      linearItem: 'paket stiker konser',
      linearItemShort: 'stiker konser',
      linearContainer: 'tabungan konser',
      spldvMission: 'acara musik',
      spldvUnit: 'paket',
      spldvItemX: 'gelang konser',
      spldvItemY: 'album musik',
      spldvReward: 'poin penggemar',
      geoContext: 'meja koleksi'
    }
  };

  const GEO_OBJECT_PRESETS = {
    pc_keyboard: {
      obj1Name: 'Unit PC',
      p1: 0.51,
      l1: 0.36,
      obj2Name: 'Keyboard',
      p2: 0.41,
      l2: 0.15,
      unit: 'm'
    },
    buku_tablet: {
      obj1Name: 'Buku Paket',
      p1: 0.25,
      l1: 0.18,
      obj2Name: 'Tablet Belajar',
      p2: 0.24,
      l2: 0.16,
      unit: 'm'
    },
    meja_laci: {
      obj1Name: 'Meja Belajar',
      p1: 1.2,
      l1: 0.6,
      obj2Name: 'Laci Samping',
      p2: 0.45,
      l2: 0.6,
      unit: 'm'
    },
    matras_tas: {
      obj1Name: 'Matras Latihan',
      p1: 1.8,
      l1: 0.65,
      obj2Name: 'Tas Futsal',
      p2: 0.55,
      l2: 0.3,
      unit: 'm'
    }
  };

  const TOPIC_LABELS = {
    linear: 'Fungsi Linear Dua Langkah',
    spldv: 'SPLDV',
    geometry: 'Geometri Luas Gabungan'
  };

  const PRESET_LABELS = {
    case1: 'Preset: Kasus 1',
    case2: 'Preset: Kasus 2',
    case3: 'Preset: Kasus 3',
    custom: 'Mode Kustom'
  };

  /* ==========================================================================
   * 3. Single Reactive State Store
   * ========================================================================== */
  const state = {
    activeView: 'teacher',
    activeStage: 1,
    activePreset: 'case1',
    input: {
      topic: 'linear',
      linear: { c: 25000, m: 3000, x: 4, op: '-', currency: 'Rp' },
      spldv: { a1: 1, b1: 1, c1: 40, a2: 2, b2: 5, c2: 140 },
      geometry: {
        objectPreset: 'pc_keyboard',
        obj1Name: 'Unit PC',
        p1: 0.51,
        l1: 0.36,
        obj2Name: 'Keyboard',
        p2: 0.41,
        l2: 0.15,
        unit: 'm',
        convertToCmForSD: false
      },
      hobbyPreset: 'joes_juice_bar',
      hobbyKeyword: 'Kedai Es Teh Nusantara',
      studentName: 'Raka',
      grade: 'SMP7',
      difficulty: 'Easy',
      maxWords: 65,
      showScaffolding: true
    },
    symbolicAnchor: {
      codeHtml: '',
      formulaLatex: '',
      formulaPlain: '',
      answer: null,
      answerDisplay: '—',
      steps: []
    },
    draft: {
      text: '',
      iteration: 1,
      maxIterations: 5,
      refinementLogs: [],
      flags: {
        useGenericHobby: false,
        ambiguousEntity: false,
        implicitMapping: false,
        baseSurfaceNotSpecified: false,
        conciseMode: false
      }
    },
    evaluation: {
      accuracy: { status: 'PASS', metric: '', reason: '' },
      realism: { status: 'PASS', metric: '', reason: '' },
      authenticity: { status: 'PASS', metric: '', reason: '' },
      readingLevel: { status: 'PASS', metric: '', reason: '' },
      allPassed: true
    },
    curation: {
      baselineText: '',
      baselineSignature: '',
      needsReverification: false,
      statusMode: 'verified', // 'verified' | 'warning' | 'error'
      statusMessage: 'Terverifikasi — Soal siap diterbitkan ke mode siswa.',
      isPublished: true
    },
    student: {
      inputPrimary: '',
      inputSecondary: '',
      checked: false,
      isCorrect: false,
      feedback: ''
    }
  };

  /* ==========================================================================
   * 4. Number, Formatting, Security & KaTeX Helpers
   * ========================================================================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function roundTo(num, decimals) {
    const d = decimals === undefined ? 6 : decimals;
    const factor = Math.pow(10, d);
    return Math.round((num + Number.EPSILON) * factor) / factor;
  }

  function countDecimals(num) {
    if (!Number.isFinite(num)) return 0;
    const cleaned = roundTo(num, 6);
    const str = String(cleaned);
    const dotIndex = str.indexOf('.');
    return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
  }

  function formatIdNumber(num, maxDecimals, useGrouping) {
    if (!Number.isFinite(num)) return '—';
    const d = maxDecimals === undefined ? 6 : maxDecimals;
    return new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: d,
      useGrouping: Boolean(useGrouping)
    }).format(roundTo(num, d));
  }

  function formatPlainNumber(num, maxDecimals) {
    if (!Number.isFinite(num)) return '0';
    return String(roundTo(num, maxDecimals === undefined ? 6 : maxDecimals));
  }

  function formatCurrency(val, currency, forCodeComment) {
    if (!Number.isFinite(val)) return '—';
    if (currency === '$') {
      const numStr = Number.isInteger(roundTo(val, 2))
        ? String(Math.round(val))
        : String(roundTo(val, 2));
      return '$' + numStr;
    }
    const formatted = new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: 2
    }).format(roundTo(val, 2));
    return (forCodeComment ? 'Rp' : 'Rp') + formatted;
  }

  function parseTokenNumeric(rawToken, preferDecimal) {
    if (typeof rawToken !== 'string') return NaN;
    let s = rawToken.trim();
    if (!s) return NaN;
    s = s.replace(/\s+/g, '');

    if (s.indexOf(',') !== -1) {
      // Indonesian decimal comma (e.g. 25.000,50 or 0,51)
      s = s.replace(/\./g, '').replace(',', '.');
      return Number(s);
    }

    if (!preferDecimal && /^-?[1-9]\d{0,2}(\.\d{3})+$/.test(s)) {
      // Indonesian thousands dot separator (e.g. 25.000 or 3.000 or 1.250.000)
      return Number(s.replace(/\./g, ''));
    }

    return Number(s);
  }

  function parseFlexibleNumber(raw, preferDecimal) {
    if (typeof raw !== 'string') return NaN;
    let cleaned = raw.trim();
    if (!cleaned) return NaN;
    cleaned = cleaned
      .replace(/^rp\.?\s*/i, '')
      .replace(/^\$\s*/, '')
      .replace(/\s*(cm²|cm2|m²|m2|cm|m|gelas|peti|koin|buah|rupiah|dolar)\s*$/i, '')
      .trim();

    if (!/^-?\d+(?:[.,]\d+)*$/.test(cleaned)) {
      return NaN;
    }
    return parseTokenNumeric(cleaned, preferDecimal);
  }

  function renderMath(tex, plainHtml) {
    if (typeof window.katex !== 'undefined' && typeof window.katex.renderToString === 'function') {
      try {
        return window.katex.renderToString(tex, {
          throwOnError: false,
          displayMode: false
        });
      } catch (_err) {
        return plainHtml;
      }
    }
    return plainHtml;
  }

  function countWords(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }

  function getSentenceMetrics(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return { count: 0, avgWords: 0 };
    const parts = trimmed
      .split(/[.!?]+(?=\s|$)/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    const sentenceCount = Math.max(1, parts.length);
    const totalWords = countWords(trimmed);
    return {
      count: sentenceCount,
      avgWords: roundTo(totalWords / sentenceCount, 2)
    };
  }

  function extractNumbersFromText(text) {
    const source = String(text || '');
    const regex = /(Rp\.?\s*|\$)?(\d+(?:[.,]\d+)*)/gi;
    const tokens = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      if (match.index > 0 && /[A-Za-z]/.test(source.charAt(match.index - 1)) && !match[1]) {
        continue;
      }
      const rawPrefix = match[1] ? match[1].trim() : '';
      const currency = rawPrefix
        ? (rawPrefix.charAt(0) === '$' ? '$' : 'Rp')
        : '';
      const numPart = match[2];
      const value = parseTokenNumeric(numPart, false);
      if (Number.isFinite(value)) {
        tokens.push({
          raw: match[0],
          currency: currency,
          numPart: numPart,
          value: value,
          index: match.index
        });
      }
    }
    const currencyTokens = tokens.filter(function (t) { return t.currency !== ''; });
    const hasDollar = /\$\s*\d/.test(source);
    const hasRp = /Rp\.?\s*\d/i.test(source);
    return {
      tokens: tokens,
      values: tokens.map(function (t) { return t.value; }),
      currencyTokens: currencyTokens,
      hasDollar: hasDollar,
      hasRp: hasRp
    };
  }

  function computeNumericCurrencySignature(text) {
    const info = extractNumbersFromText(text);
    const tokenSig = info.tokens
      .map(function (t) { return (t.currency || '') + ':' + formatPlainNumber(t.value, 6); })
      .join('|');
    return (info.hasDollar ? '$1' : '$0') + ';' + (info.hasRp ? 'R1' : 'R0') + ';' + tokenSig;
  }

  function getHobbyConfig(input) {
    return HOBBY_CONFIGS[input.hobbyPreset] || HOBBY_CONFIGS.joes_juice_bar;
  }

  function getActiveKeyword(input) {
    const custom = (input.hobbyKeyword || '').trim();
    if (custom) return custom;
    return getHobbyConfig(input).defaultKeyword;
  }

  function isSDGrade(grade) {
    return grade === 'SD';
  }

  function getGradeLabel(grade) {
    if (grade === 'SD') return 'SD (Kelas 4–6)';
    if (grade === 'SMP7') return 'SMP Kelas 7 (Pembaca Pemula)';
    return 'SMP (Kelas 8–9)';
  }

  function getExpectedNumericParams(input, anchor) {
    if (input.topic === 'linear') {
      return [Number(input.linear.c), Number(input.linear.m), Number(input.linear.x)].filter(Number.isFinite);
    }
    if (input.topic === 'spldv') {
      return [
        Number(input.spldv.a1),
        Number(input.spldv.b1),
        Number(input.spldv.c1),
        Number(input.spldv.a2),
        Number(input.spldv.b2),
        Number(input.spldv.c2)
      ].filter(Number.isFinite);
    }
    const eff = anchor && anchor.answer && anchor.answer.effectiveGeo
      ? anchor.answer.effectiveGeo
      : getEffectiveGeometry(input.geometry);
    return [eff.p1, eff.l1, eff.p2, eff.l2].filter(Number.isFinite);
  }

  function buildConstraintPrompt(input, anchor) {
    const gradeText = getGradeLabel(input.grade);
    const keyword = getActiveKeyword(input);
    let formulaText = '';
    let varText = '';

    if (input.topic === 'linear') {
      const curr = input.linear.currency === 'Rp' ? 'Rp' : '$';
      const cVal = formatCurrency(Number(input.linear.c), curr);
      const mVal = formatCurrency(Number(input.linear.m), curr);
      const xVal = formatIdNumber(Number(input.linear.x), 2, false);
      formulaText = input.linear.op === '+' ? 'y = mx + c' : 'y = c - mx';
      varText = 'c = ' + cVal + ', m = ' + mVal + ', x = ' + xVal;
    } else if (input.topic === 'spldv') {
      const s = input.spldv;
      formulaText = s.a1 + 'x + ' + s.b1 + 'y = ' + s.c1 + ' dan ' + s.a2 + 'x + ' + s.b2 + 'y = ' + s.c2;
      varText = 'a1=' + s.a1 + ', b1=' + s.b1 + ', c1=' + s.c1 + ', a2=' + s.a2 + ', b2=' + s.b2 + ', c2=' + s.c2;
    } else {
      const eff = anchor && anchor.answer && anchor.answer.effectiveGeo
        ? anchor.answer.effectiveGeo
        : getEffectiveGeometry(input.geometry);
      formulaText = 'L = (p1 × l1) + (p2 × l2)';
      varText = eff.obj1Name + ' (' + formatIdNumber(eff.p1, 4, false) + ' ' + eff.unit + ' × ' + formatIdNumber(eff.l1, 4, false) + ' ' + eff.unit + '), ' +
        eff.obj2Name + ' (' + formatIdNumber(eff.p2, 4, false) + ' ' + eff.unit + ' × ' + formatIdNumber(eff.l2, 4, false) + ' ' + eff.unit + ')';
    }

    const lines = [
      'Peran: bertindak sebagai perancang soal matematika instruksional untuk ' + gradeText + '.',
      'Tugas: mengubah persamaan {' + formulaText + '} menjadi soal cerita yang berpusat pada minat "' + keyword + '" dengan tingkat kesulitan ' + input.difficulty + '.',
      '',
      'Aturan khusus:',
      '1) Memakai seluruh parameter numerik yang sudah dipetakan, yaitu {' + varText + '}.',
      '2) Tidak memasukkan angka dekoratif yang membingungkan, sesuai prinsip Significant Number Identification (SNI).',
      '3) Memastikan satuan dan rentang angka masuk akal di dunia hobi tersebut (item diskret bulat positif dan nominal wajar).',
      '4) Membatasi panjang teks maksimal ' + input.maxWords + ' kata.'
    ];

    if (input.topic === 'geometry' && isSDGrade(input.grade)) {
      lines.push('5) Untuk jenjang SD, tegaskan pengukuran pada sisi alas (tapak objek) dan gunakan satuan bulat (cm) agar bebas desimal rumit.');
    }

    return lines.join('\n');
  }

  function getEffectiveGeometry(geo) {
    const rawP1 = Number(geo.p1);
    const rawL1 = Number(geo.l1);
    const rawP2 = Number(geo.p2);
    const rawL2 = Number(geo.l2);
    const shouldConvert = Boolean(geo.convertToCmForSD && geo.unit === 'm');

    return {
      obj1Name: (geo.obj1Name || 'Objek 1').trim() || 'Objek 1',
      obj2Name: (geo.obj2Name || 'Objek 2').trim() || 'Objek 2',
      p1: shouldConvert ? Math.round(rawP1 * 100) : roundTo(rawP1, 6),
      l1: shouldConvert ? Math.round(rawL1 * 100) : roundTo(rawL1, 6),
      p2: shouldConvert ? Math.round(rawP2 * 100) : roundTo(rawP2, 6),
      l2: shouldConvert ? Math.round(rawL2 * 100) : roundTo(rawL2, 6),
      unit: shouldConvert ? 'cm' : geo.unit
    };
  }

  /* ==========================================================================
   * 5. Syntax Highlighting Helper for Dark Symbolic Grounding Block
   * ========================================================================== */
  function pyLine(html) {
    return html;
  }

  function pyComment(text) {
    return '<span class="tok-com"># ' + escapeHtml(text) + '</span>';
  }

  function pyKw(text) {
    return '<span class="tok-kw">' + escapeHtml(text) + '</span>';
  }

  function pyFn(text) {
    return '<span class="tok-fn">' + escapeHtml(text) + '</span>';
  }

  function pyNum(val) {
    return '<span class="tok-num">' + escapeHtml(String(val)) + '</span>';
  }

  function pyStr(val) {
    return '<span class="tok-str">' + escapeHtml('"' + String(val) + '"') + '</span>';
  }

  /* ==========================================================================
   * 6. Deterministic Math Engine (Symbolic Grounding)
   * ========================================================================== */
  function computeSymbolicAnchor(input, flags) {
    const cfg = getHobbyConfig(input);
    const keyword = getActiveKeyword(input);

    if (input.topic === 'linear') {
      const c = Number(input.linear.c);
      const m = Number(input.linear.m);
      const x = Number(input.linear.x);
      const op = input.linear.op === '+' ? '+' : '-';
      const curr = input.linear.currency === 'Rp' ? 'Rp' : '$';
      const valid = Number.isFinite(c) && Number.isFinite(m) && Number.isFinite(x);
      const y = valid ? roundTo(op === '-' ? c - m * x : c + m * x, 4) : NaN;

      const cStr = formatCurrency(c, curr, true);
      const mStr = formatCurrency(m, curr, true);
      const yStr = Number.isFinite(y) ? formatCurrency(y, curr, true) : 'Tidak valid';

      const fnName = op === '-' ? 'hitung_sisa' : 'hitung_total';
      const exprText = op === '-' ? 'c - (m * x)' : 'c + (m * x)';
      const cTex = curr === 'Rp' ? formatIdNumber(c, 2, true) : formatPlainNumber(c, 2);
      const mTex = curr === 'Rp' ? formatIdNumber(m, 2, true) : formatPlainNumber(m, 2);
      const formulaLatex = op === '-'
        ? 'y = ' + cTex + ' - ' + mTex + 'x'
        : 'y = ' + mTex + 'x + ' + cTex;
      const formulaPlain = op === '-'
        ? 'y = ' + cTex + ' &minus; ' + mTex + 'x'
        : 'y = ' + mTex + 'x + ' + cTex;

      const codeHtml = [
        pyComment('Jangkar Simbolik - Fungsi Linear (' + keyword + ')'),
        'c = ' + pyNum(formatPlainNumber(c, 2)) + '  ' + pyComment('nilai awal ' + cfg.linearContainer + ' (' + cStr + ')'),
        'm = ' + pyNum(formatPlainNumber(m, 2)) + '  ' + pyComment('laju per ' + cfg.linearItem + ' (' + mStr + ')'),
        'x = ' + pyNum(formatPlainNumber(x, 2)) + '  ' + pyComment('jumlah satuan yang dibeli/diproses'),
        pyKw('def') + ' ' + pyFn(fnName) + '(c, m, x):',
        '    ' + pyKw('return') + ' ' + exprText,
        '',
        'hasil = ' + pyFn(fnName) + '(c, m, x)  ' + pyComment('-> ' + yStr)
      ].map(pyLine).join('\n');

      const multVal = valid ? roundTo(m * x, 4) : NaN;
      const steps = valid ? [
        'Diketahui: nilai awal (c) = ' + cStr + ', laju per satuan (m) = ' + mStr + ', dan jumlah satuan (x) = ' + formatIdNumber(x, 2, false) + '.',
        'Model matematika: ' + (op === '-' ? 'y = c − m · x' : 'y = m · x + c') + '.',
        'Substitusi nilai x = ' + formatIdNumber(x, 2, false) + ': y = ' +
          (op === '-'
            ? formatCurrency(c, curr) + ' − (' + formatCurrency(m, curr) + ' × ' + formatIdNumber(x, 2, false) + ') = ' + formatCurrency(c, curr) + ' − ' + formatCurrency(multVal, curr)
            : '(' + formatCurrency(m, curr) + ' × ' + formatIdNumber(x, 2, false) + ') + ' + formatCurrency(c, curr) + ' = ' + formatCurrency(multVal, curr) + ' + ' + formatCurrency(c, curr)) + '.',
        'Hasil akhir: y = ' + yStr + '.'
      ] : ['Parameter numerik belum lengkap atau tidak valid.'];

      return {
        codeHtml: codeHtml,
        formulaLatex: formulaLatex,
        formulaPlain: formulaPlain,
        answer: { type: 'single', value: y, currency: curr, unit: '' },
        answerDisplay: yStr,
        steps: steps
      };
    }

    if (input.topic === 'spldv') {
      const a1 = Number(input.spldv.a1);
      const b1 = Number(input.spldv.b1);
      const c1 = Number(input.spldv.c1);
      const a2 = Number(input.spldv.a2);
      const b2 = Number(input.spldv.b2);
      const c2 = Number(input.spldv.c2);

      const validNums = [a1, b1, c1, a2, b2, c2].every(Number.isFinite);
      const D = validNums ? roundTo(a1 * b2 - a2 * b1, 6) : 0;
      const hasUnique = validNums && D !== 0;
      const Dx = hasUnique ? roundTo(c1 * b2 - c2 * b1, 6) : NaN;
      const Dy = hasUnique ? roundTo(a1 * c2 - a2 * c1, 6) : NaN;
      const x = hasUnique ? roundTo(Dx / D, 6) : NaN;
      const y = hasUnique ? roundTo(Dy / D, 6) : NaN;

      const isIntX = Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-6;
      const isIntY = Number.isFinite(y) && Math.abs(y - Math.round(y)) < 1e-6;
      const isIntegerSol = isIntX && isIntY;
      const isPositiveSol = isIntegerSol && x > 0 && y > 0;
      const isSymmetric = isIntegerSol && Math.round(x) === Math.round(y);

      const itemYLabel = (input.hobbyPreset === 'roblox' && flags.ambiguousEntity) ? 'peti emas' : cfg.spldvItemY;
      const itemXLabel = input.hobbyPreset === 'roblox' ? 'peti kayu' : cfg.spldvItemX;

      const eq1Latex = (a1 === 1 ? '' : formatPlainNumber(a1, 2)) + 'x + ' + (b1 === 1 ? '' : formatPlainNumber(b1, 2)) + 'y = ' + formatPlainNumber(c1, 2);
      const eq2Latex = (a2 === 1 ? '' : formatPlainNumber(a2, 2)) + 'x + ' + (b2 === 1 ? '' : formatPlainNumber(b2, 2)) + 'y = ' + formatPlainNumber(c2, 2);
      const formulaLatex = '\\begin{cases} ' + eq1Latex + ' \\\\ ' + eq2Latex + ' \\end{cases}';
      const formulaPlain = eq1Latex + ' &nbsp;|&nbsp; ' + eq2Latex;

      const solDisplay = hasUnique
        ? 'x = ' + formatIdNumber(x, 2, false) + ', y = ' + formatIdNumber(y, 2, false)
        : 'Tidak ada solusi unik (D = 0)';

      const codeHtml = [
        pyComment('Jangkar Simbolik - SPLDV (' + keyword + ')'),
        'a1, b1, c1 = ' + pyNum(a1) + ', ' + pyNum(b1) + ', ' + pyNum(c1) + '  ' + pyComment('total ' + itemXLabel + ' & ' + itemYLabel),
        'a2, b2, c2 = ' + pyNum(a2) + ', ' + pyNum(b2) + ', ' + pyNum(c2) + '  ' + pyComment('bobot ' + cfg.spldvReward),
        pyKw('def') + ' ' + pyFn('pecahkan_spldv') + '(a1, b1, c1, a2, b2, c2):',
        '    D = (a1 * b2) - (a2 * b1)',
        '    ' + pyKw('if') + ' D == ' + pyNum(0) + ': ' + pyKw('return') + ' ' + pyStr('Determinan nol'),
        '    x = (c1 * b2 - c2 * b1) / D',
        '    y = (a1 * c2 - a2 * c1) / D',
        '    ' + pyKw('return') + ' x, y',
        '',
        'x, y = ' + pyFn('pecahkan_spldv') + '(a1, b1, c1, a2, b2, c2)  ' + pyComment('-> ' + solDisplay)
      ].map(pyLine).join('\n');

      const steps = hasUnique ? [
        'Misalkan x = banyak ' + itemXLabel + ' dan y = banyak ' + itemYLabel + '.',
        'Susun model SPLDV: (1) ' + eq1Latex + ' dan (2) ' + eq2Latex + '.',
        'Hitung determinan matriks koefisien: D = (' + a1 + ' × ' + b2 + ') − (' + a2 + ' × ' + b1 + ') = ' + D + '.',
        'Cari nilai x dan y: x = (' + c1 + '×' + b2 + ' − ' + c2 + '×' + b1 + ') / ' + D + ' = ' + formatIdNumber(x, 2, false) + '; y = (' + a1 + '×' + c2 + ' − ' + a2 + '×' + c1 + ') / ' + D + ' = ' + formatIdNumber(y, 2, false) + '.',
        'Hasil akhir: x = ' + formatIdNumber(x, 2, false) + ' (' + itemXLabel + ') dan y = ' + formatIdNumber(y, 2, false) + ' (' + itemYLabel + ').'
      ] : ['Sistem persamaan tidak memiliki solusi unik karena determinan D = 0.'];

      return {
        codeHtml: codeHtml,
        formulaLatex: formulaLatex,
        formulaPlain: formulaPlain,
        answer: {
          type: 'pair',
          x: x,
          y: y,
          D: D,
          hasUnique: hasUnique,
          isIntegerSol: isIntegerSol,
          isPositiveSol: isPositiveSol,
          isSymmetric: isSymmetric,
          xLabel: itemXLabel,
          yLabel: itemYLabel
        },
        answerDisplay: solDisplay,
        steps: steps
      };
    }

    // Geometry
    const eff = getEffectiveGeometry(input.geometry);
    const valid = [eff.p1, eff.l1, eff.p2, eff.l2].every(function (v) { return Number.isFinite(v) && v > 0; });
    const L1 = valid ? roundTo(eff.p1 * eff.l1, 6) : NaN;
    const L2 = valid ? roundTo(eff.p2 * eff.l2, 6) : NaN;
    const L = valid ? roundTo(L1 + L2, 6) : NaN;
    const unitSq = eff.unit + '²';

    const p1Plain = formatPlainNumber(eff.p1, 4);
    const l1Plain = formatPlainNumber(eff.l1, 4);
    const p2Plain = formatPlainNumber(eff.p2, 4);
    const l2Plain = formatPlainNumber(eff.l2, 4);

    const p1Id = formatIdNumber(eff.p1, 4, false);
    const l1Id = formatIdNumber(eff.l1, 4, false);
    const p2Id = formatIdNumber(eff.p2, 4, false);
    const l2Id = formatIdNumber(eff.l2, 4, false);
    const l1AreaId = formatIdNumber(L1, 6, false);
    const l2AreaId = formatIdNumber(L2, 6, false);
    const totalAreaId = formatIdNumber(L, 6, false);

    const answerDisplay = valid ? totalAreaId + ' ' + unitSq : 'Tidak valid';
    const formulaLatex = 'L = (p_1 \\times l_1) + (p_2 \\times l_2) = (' + p1Plain + ' \\times ' + l1Plain + ') + (' + p2Plain + ' \\times ' + l2Plain + ')';
    const formulaPlain = 'L = (' + p1Id + ' &times; ' + l1Id + ') + (' + p2Id + ' &times; ' + l2Id + ') ' + unitSq;

    const codeHtml = [
      pyComment('Jangkar Simbolik - Geometri Luas Gabungan (' + keyword + ')'),
      'satuan = ' + pyStr(eff.unit),
      'p1, l1 = ' + pyNum(p1Plain) + ', ' + pyNum(l1Plain) + '  ' + pyComment(eff.obj1Name),
      'p2, l2 = ' + pyNum(p2Plain) + ', ' + pyNum(l2Plain) + '  ' + pyComment(eff.obj2Name),
      pyKw('def') + ' ' + pyFn('luas_gabungan') + '(p1, l1, p2, l2):',
      '    ' + pyKw('return') + ' round((p1 * l1) + (p2 * l2), ' + pyNum(6) + ')',
      '',
      'total_luas = ' + pyFn('luas_gabungan') + '(p1, l1, p2, l2)  ' + pyComment('-> ' + answerDisplay)
    ].map(pyLine).join('\n');

    const steps = valid ? [
      'Identifikasi dimensi: ' + eff.obj1Name + ' (' + p1Id + ' ' + eff.unit + ' × ' + l1Id + ' ' + eff.unit + ') dan ' + eff.obj2Name + ' (' + p2Id + ' ' + eff.unit + ' × ' + l2Id + ' ' + eff.unit + ').',
      'Hitung luas tapak alas ' + eff.obj1Name + ': L₁ = ' + p1Id + ' × ' + l1Id + ' = ' + l1AreaId + ' ' + unitSq + '.',
      'Hitung luas tapak alas ' + eff.obj2Name + ': L₂ = ' + p2Id + ' × ' + l2Id + ' = ' + l2AreaId + ' ' + unitSq + '.',
      'Jumlahkan kedua luas: L = ' + l1AreaId + ' + ' + l2AreaId + ' = ' + totalAreaId + ' ' + unitSq + '.'
    ] : ['Dimensi panjang dan lebar harus lebih besar dari 0.'];

    return {
      codeHtml: codeHtml,
      formulaLatex: formulaLatex,
      formulaPlain: formulaPlain,
      answer: { type: 'single', value: L, currency: '', unit: unitSq, effectiveGeo: eff, L1: L1, L2: L2 },
      answerDisplay: answerDisplay,
      steps: steps
    };
  }

  /* ==========================================================================
   * 7. Deterministic Template Engine (3 Topics x 5 Hobbies + Custom Keyword)
   * ========================================================================== */
  function generateDraftText(input, anchor, flags) {
    const cfg = getHobbyConfig(input);
    const keyword = getActiveKeyword(input);
    const student = (input.studentName || 'Raka').trim() || 'Raka';

    if (input.topic === 'linear') {
      const c = Number(input.linear.c);
      const m = Number(input.linear.m);
      const x = Number(input.linear.x);
      const op = input.linear.op === '+' ? '+' : '-';
      const curr = input.linear.currency === 'Rp' ? 'Rp' : '$';
      const cStr = formatCurrency(c, curr);
      const mStr = formatCurrency(m, curr);
      const xStr = formatIdNumber(x, 2, false);
      const cEq = curr === 'Rp' ? formatIdNumber(c, 2, true) : formatPlainNumber(c, 2);
      const mEq = curr === 'Rp' ? formatIdNumber(m, 2, true) : formatPlainNumber(m, 2);

      // Narrative structure for Kedai Es Teh Nusantara (Preset 1)
      if (input.hobbyPreset === 'joes_juice_bar') {
        if (op === '-') {
          const s1 = student + ' mendapatkan kartu jajan senilai ' + cStr + ' untuk membeli minuman di ' + keyword + '.';
          const s2 = flags.conciseMode
            ? 'Setiap berkunjung, ' + student + ' membeli satu gelas es teh manis seharga ' + mStr + '.'
            : 'Setiap kali berkunjung, ' + student + ' membeli satu gelas es teh manis, dan saldo kartu berkurang ' + mStr + '.';
          const s3 = input.showScaffolding
            ? ' Persamaan y = ' + cEq + ' - ' + mEq + 'x menggambarkan perubahan sisa saldo kartu tersebut.'
            : '';
          const s4 = ' Berapakah sisa saldo kartu ' + student + ' setelah ia membeli ' + xStr + ' gelas es teh manis?';
          return s1 + ' ' + s2 + s3 + s4;
        }
        const s1Add = student + ' memiliki saldo awal ' + cfg.linearContainer + ' sebesar ' + cStr + ' di ' + keyword + '.';
        const s2Add = ' Setiap transaksi bernilai ' + mStr + ' akan menambah saldo tersebut.';
        const s3Add = input.showScaffolding ? ' Persamaan y = ' + mEq + 'x + ' + cEq + ' menyatakan total saldo akhir.' : '';
        const s4Add = ' Berapakah total saldo ' + student + ' setelah melakukan ' + xStr + ' kali transaksi?';
        return s1Add + s2Add + s3Add + s4Add;
      }

      // Generic clean template for all other hobbies & custom keywords
      const actionVerb = op === '-' ? 'berkurang' : 'bertambah';
      const outcomeNoun = op === '-' ? 'sisa' : 'total';
      const eqFormula = op === '-' ? ('y = ' + cEq + ' - ' + mEq + 'x') : ('y = ' + mEq + 'x + ' + cEq);
      const eqClause = input.showScaffolding ? (' Model persamaan ' + eqFormula + ' menunjukkan perubahan ' + outcomeNoun + ' saldo.') : '';
      return student + ' memiliki ' + cfg.linearContainer + ' senilai ' + cStr + ' untuk aktivitas ' + keyword + '. ' +
        'Setiap satu ' + cfg.linearItem + ', nilai saldo ' + actionVerb + ' sebesar ' + mStr + '.' +
        eqClause + ' ' +
        'Berapakah ' + outcomeNoun + ' ' + cfg.linearContainer + ' ' + student + ' setelah ' + xStr + ' ' + cfg.linearItem + '?';
    }

    if (input.topic === 'spldv') {
      const a1 = input.spldv.a1;
      const b1 = input.spldv.b1;
      const c1 = input.spldv.c1;
      const a2 = input.spldv.a2;
      const b2 = input.spldv.b2;
      const c2 = input.spldv.c2;

      if (input.hobbyPreset === 'roblox') {
        const isGeneric = Boolean(flags.useGenericHobby);
        const isAmbiguous = Boolean(flags.ambiguousEntity);
        const isImplicit = Boolean(flags.implicitMapping);

        const settingPhrase = isGeneric ? 'game online' : ('permainan ' + keyword);
        const secondChest = isAmbiguous ? 'peti emas' : 'peti berlian';
        const eq1Clause = (a1 === 1 && b1 === 1)
          ? (student + ' menyelesaikan ' + c1 + ' tantangan untuk mengumpulkan peti kayu dan ' + secondChest + '.')
          : (student + ' mengumpulkan kombinasi ' + a1 + ' peti kayu dan ' + b1 + ' ' + secondChest + ' hingga total ' + c1 + ' bagian.');
        const explicitRule = isImplicit ? '' : ' Setiap 1 tantangan yang diselesaikan memberikan tepat 1 peti.';
        const totalClause = flags.conciseMode
          ? ('Jika total koin yang diperoleh ' + student + ' adalah ' + c2 + ' koin, berapa banyak masing-masing peti kayu dan ' + secondChest + ' yang berhasil dibuka ' + student + '?')
          : ('Jika total koin yang diperoleh ' + student + ' dari seluruh tantangan tersebut adalah ' + c2 + ' koin, berapa banyak masing-masing peti kayu dan ' + secondChest + ' yang berhasil dibuka ' + student + '?');

        return 'Dalam sebuah misi ' + settingPhrase + ', ' + eq1Clause + explicitRule +
          ' Setiap peti kayu bernilai ' + a2 + ' koin emas, sedangkan setiap ' + secondChest + ' bernilai ' + b2 + ' koin emas. ' +
          totalClause;
      }

      // Clean SPLDV template for all other hobbies & custom keywords
      const unitWord = cfg.spldvUnit;
      const itemX = cfg.spldvItemX;
      const itemY = cfg.spldvItemY;
      const reward = cfg.spldvReward;
      const countLine = (a1 === 1 && b1 === 1)
        ? (student + ' mengikuti kegiatan ' + keyword + ' dan mengumpulkan total ' + c1 + ' ' + unitWord + ' yang terdiri atas ' + itemX + ' dan ' + itemY + '.')
        : ('Dalam kegiatan ' + keyword + ', setiap ' + a1 + ' ' + itemX + ' dan ' + b1 + ' ' + itemY + ' berjumlah ' + c1 + ' ' + unitWord + '.');
      const weightLine = ' Setiap ' + itemX + ' menghasilkan ' + a2 + ' ' + reward + ', sedangkan setiap ' + itemY + ' menghasilkan ' + b2 + ' ' + reward + '.';
      const askLine = ' Jika total yang terkumpul adalah ' + c2 + ' ' + reward + ', tentukan banyak masing-masing ' + itemX + ' dan ' + itemY + '!';
      return countLine + weightLine + askLine;
    }

    // Geometry
    const eff = getEffectiveGeometry(input.geometry);
    const p1Str = formatIdNumber(eff.p1, 4, false);
    const l1Str = formatIdNumber(eff.l1, 4, false);
    const p2Str = formatIdNumber(eff.p2, 4, false);
    const l2Str = formatIdNumber(eff.l2, 4, false);
    const surfacePhrase = flags.baseSurfaceNotSpecified ? '' : 'tapak alas ';
    const contextNoun = cfg.geoContext;

    if (isSDGrade(input.grade) || flags.conciseMode) {
      return 'Sebuah ' + contextNoun + ' menampung dua ' + keyword + ' berbentuk persegi panjang, yaitu ' + eff.obj1Name + ' dan ' + eff.obj2Name + '. ' +
        'Bagian ' + surfacePhrase + eff.obj1Name + ' berukuran panjang ' + p1Str + ' ' + eff.unit + ' dan lebar ' + l1Str + ' ' + eff.unit + '. ' +
        'Bagian ' + surfacePhrase + eff.obj2Name + ' berukuran panjang ' + p2Str + ' ' + eff.unit + ' dan lebar ' + l2Str + ' ' + eff.unit + '. ' +
        'Berapakah luas total area permukaan yang tertutupi oleh gabungan kedua benda tersebut?';
    }

    return student + ' menata dua ' + keyword + ' berbentuk persegi panjang di atas ' + contextNoun + ', yaitu ' + eff.obj1Name + ' dan ' + eff.obj2Name + '. ' +
      'Bagian ' + surfacePhrase + eff.obj1Name + ' memiliki panjang ' + p1Str + ' ' + eff.unit + ' dan lebar ' + l1Str + ' ' + eff.unit + '. ' +
      'Bagian ' + surfacePhrase + eff.obj2Name + ' memiliki panjang ' + p2Str + ' ' + eff.unit + ' dan lebar ' + l2Str + ' ' + eff.unit + '. ' +
      'Berapakah luas total area yang tertutupi oleh gabungan ' + eff.obj1Name + ' dan ' + eff.obj2Name + '?';
  }

  /* ==========================================================================
   * 8. Four Autonomous Evaluator Agents
   * ========================================================================== */
  function includesNumericValue(values, target) {
    return values.some(function (v) { return Math.abs(v - target) < 1e-4; });
  }

  function evaluateDraft(text, input, anchor, flags) {
    const extracted = extractNumbersFromText(text);
    const keyword = getActiveKeyword(input);
    const wordCount = countWords(text);
    const sentenceInfo = getSentenceMetrics(text);

    // 1. Mathematical Accuracy Agent
    let accuracy = { status: 'PASS', metric: '', reason: '' };
    if (input.topic === 'linear') {
      const c = Number(input.linear.c);
      const m = Number(input.linear.m);
      const x = Number(input.linear.x);
      const valid = Number.isFinite(c) && Number.isFinite(m) && Number.isFinite(x) && Number.isFinite(anchor.answer.value);

      if (!valid) {
        accuracy = {
          status: 'FAIL',
          metric: 'Parameter tidak lengkap',
          reason: 'Pastikan nilai c, m, dan x berupa angka valid agar kunci jawaban dapat dihitung.'
        };
      } else {
        const missing = [];
        if (!includesNumericValue(extracted.values, c)) missing.push(c);
        if (!includesNumericValue(extracted.values, m)) missing.push(m);
        if (!includesNumericValue(extracted.values, x)) missing.push(x);

        // Check explicit equation mismatch in text if written (e.g. y = 25 - 3x or y = 3x + 25)
        let eqMismatch = '';
        const eqSubMatch = text.match(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*[-−]\s*(\d+(?:[.,]\d+)*)\s*x/i);
        const eqAddMatch = text.match(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*x\s*\+\s*(\d+(?:[.,]\d+)*)/i);
        if (eqSubMatch) {
          const eqC = parseTokenNumeric(eqSubMatch[1], false);
          const eqM = parseTokenNumeric(eqSubMatch[2], false);
          if (Math.abs(eqC - c) > 1e-4 || Math.abs(eqM - m) > 1e-4) {
            eqMismatch = 'Persamaan eksplisit di teks tidak selaras dengan angka narasi (' + formatIdNumber(c, 2, true) + ' dan ' + formatIdNumber(m, 2, true) + ').';
          }
        } else if (eqAddMatch) {
          const eqM = parseTokenNumeric(eqAddMatch[1], false);
          const eqC = parseTokenNumeric(eqAddMatch[2], false);
          if (Math.abs(eqC - c) > 1e-4 || Math.abs(eqM - m) > 1e-4) {
            eqMismatch = 'Persamaan eksplisit di teks tidak selaras dengan angka narasi.';
          }
        }

        if (missing.length > 0) {
          accuracy = {
            status: 'FAIL',
            metric: 'Angka hilang: ' + missing.join(', '),
            reason: 'Nilai parameter ' + missing.join(', ') + ' tidak ditemukan di teks soal. Pastikan semua angka input tertulis di narasi.'
          };
        } else if (eqMismatch) {
          accuracy = {
            status: 'FAIL',
            metric: 'Persamaan tidak sinkron',
            reason: eqMismatch + ' Perbarui persamaan di teks atau klik Bangkitkan Ulang Draf.'
          };
        } else {
          accuracy = {
            status: 'PASS',
            metric: 'Kunci: ' + anchor.answerDisplay,
            reason: 'Seluruh parameter (c, m, x) terverifikasi dan perhitungan simbolik konsisten.'
          };
        }
      }
    } else if (input.topic === 'spldv') {
      const ans = anchor.answer;
      const coeffs = input.spldv;
      if (!ans || !ans.hasUnique) {
        accuracy = {
          status: 'FAIL',
          metric: 'Determinan D = 0',
          reason: 'Sistem persamaan tidak memiliki solusi unik. Ubah koefisien agar a₁b₂ ≠ a₂b₁.'
        };
      } else if (!ans.isPositiveSol) {
        accuracy = {
          status: 'FAIL',
          metric: 'x = ' + formatIdNumber(ans.x, 2, false) + ', y = ' + formatIdNumber(ans.y, 2, false),
          reason: 'Solusi SPLDV harus berupa bilangan bulat positif agar valid untuk item diskret.'
        };
      } else if (ans.isSymmetric) {
        accuracy = {
          status: 'FAIL',
          metric: 'x = ' + Math.round(ans.x) + ', y = ' + Math.round(ans.y) + ' (Simetris)',
          reason: 'Daya diagnostik rendah: solusi simetris (x = y) mudah ditebak tanpa memodelkan SPLDV. Sesuaikan c₂ agar x ≠ y.'
        };
      } else {
        const required = [coeffs.c1, coeffs.a2, coeffs.b2, coeffs.c2];
        if (coeffs.a1 !== 1) required.push(coeffs.a1);
        if (coeffs.b1 !== 1) required.push(coeffs.b1);
        const missing = required.filter(function (v) { return !includesNumericValue(extracted.values, v); });
        if (missing.length > 0) {
          accuracy = {
            status: 'FAIL',
            metric: 'Koefisien hilang',
            reason: 'Angka parameter (' + missing.join(', ') + ') belum seluruhnya muncul di teks soal.'
          };
        } else {
          accuracy = {
            status: 'PASS',
            metric: 'x = ' + Math.round(ans.x) + ', y = ' + Math.round(ans.y),
            reason: 'Solusi unik bilangan bulat positif dan non-simetris (daya diagnostik terjaga).'
          };
        }
      }
    } else {
      // Geometry
      const ans = anchor.answer;
      const eff = ans ? ans.effectiveGeo : null;
      if (!eff || !Number.isFinite(ans.value) || eff.p1 <= 0 || eff.l1 <= 0 || eff.p2 <= 0 || eff.l2 <= 0) {
        accuracy = {
          status: 'FAIL',
          metric: 'Dimensi tidak valid',
          reason: 'Panjang dan lebar kedua objek harus bernilai lebih dari 0.'
        };
      } else {
        const reqDims = [eff.p1, eff.l1, eff.p2, eff.l2];
        const missing = reqDims.filter(function (v) { return !includesNumericValue(extracted.values, v); });
        if (missing.length > 0) {
          accuracy = {
            status: 'FAIL',
            metric: 'Dimensi hilang',
            reason: 'Dimensi (' + missing.map(function (v) { return formatIdNumber(v, 4, false); }).join(', ') + ') tidak lengkap pada narasi.'
          };
        } else {
          accuracy = {
            status: 'PASS',
            metric: 'Luas: ' + anchor.answerDisplay,
            reason: 'Perhitungan luas gabungan L = L₁ + L₂ akurat untuk kedua objek.'
          };
        }
      }
    }

    // 2. Realism Agent
    let realism = { status: 'PASS', metric: '', reason: '' };
    if (extracted.hasDollar && extracted.hasRp) {
      realism = {
        status: 'FAIL',
        metric: 'Mata uang ganda ($ & Rp)',
        reason: 'Teks mencampur simbol $ dan Rp. Seragamkan seluruh nominal ke satu mata uang.'
      };
    } else if (extracted.hasRp && extracted.currencyTokens.some(function (t) { return t.currency === 'Rp' && t.value < 500; })) {
      const badToken = extracted.currencyTokens.find(function (t) { return t.currency === 'Rp' && t.value < 500; });
      realism = {
        status: 'FAIL',
        metric: 'Nominal ' + badToken.raw + ' tidak wajar',
        reason: 'Nominal Rupiah (' + badToken.raw + ') terlalu rendah untuk harga/saldo harian. Sesuaikan ke ribuan (misal Rp25.000 dan Rp3.000).'
      };
    } else if (extracted.hasDollar && extracted.currencyTokens.some(function (t) { return t.currency === '$' && t.value >= 5000; })) {
      const badDollar = extracted.currencyTokens.find(function (t) { return t.currency === '$' && t.value >= 5000; });
      realism = {
        status: 'FAIL',
        metric: 'Nominal ' + badDollar.raw + ' terlalu tinggi',
        reason: 'Nominal Dolar (' + badDollar.raw + ') tidak realistis untuk transaksi harian siswa. Gunakan skala Dolar wajar atau ubah ke Rp.'
      };
    } else if (input.topic === 'linear' && Number.isFinite(anchor.answer.value) && anchor.answer.value < 0) {
      realism = {
        status: 'FAIL',
        metric: 'Hasil negatif (' + anchor.answerDisplay + ')',
        reason: 'Kuantitas sisa tidak boleh negatif dalam konteks nyata. Naikkan nilai awal c atau kurangi m × x.'
      };
    } else if (input.topic === 'spldv' && (!anchor.answer || !anchor.answer.isPositiveSol)) {
      realism = {
        status: 'FAIL',
        metric: 'Kuantitas tidak realistis',
        reason: 'Jumlah item nyata harus berupa bilangan bulat positif (tidak boleh pecahan atau negatif).'
      };
    } else if (input.topic === 'geometry') {
      const ans = anchor.answer;
      const eff = ans ? ans.effectiveGeo : null;
      if (!eff || !Number.isFinite(ans.value) || ans.value <= 0) {
        realism = {
          status: 'FAIL',
          metric: 'Luas tidak positif',
          reason: 'Dimensi dan luas objek fisik harus lebih besar dari nol.'
        };
      } else {
        const maxDec = Math.max(
          countDecimals(eff.p1),
          countDecimals(eff.l1),
          countDecimals(eff.p2),
          countDecimals(eff.l2),
          countDecimals(ans.value)
        );
        const hasBaseSurface = /tapak\s+alas|alas\s+bawah|bagian\s+alas|sisi\s+alas/i.test(text);
        if (isSDGrade(input.grade) && maxDec > 2) {
          realism = {
            status: 'FAIL',
            metric: maxDec + ' desimal (' + anchor.answerDisplay + ')',
            reason: 'Beban ' + maxDec + ' angka desimal melampaui target kurikulum SD' +
              (hasBaseSurface ? '.' : ' dan perlu memastikan sisi yang diukur ARCore adalah sisi alas (tapak objek), bukan sisi depan objek.') +
              ' Aktifkan konversi ke satuan cm.'
          };
        } else if (isSDGrade(input.grade) && flags.baseSurfaceNotSpecified && !hasBaseSurface) {
          realism = {
            status: 'FAIL',
            metric: 'Sisi alas belum jelas',
            reason: 'Pastikan sisi yang diukur ARCore adalah sisi alas (tapak objek), bukan sisi depan objek.'
          };
        } else {
          realism = {
            status: 'PASS',
            metric: isSDGrade(input.grade) ? ('Desimal aman (' + eff.unit + '²)') : 'Konteks realistis',
            reason: 'Ukuran fisik dan satuan sesuai dengan tingkat perkembangan jenjang ' + getGradeLabel(input.grade) + '.'
          };
        }
      }
    } else {
      realism = {
        status: 'PASS',
        metric: 'Kuantitas dan satuan wajar',
        reason: 'Semua nilai positif dan konsisten dengan konteks dunia nyata.'
      };
    }

    // 3. Authenticity Agent
    let authenticity = { status: 'PASS', metric: '', reason: '' };
    const keywordLower = keyword.toLowerCase();
    const textLower = text.toLowerCase();
    const hasKeyword = keyword !== '' && textLower.indexOf(keywordLower) !== -1;
    const hasGenericGame = /\bgame\s+online\b/i.test(text) && textLower.indexOf('roblox') === -1;
    const hasAmbiguousGold = /peti\s+emas/i.test(text) && /koin\s+emas/i.test(text);

    if (!hasKeyword && hasAmbiguousGold) {
      authenticity = {
        status: 'FAIL',
        metric: 'Generik & entitas ambigu',
        reason: 'Narasi memakai istilah generik' +
          (hasGenericGame ? ' ("game online")' : '') +
          ' tanpa kata kunci minat "' + keyword + '", serta menimbulkan kerancuan entitas antara "peti emas" dan "koin emas" (ganti menjadi misal "peti berlian").'
      };
    } else if (!hasKeyword) {
      authenticity = {
        status: 'FAIL',
        metric: 'Minat spesifik absen',
        reason: 'Kata kunci minat "' + keyword + '" tidak muncul dalam soal' +
          (hasGenericGame ? ' (terdeteksi istilah generik "game online").' : '.') +
          ' Sisipkan istilah spesifik minat siswa.'
      };
    } else if (hasAmbiguousGold) {
      authenticity = {
        status: 'FAIL',
        metric: 'Entitas ambigu',
        reason: 'Istilah "peti emas" berdekatan dengan "koin emas" sehingga berisiko membingungkan siswa. Ganti nama peti dengan material berbeda (misal "peti berlian").'
      };
    } else {
      authenticity = {
        status: 'PASS',
        metric: 'Tag "' + keyword + '" cocok',
        reason: 'Kata kunci minat spesifik hadir utuh tanpa istilah generik atau entitas ambigu.'
      };
    }

    // 4. Reading-Level & SNI Agent
    let readingLevel = { status: 'PASS', metric: '', reason: '' };
    const maxW = Math.max(10, Number(input.maxWords) || 65);
    const hasChestChallenge = /tantangan/i.test(text) && /peti/i.test(text);
    const hasExplicitMapping = /(setiap|tiap)\s*(1|satu)?\s*tantangan/i.test(text);

    const expectedParams = getExpectedNumericParams(input, anchor);
    const decorativeNumbers = [];
    extracted.values.forEach(function (val) {
      const isUnitOne = Math.abs(val - 1) < 1e-4;
      const inExpected = expectedParams.some(function (p) { return Math.abs(p - val) < 1e-4; });
      if (!isUnitOne && !inExpected) {
        const alreadyListed = decorativeNumbers.some(function (d) { return Math.abs(d - val) < 1e-4; });
        if (!alreadyListed) {
          decorativeNumbers.push(val);
        }
      }
    });

    if (hasChestChallenge && !hasExplicitMapping) {
      readingLevel = {
        status: 'FAIL',
        metric: wordCount + ' / ' + maxW + ' kata (Implisit)',
        reason: 'Informasi implisit: belum dijelaskan secara eksplisit bahwa setiap 1 tantangan memberikan tepat 1 peti.'
      };
    } else if (decorativeNumbers.length > 0) {
      const decStr = decorativeNumbers.map(function (n) { return formatIdNumber(n, 4, false); }).join(', ');
      readingLevel = {
        status: 'FAIL',
        metric: 'SNI: angka dekoratif (' + decStr + ')',
        reason: 'Terdeteksi angka dekoratif di luar parameter rumus (' + decStr + '). Hapus angka pengecoh sesuai prinsip Significant Number Identification.'
      };
    } else if (wordCount > maxW) {
      readingLevel = {
        status: 'FAIL',
        metric: wordCount + ' / ' + maxW + ' kata (Berlebih)',
        reason: 'Panjang soal (' + wordCount + ' kata) melebihi batas maksimal ' + maxW + ' kata. Ringkas kalimat agar tidak membebani pemahaman.'
      };
    } else if (isSDGrade(input.grade) && sentenceInfo.avgWords > 18) {
      readingLevel = {
        status: 'FAIL',
        metric: 'Rata-rata ' + sentenceInfo.avgWords + ' kata/kalimat',
        reason: 'Kalimat terlalu panjang untuk jenjang SD (batas ≤ 18 kata/kalimat). Pecah menjadi kalimat pendek.'
      };
    } else {
      readingLevel = {
        status: 'PASS',
        metric: wordCount + ' / ' + maxW + ' kata',
        reason: 'Panjang kata, keterbacaan kalimat, dan kepatuhan SNI sesuai untuk jenjang ' + getGradeLabel(input.grade) + '.'
      };
    }

    const allPassed =
      accuracy.status === 'PASS' &&
      realism.status === 'PASS' &&
      authenticity.status === 'PASS' &&
      readingLevel.status === 'PASS';

    return {
      accuracy: accuracy,
      realism: realism,
      authenticity: authenticity,
      readingLevel: readingLevel,
      allPassed: allPassed
    };
  }

  /* ==========================================================================
   * 9. Refinement Agent (Max 5 Iterations)
   * ========================================================================== */
  function findNonSymmetricSpldvC2(a1, b1, c1, a2, b2, currentC2) {
    for (let offset = 1; offset <= 120; offset++) {
      const candidates = [currentC2 + offset, currentC2 - offset];
      for (let i = 0; i < candidates.length; i++) {
        const candC2 = candidates[i];
        if (candC2 <= 0) continue;
        const D = a1 * b2 - a2 * b1;
        if (D === 0) continue;
        const x = (c1 * b2 - candC2 * b1) / D;
        const y = (a1 * candC2 - a2 * c1) / D;
        if (Math.abs(x - Math.round(x)) < 1e-6 &&
            Math.abs(y - Math.round(y)) < 1e-6 &&
            Math.round(x) > 0 &&
            Math.round(y) > 0 &&
            Math.round(x) !== Math.round(y)) {
          return { c2: candC2, x: Math.round(x), y: Math.round(y) };
        }
      }
    }
    return null;
  }

  function runRefinementCycle() {
    if (state.evaluation.allPassed || state.draft.iteration >= state.draft.maxIterations) {
      return;
    }

    const ev = state.evaluation;
    const input = state.input;
    const logs = [];
    let needsRegenerateFromParams = false;
    let workingText = state.draft.text;

    // 1. Accuracy Fixes
    if (ev.accuracy.status === 'FAIL') {
      if (input.topic === 'spldv') {
        const a1 = Number(input.spldv.a1);
        const b1 = Number(input.spldv.b1);
        const c1 = Number(input.spldv.c1);
        let a2 = Number(input.spldv.a2);
        let b2 = Number(input.spldv.b2);
        const c2 = Number(input.spldv.c2);

        if (a1 * b2 - a2 * b1 === 0) {
          b2 += 1;
          input.spldv.b2 = b2;
          logs.push('Accuracy: Menyesuaikan koefisien b₂ menjadi ' + b2 + ' agar determinan ≠ 0.');
        }

        if (input.hobbyPreset === 'roblox' && a1 === 1 && b1 === 1 && c1 === 40 && a2 === 2 && b2 === 5 && c2 === 140) {
          input.spldv.c2 = 155;
          logs.push('Accuracy: Mengubah total koin c₂ dari 140 menjadi 155 agar solusi tidak simetris (x = 15, y = 25).');
        } else {
          const found = findNonSymmetricSpldvC2(a1, b1, c1, a2, b2, c2);
          if (found) {
            input.spldv.c2 = found.c2;
            logs.push('Accuracy: Menyesuaikan c₂ menjadi ' + found.c2 + ' agar solusi bulat positif dan non-simetris (x = ' + found.x + ', y = ' + found.y + ').');
          } else {
            const targetX = 12;
            const targetY = 18;
            input.spldv.c1 = a1 * targetX + b1 * targetY;
            input.spldv.c2 = a2 * targetX + b2 * targetY;
            logs.push('Accuracy: Menyetel ulang konstanta c₁ = ' + input.spldv.c1 + ' dan c₂ = ' + input.spldv.c2 + ' untuk solusi bulat non-simetris (x = 12, y = 18).');
          }
        }
        needsRegenerateFromParams = true;
      } else {
        needsRegenerateFromParams = true;
        logs.push('Accuracy: Menyinkronkan seluruh parameter numerik dan persamaan pada draf soal.');
      }
    }

    // 2. Realism Fixes
    if (ev.realism.status === 'FAIL') {
      if (input.topic === 'geometry') {
        if (isSDGrade(input.grade)) {
          input.geometry.convertToCmForSD = true;
          state.draft.flags.baseSurfaceNotSpecified = false;
          needsRegenerateFromParams = true;
          logs.push('Realism: Mengonversi satuan meter ke sentimeter (cm) bulat dan mempertegas pengukuran pada sisi alas (tapak objek).');
        }
      } else if (input.topic === 'linear') {
        if (input.linear.currency === 'Rp' && (input.linear.c < 500 || input.linear.m < 500)) {
          input.linear.c = Math.round(input.linear.c * 1000);
          input.linear.m = Math.round(input.linear.m * 1000);
          needsRegenerateFromParams = true;
          logs.push('Realism: Menskalakan nominal Rupiah ke skala ribuan yang wajar (Rp' + formatIdNumber(input.linear.c, 0, true) + ' dan Rp' + formatIdNumber(input.linear.m, 0, true) + ').');
        } else if (input.linear.op === '-' && input.linear.c - input.linear.m * input.linear.x < 0) {
          input.linear.c = input.linear.m * (input.linear.x + 2);
          needsRegenerateFromParams = true;
          logs.push('Realism: Menaikkan nilai awal c menjadi ' + input.linear.c + ' agar sisa tetap bernilai positif.');
        } else if (extractedMixedCurrency(workingText)) {
          needsRegenerateFromParams = true;
          logs.push('Realism: Menyeragamkan mata uang pada narasi soal.');
        }
      }
    }

    // 3. Authenticity Fixes
    if (ev.authenticity.status === 'FAIL') {
      state.draft.flags.useGenericHobby = false;
      state.draft.flags.ambiguousEntity = false;
      const kw = getActiveKeyword(input);
      if (!needsRegenerateFromParams) {
        if (/\bgame\s+online\b/i.test(workingText) && workingText.toLowerCase().indexOf(kw.toLowerCase()) === -1) {
          workingText = workingText.replace(/\bgame\s+online\b/gi, 'permainan ' + kw);
        } else if (workingText.toLowerCase().indexOf(kw.toLowerCase()) === -1) {
          workingText = 'Dalam konteks ' + kw + ', ' + workingText.charAt(0).toLowerCase() + workingText.slice(1);
        }
        workingText = workingText.replace(/peti\s+emas/gi, 'peti berlian');
      }
      logs.push('Authenticity: Menyisipkan kata kunci minat spesifik "' + kw + '" dan mengganti entitas ambigu "peti emas" menjadi "peti berlian".');
    }

    // 4. Reading-Level & SNI Fixes
    if (ev.readingLevel.status === 'FAIL') {
      state.draft.flags.implicitMapping = false;
      state.draft.flags.conciseMode = true;
      if (/SNI:/i.test(ev.readingLevel.metric)) {
        needsRegenerateFromParams = true;
        logs.push('Reading-Level: Menghapus angka dekoratif di luar parameter rumus (prinsip Significant Number Identification).');
      } else {
        if (!needsRegenerateFromParams && /tantangan/i.test(workingText) && /peti/i.test(workingText) && !/(setiap|tiap)\s*(1|satu)?\s*tantangan/i.test(workingText)) {
          workingText = workingText.replace(/(tantangan[^.]*\.)/i, '$1 Setiap 1 tantangan yang diselesaikan memberikan tepat 1 peti.');
        }
        if (countWords(workingText) > input.maxWords) {
          needsRegenerateFromParams = true;
        }
        logs.push('Reading-Level: Menambahkan aturan eksplisit "Setiap 1 tantangan ... tepat 1 peti" dan merapikan kepadatan kalimat sesuai batas kata.');
      }
    }

    state.draft.iteration += 1;
    state.draft.refinementLogs = state.draft.refinementLogs.concat(
      logs.map(function (item) {
        return 'Iterasi ' + state.draft.iteration + ' — ' + item;
      })
    );

    // Recompute symbolic anchor & draft text cleanly
    state.symbolicAnchor = computeSymbolicAnchor(state.input, state.draft.flags);
    state.draft.text = needsRegenerateFromParams
      ? generateDraftText(state.input, state.symbolicAnchor, state.draft.flags)
      : workingText;

    syncFormInputsFromState();
    runEvaluationAndUpdateCuration(true);
    setActiveStage(3);
    renderAll();
  }

  function extractedMixedCurrency(text) {
    const info = extractNumbersFromText(text);
    return info.hasDollar && info.hasRp;
  }

  /* ==========================================================================
   * 10. Teacher-in-the-Loop Curation & Regex Re-verification
   * ========================================================================== */
  function runEvaluationAndUpdateCuration(markAsVerifiedBaseline) {
    state.evaluation = evaluateDraft(state.draft.text, state.input, state.symbolicAnchor, state.draft.flags);

    if (markAsVerifiedBaseline) {
      state.curation.baselineText = state.draft.text;
      state.curation.baselineSignature = computeNumericCurrencySignature(state.draft.text);
      state.curation.needsReverification = false;
    }

    if (state.curation.needsReverification) {
      state.curation.statusMode = 'warning';
      state.curation.statusMessage = 'Perubahan Terdeteksi — Wajib Verifikasi Ulang sebelum diterbitkan.';
      state.curation.isPublished = false;
    } else if (state.evaluation.allPassed) {
      state.curation.statusMode = 'verified';
      state.curation.statusMessage = 'Terverifikasi — Seluruh 4 agen lulus dan soal siap diterbitkan ke siswa.';
      state.curation.isPublished = true;
    } else {
      state.curation.statusMode = 'error';
      state.curation.statusMessage = 'Perlu Perbaikan — Minimal satu agen berstatus GAGAL. Jalankan Refinement atau perbaiki teks.';
      state.curation.isPublished = false;
    }
  }

  function handleTeacherEditorInput(newText, fromEditorTyping) {
    state.draft.text = newText;
    const newSig = computeNumericCurrencySignature(newText);

    if (newSig !== state.curation.baselineSignature) {
      state.curation.needsReverification = true;
      state.curation.statusMode = 'warning';
      state.curation.statusMessage = 'Perubahan Terdeteksi — Wajib Verifikasi Ulang angka dan mata uang.';
      state.curation.isPublished = false;
    } else {
      state.curation.needsReverification = false;
      state.evaluation = evaluateDraft(state.draft.text, state.input, state.symbolicAnchor, state.draft.flags);
      if (state.evaluation.allPassed) {
        state.curation.statusMode = 'verified';
        state.curation.statusMessage = 'Terverifikasi — Perubahan teks aman tanpa mengubah angka atau mata uang.';
        state.curation.isPublished = true;
      } else {
        state.curation.statusMode = 'error';
        state.curation.statusMessage = 'Perlu Perbaikan — Periksa isu yang dilaporkan pada panel agen.';
        state.curation.isPublished = false;
      }
    }

    renderAgentSection();
    renderCurationSection(Boolean(fromEditorTyping));
    renderStepperAndHeader();
  }

  function reverifyTeacherDraft() {
    let text = state.draft.text;
    const cleanedForScan = text.replace(/y\s*=\s*\d+(?:[.,]\d+)*\s*[-−+]\s*\d+(?:[.,]\d+)*\s*x(?:\s*\+\s*\d+(?:[.,]\d+)*)?/gi, ' ');
    const narrativeNumbers = extractNumbersFromText(cleanedForScan);

    if (state.input.topic === 'linear') {
      if (narrativeNumbers.hasRp && !narrativeNumbers.hasDollar) {
        state.input.linear.currency = 'Rp';
      } else if (narrativeNumbers.hasDollar && !narrativeNumbers.hasRp) {
        state.input.linear.currency = '$';
      }

      if (narrativeNumbers.currencyTokens.length >= 2) {
        const newC = narrativeNumbers.currencyTokens[0].value;
        const newM = narrativeNumbers.currencyTokens[1].value;
        state.input.linear.c = newC;
        state.input.linear.m = newM;

        // If user manually scaled Rp25 -> Rp25.000 and Rp3 -> Rp3.000 without updating y = 25 - 3x, sync the equation string cleanly
        const eqSubMatch = text.match(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*([-−])\s*(\d+(?:[.,]\d+)*)\s*x/i);
        if (eqSubMatch) {
          const eqC = parseTokenNumeric(eqSubMatch[1], false);
          const eqM = parseTokenNumeric(eqSubMatch[3], false);
          if (state.input.linear.currency === 'Rp' && Math.abs(eqC * 1000 - newC) < 1e-4 && Math.abs(eqM * 1000 - newM) < 1e-4) {
            const newCEq = formatIdNumber(newC, 2, true);
            const newMEq = formatIdNumber(newM, 2, true);
            text = text.replace(eqSubMatch[0], 'y = ' + newCEq + ' ' + eqSubMatch[2] + ' ' + newMEq + 'x');
            state.draft.text = text;
          }
        }
      }

      const nonCurr = narrativeNumbers.tokens.filter(function (t) { return t.currency === ''; });
      if (nonCurr.length >= 1) {
        state.input.linear.x = nonCurr[nonCurr.length - 1].value;
      }
    } else if (state.input.topic === 'geometry') {
      const hasCmUnit = /\b\d+(?:[.,]\d+)*\s*cm\b/i.test(text);
      const hasMUnit = /\b\d+(?:[.,]\d+)*\s*m\b/i.test(text);
      if (hasCmUnit && !hasMUnit) {
        state.input.geometry.unit = 'cm';
        state.input.geometry.convertToCmForSD = false;
      } else if (hasMUnit && !hasCmUnit) {
        state.input.geometry.unit = 'm';
        state.input.geometry.convertToCmForSD = false;
      }
      if (narrativeNumbers.values.length >= 4) {
        state.input.geometry.p1 = narrativeNumbers.values[0];
        state.input.geometry.l1 = narrativeNumbers.values[1];
        state.input.geometry.p2 = narrativeNumbers.values[2];
        state.input.geometry.l2 = narrativeNumbers.values[3];
      }
    }

    syncFormInputsFromState();
    state.symbolicAnchor = computeSymbolicAnchor(state.input, state.draft.flags);
    state.curation.needsReverification = false;
    state.evaluation = evaluateDraft(state.draft.text, state.input, state.symbolicAnchor, state.draft.flags);

    if (state.evaluation.allPassed) {
      state.curation.baselineText = state.draft.text;
      state.curation.baselineSignature = computeNumericCurrencySignature(state.draft.text);
      state.curation.statusMode = 'verified';
      state.curation.statusMessage = 'Verifikasi Berhasil — Kunci jawaban diperbarui (' + state.symbolicAnchor.answerDisplay + ') dan siap diterbitkan.';
      state.curation.isPublished = true;
    } else {
      state.curation.statusMode = 'error';
      state.curation.statusMessage = 'Verifikasi Gagal — Periksa catatan merah pada panel Evaluasi 4 Agen.';
      state.curation.isPublished = false;
    }

    setActiveStage(4);
    renderAll();
  }

  /* Quick Epistemic Moves */
  function rotateStudentNameInDraft() {
    const current = state.input.studentName || 'Raka';
    const currentIdx = STUDENT_NAMES.indexOf(current);
    const nextName = STUDENT_NAMES[(currentIdx + 1) % STUDENT_NAMES.length];
    const escaped = current.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'g');
    const updatedText = regex.test(state.draft.text)
      ? state.draft.text.replace(regex, nextName)
      : state.draft.text;

    state.input.studentName = nextName;
    state.draft.text = updatedText;
    syncFormInputsFromState();
    handleTeacherEditorInput(updatedText);
    setActiveStage(4);
  }

  function incrementLinearPriceRp() {
    if (state.input.topic !== 'linear') return;
    let rpCount = 0;
    let newM = null;
    let updatedText = state.draft.text.replace(/Rp\.?\s*(\d+(?:[.,]\d+)*)/gi, function (full, numStr) {
      rpCount += 1;
      const val = parseTokenNumeric(numStr, false);
      if (rpCount === 2 && Number.isFinite(val) && val >= 500) {
        newM = Math.round(val + 1000);
        return 'Rp' + formatIdNumber(newM, 0, true);
      }
      return full;
    });

    if (newM !== null) {
      updatedText = updatedText.replace(
        /y\s*=\s*(\d+(?:[.,]\d+)*)\s*([-−])\s*(\d+(?:[.,]\d+)*)\s*x/i,
        function (_full, cStr, opChar) {
          return 'y = ' + cStr + ' ' + opChar + ' ' + formatIdNumber(newM, 0, true) + 'x';
        }
      );
      updatedText = updatedText.replace(
        /y\s*=\s*(\d+(?:[.,]\d+)*)\s*x\s*\+\s*(\d+(?:[.,]\d+)*)/i,
        function (_full, _mStr, cStr) {
          return 'y = ' + formatIdNumber(newM, 0, true) + 'x + ' + cStr;
        }
      );
    }

    setActiveStage(4);
    handleTeacherEditorInput(updatedText);
  }

  function toggleRupiahScaleOrTest() {
    if (state.input.topic !== 'linear') return;
    let updatedText = state.draft.text;

    if (/\$\s*\d/.test(updatedText)) {
      updatedText = updatedText.replace(/\$\s*(\d)/g, 'Rp$1');
    } else {
      const info = extractNumbersFromText(updatedText);
      const hasSmallRp = info.currencyTokens.some(function (t) {
        return t.currency === 'Rp' && t.value < 500;
      });

      if (hasSmallRp) {
        updatedText = updatedText.replace(/Rp\.?\s*(\d+(?:[.,]\d+)*)/gi, function (full, numStr) {
          const val = parseTokenNumeric(numStr, false);
          if (Number.isFinite(val) && val > 0 && val < 500) {
            return 'Rp' + formatIdNumber(val * 1000, 0, true);
          }
          return full;
        });
        updatedText = updatedText.replace(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*([-−])\s*(\d+(?:[.,]\d+)*)\s*x/gi, function (full, cStr, opChar, mStr) {
          const cVal = parseTokenNumeric(cStr, false);
          const mVal = parseTokenNumeric(mStr, false);
          if (cVal > 0 && cVal < 500 && mVal > 0 && mVal < 500) {
            return 'y = ' + formatIdNumber(cVal * 1000, 0, true) + ' ' + opChar + ' ' + formatIdNumber(mVal * 1000, 0, true) + 'x';
          }
          return full;
        });
        updatedText = updatedText.replace(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*x\s*\+\s*(\d+(?:[.,]\d+)*)/gi, function (full, mStr, cStr) {
          const mVal = parseTokenNumeric(mStr, false);
          const cVal = parseTokenNumeric(cStr, false);
          if (cVal > 0 && cVal < 500 && mVal > 0 && mVal < 500) {
            return 'y = ' + formatIdNumber(mVal * 1000, 0, true) + 'x + ' + formatIdNumber(cVal * 1000, 0, true);
          }
          return full;
        });
      } else {
        updatedText = updatedText.replace(/Rp\.?\s*(\d+(?:[.,]\d+)*)/gi, function (full, numStr) {
          const val = parseTokenNumeric(numStr, false);
          if (Number.isFinite(val) && val >= 1000) {
            return 'Rp' + formatIdNumber(roundTo(val / 1000, 2), 2, false);
          }
          return full;
        });
        updatedText = updatedText.replace(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*([-−])\s*(\d+(?:[.,]\d+)*)\s*x/gi, function (full, cStr, opChar, mStr) {
          const cVal = parseTokenNumeric(cStr, false);
          const mVal = parseTokenNumeric(mStr, false);
          if (cVal >= 1000 && mVal >= 1000) {
            return 'y = ' + formatIdNumber(roundTo(cVal / 1000, 2), 2, false) + ' ' + opChar + ' ' + formatIdNumber(roundTo(mVal / 1000, 2), 2, false) + 'x';
          }
          return full;
        });
        updatedText = updatedText.replace(/y\s*=\s*(\d+(?:[.,]\d+)*)\s*x\s*\+\s*(\d+(?:[.,]\d+)*)/gi, function (full, mStr, cStr) {
          const mVal = parseTokenNumeric(mStr, false);
          const cVal = parseTokenNumeric(cStr, false);
          if (cVal >= 1000 && mVal >= 1000) {
            return 'y = ' + formatIdNumber(roundTo(mVal / 1000, 2), 2, false) + 'x + ' + formatIdNumber(roundTo(cVal / 1000, 2), 2, false);
          }
          return full;
        });
      }
    }

    setActiveStage(4);
    handleTeacherEditorInput(updatedText);
  }

  /* ==========================================================================
   * 11. Preset Loaders (Case 1, Case 2, Case 3)
   * ========================================================================== */
  function loadPreset(presetId) {
    state.activePreset = presetId;
    state.draft.iteration = 1;
    state.draft.refinementLogs = [];
    state.student = { inputPrimary: '', inputSecondary: '', checked: false, isCorrect: false, feedback: '' };

    if (presetId === 'case1') {
      state.input = {
        topic: 'linear',
        linear: { c: 25000, m: 3000, x: 4, op: '-', currency: 'Rp' },
        spldv: { a1: 1, b1: 1, c1: 40, a2: 2, b2: 5, c2: 140 },
        geometry: {
          objectPreset: 'pc_keyboard',
          obj1Name: 'Unit PC', p1: 0.51, l1: 0.36,
          obj2Name: 'Keyboard', p2: 0.41, l2: 0.15,
          unit: 'm',
          convertToCmForSD: false
        },
        hobbyPreset: 'joes_juice_bar',
        hobbyKeyword: 'Kedai Es Teh Nusantara',
        studentName: 'Raka',
        grade: 'SMP7',
        difficulty: 'Easy',
        maxWords: 65,
        showScaffolding: true
      };
      state.draft.flags = {
        useGenericHobby: false,
        ambiguousEntity: false,
        implicitMapping: false,
        baseSurfaceNotSpecified: false,
        conciseMode: false
      };
      state.activeStage = 1;
    } else if (presetId === 'case2') {
      state.input = {
        topic: 'spldv',
        linear: { c: 25000, m: 3000, x: 4, op: '-', currency: 'Rp' },
        spldv: { a1: 1, b1: 1, c1: 40, a2: 2, b2: 5, c2: 140 },
        geometry: {
          objectPreset: 'pc_keyboard',
          obj1Name: 'Unit PC', p1: 0.51, l1: 0.36,
          obj2Name: 'Keyboard', p2: 0.41, l2: 0.15,
          unit: 'm',
          convertToCmForSD: false
        },
        hobbyPreset: 'roblox',
        hobbyKeyword: 'Roblox',
        studentName: 'Budi',
        grade: 'SMP',
        difficulty: 'Intermediate',
        maxWords: 70,
        showScaffolding: false
      };
      state.draft.flags = {
        useGenericHobby: true,
        ambiguousEntity: true,
        implicitMapping: true,
        baseSurfaceNotSpecified: false,
        conciseMode: false
      };
      state.activeStage = 3;
    } else if (presetId === 'case3') {
      state.input = {
        topic: 'geometry',
        linear: { c: 25000, m: 3000, x: 4, op: '-', currency: 'Rp' },
        spldv: { a1: 1, b1: 1, c1: 40, a2: 2, b2: 5, c2: 140 },
        geometry: {
          objectPreset: 'pc_keyboard',
          obj1Name: 'Unit PC', p1: 0.51, l1: 0.36,
          obj2Name: 'Keyboard', p2: 0.41, l2: 0.15,
          unit: 'm',
          convertToCmForSD: false
        },
        hobbyPreset: 'pc_keyboard',
        hobbyKeyword: 'perangkat komputer meja',
        studentName: 'Sari',
        grade: 'SD',
        difficulty: 'Advanced',
        maxWords: 65,
        showScaffolding: true
      };
      state.draft.flags = {
        useGenericHobby: false,
        ambiguousEntity: false,
        implicitMapping: false,
        baseSurfaceNotSpecified: true,
        conciseMode: false
      };
      state.activeStage = 3;
    }

    syncFormInputsFromState();
    regenerateFromInputs();
  }

  function regenerateFromInputs() {
    state.symbolicAnchor = computeSymbolicAnchor(state.input, state.draft.flags);
    state.draft.text = generateDraftText(state.input, state.symbolicAnchor, state.draft.flags);
    state.student = { inputPrimary: '', inputSecondary: '', checked: false, isCorrect: false, feedback: '' };
    runEvaluationAndUpdateCuration(true);
    renderAll();
  }

  /* ==========================================================================
   * 12. Student Exercise View Logic
   * ========================================================================== */
  function checkStudentAnswer() {
    const ans = state.symbolicAnchor.answer;
    if (!ans) return;

    const raw1 = document.getElementById('student-input-1').value;
    const raw2 = document.getElementById('student-input-2').value;
    state.student.inputPrimary = raw1;
    state.student.inputSecondary = raw2;
    state.student.checked = true;

    if (ans.type === 'pair') {
      const valX = parseFlexibleNumber(raw1, true);
      const valY = parseFlexibleNumber(raw2, true);
      if (!Number.isFinite(valX) || !Number.isFinite(valY)) {
        state.student.isCorrect = false;
        state.student.feedback = 'Belum Tepat — Masukkan angka bulat untuk nilai x dan y.';
      } else if (Math.abs(valX - ans.x) < 1e-4 && Math.abs(valY - ans.y) < 1e-4) {
        state.student.isCorrect = true;
        state.student.feedback = 'Benar! Jawabanmu tepat: x = ' + formatIdNumber(ans.x, 2, false) + ' (' + ans.xLabel + ') dan y = ' + formatIdNumber(ans.y, 2, false) + ' (' + ans.yLabel + ').';
      } else {
        state.student.isCorrect = false;
        state.student.feedback = 'Belum Tepat — Periksa kembali pemodelan SPLDV pada langkah penyelesaian di bawah.';
      }
    } else {
      const val = parseFlexibleNumber(raw1, state.input.topic === 'geometry' && ans.effectiveGeo && ans.effectiveGeo.unit === 'm');
      if (!Number.isFinite(val)) {
        state.student.isCorrect = false;
        state.student.feedback = 'Belum Tepat — Masukkan nilai numerik yang valid (contoh: ' + state.symbolicAnchor.answerDisplay + ').';
      } else if (Math.abs(val - ans.value) < 1e-4) {
        state.student.isCorrect = true;
        state.student.feedback = 'Benar! Hasil akhir yang tepat adalah ' + state.symbolicAnchor.answerDisplay + '.';
      } else {
        state.student.isCorrect = false;
        state.student.feedback = 'Belum Tepat — Jawaban yang benar adalah ' + state.symbolicAnchor.answerDisplay + '. Simak langkah penyelesaian di bawah.';
      }
    }

    renderStudentView();
  }

  /* ==========================================================================
   * 13. DOM Synchronization & Rendering
   * ========================================================================== */
  function setGlobalNotice(msg) {
    const el = document.getElementById('global-notice');
    if (!msg) {
      el.hidden = true;
      el.textContent = '';
    } else {
      el.textContent = msg;
      el.hidden = false;
    }
  }

  function setActiveStage(stageNum) {
    state.activeStage = stageNum;
    const mapPanel = {
      1: 'panel-input',
      2: 'panel-symbolic',
      3: 'panel-agents',
      4: 'panel-curation'
    };
    document.querySelectorAll('.panel').forEach(function (p) {
      p.classList.remove('is-highlighted');
    });
    const targetId = mapPanel[stageNum];
    if (targetId && state.activeView === 'teacher') {
      const panelEl = document.getElementById(targetId);
      if (panelEl) {
        panelEl.classList.add('is-highlighted');
      }
    }
    renderStepperAndHeader();
  }

  function switchView(targetView) {
    if (targetView === 'student') {
      if (state.curation.needsReverification) {
        setGlobalNotice('Perubahan angka/mata uang terdeteksi. Klik "Verifikasi Ulang" pada Modul D sebelum membuka Mode Siswa.');
        setActiveStage(4);
        document.getElementById('btn-reverify').focus();
        return;
      }
      if (!state.evaluation.allPassed) {
        setGlobalNotice('Minimal satu agen evaluator masih berstatus GAGAL. Jalankan "Refinement Agent" atau perbaiki teks terlebih dahulu.');
        setActiveStage(3);
        return;
      }
    }

    setGlobalNotice('');
    state.activeView = targetView;
    if (targetView === 'student') {
      state.activeStage = 5;
    } else if (state.activeStage === 5) {
      state.activeStage = 4;
    }

    document.getElementById('view-teacher').hidden = targetView !== 'teacher';
    document.getElementById('view-student').hidden = targetView !== 'student';

    renderStepperAndHeader();
    if (targetView === 'student') {
      renderStudentView();
    }
  }

  function syncFormInputsFromState() {
    const inp = state.input;
    document.getElementById('input-topic').value = inp.topic;

    document.getElementById('fields-linear').hidden = inp.topic !== 'linear';
    document.getElementById('fields-spldv').hidden = inp.topic !== 'spldv';
    document.getElementById('fields-geometry').hidden = inp.topic !== 'geometry';

    // Linear
    document.getElementById('lin-c').value = formatPlainNumber(inp.linear.c, 2);
    document.getElementById('lin-m').value = formatPlainNumber(inp.linear.m, 2);
    document.getElementById('lin-x').value = formatPlainNumber(inp.linear.x, 2);
    document.getElementById('lin-op').value = inp.linear.op;
    document.getElementById('lin-currency').value = inp.linear.currency;

    // SPLDV
    document.getElementById('spldv-a1').value = formatPlainNumber(inp.spldv.a1, 2);
    document.getElementById('spldv-b1').value = formatPlainNumber(inp.spldv.b1, 2);
    document.getElementById('spldv-c1').value = formatPlainNumber(inp.spldv.c1, 2);
    document.getElementById('spldv-a2').value = formatPlainNumber(inp.spldv.a2, 2);
    document.getElementById('spldv-b2').value = formatPlainNumber(inp.spldv.b2, 2);
    document.getElementById('spldv-c2').value = formatPlainNumber(inp.spldv.c2, 2);

    // Geometry
    document.getElementById('geo-preset').value = inp.geometry.objectPreset;
    document.getElementById('geo-unit').value = inp.geometry.unit;
    document.getElementById('geo-obj1').value = inp.geometry.obj1Name;
    document.getElementById('geo-p1').value = formatPlainNumber(inp.geometry.p1, 4);
    document.getElementById('geo-l1').value = formatPlainNumber(inp.geometry.l1, 4);
    document.getElementById('geo-obj2').value = inp.geometry.obj2Name;
    document.getElementById('geo-p2').value = formatPlainNumber(inp.geometry.p2, 4);
    document.getElementById('geo-l2').value = formatPlainNumber(inp.geometry.l2, 4);
    document.getElementById('geo-convert-cm').checked = Boolean(inp.geometry.convertToCmForSD);

    // Hobby & Pedagogical
    document.getElementById('input-hobby-preset').value = inp.hobbyPreset;
    document.getElementById('input-hobby-keyword').value = inp.hobbyKeyword;
    document.getElementById('input-student-name').value = inp.studentName;
    document.getElementById('input-grade').value = inp.grade;
    document.getElementById('input-difficulty').value = inp.difficulty;
    document.getElementById('input-max-words').value = String(inp.maxWords);
    document.getElementById('input-scaffolding').checked = Boolean(inp.showScaffolding);
  }

  function readFormInputsIntoState() {
    const inp = state.input;
    inp.topic = document.getElementById('input-topic').value;

    const linC = parseFlexibleNumber(document.getElementById('lin-c').value, false);
    const linM = parseFlexibleNumber(document.getElementById('lin-m').value, false);
    const linX = parseFlexibleNumber(document.getElementById('lin-x').value, false);
    if (Number.isFinite(linC)) inp.linear.c = linC;
    if (Number.isFinite(linM)) inp.linear.m = linM;
    if (Number.isFinite(linX)) inp.linear.x = linX;
    inp.linear.op = document.getElementById('lin-op').value;
    inp.linear.currency = document.getElementById('lin-currency').value;

    const sa1 = parseFlexibleNumber(document.getElementById('spldv-a1').value, false);
    const sb1 = parseFlexibleNumber(document.getElementById('spldv-b1').value, false);
    const sc1 = parseFlexibleNumber(document.getElementById('spldv-c1').value, false);
    const sa2 = parseFlexibleNumber(document.getElementById('spldv-a2').value, false);
    const sb2 = parseFlexibleNumber(document.getElementById('spldv-b2').value, false);
    const sc2 = parseFlexibleNumber(document.getElementById('spldv-c2').value, false);
    if (Number.isFinite(sa1)) inp.spldv.a1 = sa1;
    if (Number.isFinite(sb1)) inp.spldv.b1 = sb1;
    if (Number.isFinite(sc1)) inp.spldv.c1 = sc1;
    if (Number.isFinite(sa2)) inp.spldv.a2 = sa2;
    if (Number.isFinite(sb2)) inp.spldv.b2 = sb2;
    if (Number.isFinite(sc2)) inp.spldv.c2 = sc2;

    inp.geometry.objectPreset = document.getElementById('geo-preset').value;
    inp.geometry.unit = document.getElementById('geo-unit').value;
    inp.geometry.obj1Name = document.getElementById('geo-obj1').value.trim() || 'Objek 1';
    inp.geometry.obj2Name = document.getElementById('geo-obj2').value.trim() || 'Objek 2';
    const gp1 = parseFlexibleNumber(document.getElementById('geo-p1').value, true);
    const gl1 = parseFlexibleNumber(document.getElementById('geo-l1').value, true);
    const gp2 = parseFlexibleNumber(document.getElementById('geo-p2').value, true);
    const gl2 = parseFlexibleNumber(document.getElementById('geo-l2').value, true);
    if (Number.isFinite(gp1)) inp.geometry.p1 = gp1;
    if (Number.isFinite(gl1)) inp.geometry.l1 = gl1;
    if (Number.isFinite(gp2)) inp.geometry.p2 = gp2;
    if (Number.isFinite(gl2)) inp.geometry.l2 = gl2;
    inp.geometry.convertToCmForSD = document.getElementById('geo-convert-cm').checked;

    inp.hobbyPreset = document.getElementById('input-hobby-preset').value;
    inp.hobbyKeyword = document.getElementById('input-hobby-keyword').value;
    inp.studentName = document.getElementById('input-student-name').value.trim() || 'Raka';
    inp.grade = document.getElementById('input-grade').value;
    inp.difficulty = document.getElementById('input-difficulty').value;
    const mw = Number(document.getElementById('input-max-words').value);
    if (Number.isFinite(mw) && mw >= 20) inp.maxWords = Math.round(mw);
    inp.showScaffolding = document.getElementById('input-scaffolding').checked;
  }

  function renderStepperAndHeader() {
    const teacherTab = document.getElementById('btn-view-teacher');
    const studentTab = document.getElementById('btn-view-student');
    teacherTab.classList.toggle('is-active', state.activeView === 'teacher');
    teacherTab.setAttribute('aria-selected', String(state.activeView === 'teacher'));
    studentTab.classList.toggle('is-active', state.activeView === 'student');
    studentTab.setAttribute('aria-selected', String(state.activeView === 'student'));

    document.querySelectorAll('.preset-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.preset === state.activePreset);
    });

    const presetChip = document.getElementById('active-preset-chip');
    presetChip.textContent = PRESET_LABELS[state.activePreset] || 'Mode Kustom';

    document.querySelectorAll('.step-btn').forEach(function (btn) {
      const stage = Number(btn.dataset.stage);
      const isCurrent = stage === state.activeStage;
      const isDone =
        (stage === 1 && state.activeStage > 1) ||
        (stage === 2 && state.activeStage > 2) ||
        (stage === 3 && state.evaluation.allPassed && state.activeStage >= 3 && !isCurrent) ||
        (stage === 4 && state.curation.isPublished && state.activeView === 'student');

      btn.classList.toggle('is-active', isCurrent);
      btn.classList.toggle('is-done', isDone && !isCurrent);
      if (isCurrent) {
        btn.setAttribute('aria-current', 'step');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }

  function renderSymbolicSection() {
    document.getElementById('symbolic-formula').innerHTML = renderMath(
      state.symbolicAnchor.formulaLatex,
      state.symbolicAnchor.formulaPlain
    );
    document.getElementById('symbolic-code').innerHTML = state.symbolicAnchor.codeHtml;
    document.getElementById('constraint-prompt-code').textContent = buildConstraintPrompt(state.input, state.symbolicAnchor);
    document.getElementById('symbolic-answer').textContent = state.symbolicAnchor.answerDisplay;
  }

  function renderAgentSection() {
    const ev = state.evaluation;
    const agents = [
      { key: 'accuracy', title: 'Mathematical Accuracy Agent', data: ev.accuracy },
      { key: 'realism', title: 'Realism Agent', data: ev.realism },
      { key: 'authenticity', title: 'Authenticity Agent', data: ev.authenticity },
      { key: 'readingLevel', title: 'Reading-Level Agent', data: ev.readingLevel }
    ];

    const passCount = agents.filter(function (a) { return a.data.status === 'PASS'; }).length;
    const summaryEl = document.getElementById('agents-summary');
    summaryEl.textContent = passCount + '/4 Lulus';
    summaryEl.className = 'status-chip ' + (passCount === 4 ? 'chip-pass' : 'chip-fail');

    const iterEl = document.getElementById('refinement-iteration');
    iterEl.textContent = 'Iterasi ' + state.draft.iteration + ' / ' + state.draft.maxIterations;

    const grid = document.getElementById('agents-grid');
    grid.innerHTML = agents.map(function (item) {
      const isPass = item.data.status === 'PASS';
      const badgeClass = isPass ? 'badge-pass' : 'badge-fail';
      const cardClass = isPass ? 'status-pass' : 'status-fail';
      const iconHtml = isPass ? ICONS.check : ICONS.x;
      const badgeLabel = isPass ? 'LULUS' : 'GAGAL';

      return '<article class="agent-card ' + cardClass + '">' +
        '<div class="agent-card-top">' +
          '<h3 class="agent-name">' + escapeHtml(item.title) + '</h3>' +
          '<span class="agent-badge ' + badgeClass + '">' +
            '<span class="badge-icon" aria-hidden="true">' + iconHtml + '</span>' +
            '<span>' + badgeLabel + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="agent-metric">' + escapeHtml(item.data.metric) + '</div>' +
        '<p class="agent-reason">' + escapeHtml(item.data.reason) + '</p>' +
      '</article>';
    }).join('');

    const refineBtn = document.getElementById('btn-refine');
    const refineHint = document.getElementById('refinement-hint');
    if (ev.allPassed) {
      refineBtn.disabled = true;
      refineHint.textContent = 'Semua 4 agen berstatus LULUS. Tidak ada revisi tambahan yang diperlukan.';
    } else if (state.draft.iteration >= state.draft.maxIterations) {
      refineBtn.disabled = true;
      refineHint.textContent = 'Batas maksimal 5 iterasi tercapai. Gunakan Editor Kurasi Guru di bawah.';
    } else {
      refineBtn.disabled = false;
      refineHint.textContent = (4 - passCount) + ' agen memerlukan perbaikan. Klik untuk menjalankan siklus revisi otomatis.';
    }

    const logBox = document.getElementById('refinement-log');
    const logList = document.getElementById('refinement-log-list');
    if (state.draft.refinementLogs.length > 0) {
      logBox.hidden = false;
      logList.innerHTML = state.draft.refinementLogs.map(function (entry) {
        return '<li>' + escapeHtml(entry) + '</li>';
      }).join('');
    } else {
      logBox.hidden = true;
      logList.innerHTML = '';
    }
  }

  function renderCurationSection(skipTextareaSync) {
    const wc = countWords(state.draft.text);
    const maxW = Number(state.input.maxWords) || 65;
    const wcEl = document.getElementById('editor-word-count');
    wcEl.textContent = wc + ' / ' + maxW + ' kata';
    wcEl.className = 'status-chip ' + (wc > maxW ? 'chip-fail' : 'chip-neutral');

    const banner = document.getElementById('curation-banner');
    const bannerIcon = document.getElementById('curation-banner-icon');
    const bannerText = document.getElementById('curation-banner-text');

    banner.className = 'curation-banner';
    if (state.curation.statusMode === 'warning') {
      banner.classList.add('is-warning');
      bannerIcon.innerHTML = ICONS.alert;
    } else if (state.curation.statusMode === 'error') {
      banner.classList.add('is-error');
      bannerIcon.innerHTML = ICONS.x;
    } else {
      banner.classList.add('is-verified');
      bannerIcon.innerHTML = ICONS.check;
    }
    bannerText.textContent = state.curation.statusMessage;

    const editor = document.getElementById('teacher-editor');
    if (!skipTextareaSync && editor.value !== state.draft.text) {
      editor.value = state.draft.text;
    }

    const isLinear = state.input.topic === 'linear';
    const extracted = extractNumbersFromText(state.draft.text);
    const hasDollarInDraft = extracted.hasDollar;
    const rpTokens = extracted.currencyTokens.filter(function (t) { return t.currency === 'Rp'; });
    const hasSmallRpInDraft = rpTokens.some(function (t) { return t.value < 500; });
    const hasNormalRpInDraft = rpTokens.some(function (t) { return t.value >= 500; });

    document.getElementById('btn-ep-price').disabled = !isLinear || rpTokens.length < 2 || rpTokens[1].value < 500;
    const scaleBtn = document.getElementById('btn-ep-scale');
    const scaleLabel = document.getElementById('btn-ep-scale-label');
    scaleBtn.disabled = !isLinear || (!hasDollarInDraft && !hasSmallRpInDraft && !hasNormalRpInDraft);
    if (hasDollarInDraft) {
      scaleLabel.textContent = 'Lokalisi Mata Uang ($ ke Rp)';
    } else if (hasSmallRpInDraft) {
      scaleLabel.textContent = 'Skala Rupiah Wajar (×1.000)';
    } else {
      scaleLabel.textContent = 'Uji Salah Ketik Nol (Rp)';
    }

    const publishBtn = document.getElementById('btn-publish');
    publishBtn.disabled = state.curation.needsReverification || !state.evaluation.allPassed;
  }

  function renderStudentView() {
    const inp = state.input;
    const chipsContainer = document.getElementById('student-chips');
    const chips = [
      TOPIC_LABELS[inp.topic] || inp.topic,
      'Jenjang ' + getGradeLabel(inp.grade),
      'Level ' + inp.difficulty,
      'Minat: ' + getActiveKeyword(inp)
    ];
    chipsContainer.innerHTML = chips.map(function (c) {
      return '<span class="status-chip chip-neutral">' + escapeHtml(c) + '</span>';
    }).join('');

    document.getElementById('student-problem-text').textContent = state.draft.text;

    const scaffBox = document.getElementById('student-scaffolding');
    if (inp.showScaffolding) {
      scaffBox.hidden = false;
      document.getElementById('student-scaffolding-formula').innerHTML = renderMath(
        state.symbolicAnchor.formulaLatex,
        state.symbolicAnchor.formulaPlain
      );
    } else {
      scaffBox.hidden = true;
    }

    const label1 = document.getElementById('student-label-1');
    const input1 = document.getElementById('student-input-1');
    const wrap2 = document.getElementById('student-input-2-wrap');
    const label2 = document.getElementById('student-label-2');
    const input2 = document.getElementById('student-input-2');

    if (inp.topic === 'spldv') {
      const ans = state.symbolicAnchor.answer;
      label1.textContent = 'Nilai x (' + (ans ? ans.xLabel : 'variabel 1') + ')';
      input1.placeholder = 'Contoh: 15…';
      wrap2.hidden = false;
      label2.textContent = 'Nilai y (' + (ans ? ans.yLabel : 'variabel 2') + ')';
      input2.placeholder = 'Contoh: 25…';
    } else if (inp.topic === 'geometry') {
      const effUnit = state.symbolicAnchor.answer && state.symbolicAnchor.answer.effectiveGeo
        ? state.symbolicAnchor.answer.effectiveGeo.unit
        : inp.geometry.unit;
      label1.textContent = 'Total Luas (' + effUnit + '²)';
      input1.placeholder = effUnit === 'cm' ? 'Contoh: 2451…' : 'Contoh: 0,2451…';
      wrap2.hidden = true;
    } else {
      label1.textContent = 'Jawaban Akhir (' + inp.linear.currency + ')';
      input1.placeholder = inp.linear.currency === 'Rp' ? 'Contoh: 13000 atau Rp13.000…' : 'Contoh: 13 atau $13…';
      wrap2.hidden = true;
    }

    input1.value = state.student.inputPrimary;
    input2.value = state.student.inputSecondary;

    const fbBox = document.getElementById('student-feedback');
    const stepsBox = document.getElementById('student-steps');
    const stepsList = document.getElementById('student-steps-list');

    if (state.student.checked) {
      fbBox.hidden = false;
      fbBox.className = 'student-feedback ' + (state.student.isCorrect ? 'is-correct' : 'is-wrong');
      fbBox.innerHTML = '<span class="badge-icon" aria-hidden="true">' +
        (state.student.isCorrect ? ICONS.check : ICONS.x) +
        '</span><span>' + escapeHtml(state.student.feedback) + '</span>';

      stepsBox.hidden = false;
      stepsList.innerHTML = state.symbolicAnchor.steps.map(function (st) {
        return '<li>' + escapeHtml(st) + '</li>';
      }).join('');
    } else {
      fbBox.hidden = true;
      stepsBox.hidden = true;
      stepsList.innerHTML = '';
    }
  }

  function renderAll() {
    renderStepperAndHeader();
    renderSymbolicSection();
    renderAgentSection();
    renderCurationSection(false);
    if (state.activeView === 'student') {
      renderStudentView();
    }
  }

  /* ==========================================================================
   * 14. Event Binding & Initialization
   * ========================================================================== */
  function hydrateStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(function (el) {
      const name = el.getAttribute('data-icon');
      if (ICONS[name]) {
        el.innerHTML = ICONS[name];
      }
    });
  }

  function markCustomMode() {
    state.activePreset = 'custom';
    state.draft.iteration = 1;
    state.draft.refinementLogs = [];
    state.draft.flags = {
      useGenericHobby: false,
      ambiguousEntity: false,
      implicitMapping: false,
      baseSurfaceNotSpecified: false,
      conciseMode: false
    };
  }

  function bindEvents() {
    // Preset Toolbar
    document.querySelectorAll('.preset-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setGlobalNotice('');
        if (state.activeView !== 'teacher') {
          state.activeView = 'teacher';
          document.getElementById('view-teacher').hidden = false;
          document.getElementById('view-student').hidden = true;
        }
        loadPreset(btn.dataset.preset);
      });
    });

    // View Tabs
    document.getElementById('btn-view-teacher').addEventListener('click', function () {
      switchView('teacher');
    });
    document.getElementById('btn-view-student').addEventListener('click', function () {
      switchView('student');
    });
    document.getElementById('btn-back-teacher').addEventListener('click', function () {
      switchView('teacher');
    });

    // Stepper
    document.querySelectorAll('.step-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const stage = Number(btn.dataset.stage);
        if (stage === 5) {
          switchView('student');
          return;
        }
        if (state.activeView !== 'teacher') {
          switchView('teacher');
        }
        setActiveStage(stage);
        const panelMap = {
          1: 'panel-input',
          2: 'panel-symbolic',
          3: 'panel-agents',
          4: 'panel-curation'
        };
        const panelEl = document.getElementById(panelMap[stage]);
        if (panelEl) {
          panelEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

    // Modul A: Topic switch & Object Preset & Hobby Preset
    document.getElementById('input-topic').addEventListener('change', function () {
      markCustomMode();
      readFormInputsIntoState();
      syncFormInputsFromState();
      regenerateFromInputs();
    });

    document.getElementById('geo-preset').addEventListener('change', function (e) {
      const presetKey = e.target.value;
      markCustomMode();
      readFormInputsIntoState();
      if (GEO_OBJECT_PRESETS[presetKey]) {
        const g = GEO_OBJECT_PRESETS[presetKey];
        state.input.geometry.objectPreset = presetKey;
        state.input.geometry.obj1Name = g.obj1Name;
        state.input.geometry.p1 = g.p1;
        state.input.geometry.l1 = g.l1;
        state.input.geometry.obj2Name = g.obj2Name;
        state.input.geometry.p2 = g.p2;
        state.input.geometry.l2 = g.l2;
        state.input.geometry.unit = g.unit;
      }
      syncFormInputsFromState();
      regenerateFromInputs();
    });

    document.getElementById('input-hobby-preset').addEventListener('change', function (e) {
      const key = e.target.value;
      markCustomMode();
      readFormInputsIntoState();
      if (HOBBY_CONFIGS[key]) {
        state.input.hobbyPreset = key;
        state.input.hobbyKeyword = HOBBY_CONFIGS[key].defaultKeyword;
      }
      syncFormInputsFromState();
      regenerateFromInputs();
    });

    document.getElementById('geo-convert-cm').addEventListener('change', function () {
      readFormInputsIntoState();
      if (state.input.geometry.convertToCmForSD && isSDGrade(state.input.grade)) {
        state.draft.flags.baseSurfaceNotSpecified = false;
      }
      regenerateFromInputs();
    });

    // Modul B: Langkah A / Langkah B Tabs
    const tabStepA = document.getElementById('tab-step-a');
    const tabStepB = document.getElementById('tab-step-b');
    const paneStepA = document.getElementById('pane-step-a');
    const paneStepB = document.getElementById('pane-step-b');

    tabStepA.addEventListener('click', function () {
      tabStepA.classList.add('is-active');
      tabStepA.setAttribute('aria-selected', 'true');
      tabStepB.classList.remove('is-active');
      tabStepB.setAttribute('aria-selected', 'false');
      paneStepA.hidden = false;
      paneStepB.hidden = true;
    });

    tabStepB.addEventListener('click', function () {
      tabStepB.classList.add('is-active');
      tabStepB.setAttribute('aria-selected', 'true');
      tabStepA.classList.remove('is-active');
      tabStepA.setAttribute('aria-selected', 'false');
      paneStepB.hidden = false;
      paneStepA.hidden = true;
    });

    document.getElementById('input-scaffolding').addEventListener('change', function () {
      readFormInputsIntoState();
      regenerateFromInputs();
    });

    document.getElementById('btn-generate').addEventListener('click', function () {
      markCustomMode();
      readFormInputsIntoState();
      setActiveStage(2);
      regenerateFromInputs();
    });

    // Modul C: Refinement Agent
    document.getElementById('btn-refine').addEventListener('click', function () {
      runRefinementCycle();
    });

    // Modul D: Teacher Editor & Epistemic Moves
    document.getElementById('teacher-editor').addEventListener('input', function (e) {
      setGlobalNotice('');
      handleTeacherEditorInput(e.target.value, true);
    });

    document.getElementById('btn-ep-name').addEventListener('click', rotateStudentNameInDraft);
    document.getElementById('btn-ep-price').addEventListener('click', incrementLinearPriceRp);
    document.getElementById('btn-ep-scale').addEventListener('click', toggleRupiahScaleOrTest);

    document.getElementById('btn-reverify').addEventListener('click', function () {
      setGlobalNotice('');
      reverifyTeacherDraft();
    });

    document.getElementById('btn-publish').addEventListener('click', function () {
      switchView('student');
    });

    // Modul E: Student Exercise Form
    document.getElementById('student-answer-form').addEventListener('submit', function (e) {
      e.preventDefault();
      checkStudentAnswer();
    });

    document.getElementById('btn-reset-answer').addEventListener('click', function () {
      state.student = { inputPrimary: '', inputSecondary: '', checked: false, isCorrect: false, feedback: '' };
      renderStudentView();
      document.getElementById('student-input-1').focus();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    hydrateStaticIcons();
    bindEvents();
    loadPreset('case1');
  });
})();
