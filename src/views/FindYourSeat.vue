<template>
  <div class="wrapper">
    <h1 class="title">Добредојдовте на нашата свадба</h1>
    <p class="subtitle">
      Внесете го вашето име и презиме за да го најдете бројот на вашата маса
    </p>

    <div class="form">
      <div class="input-wrap">
        <input
            v-model="query"
            @input="onInput"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="enterSelect"
            @keydown.esc.prevent="closeDropdown"
            placeholder="Име и презиме"
            class="input"
            autocomplete="off"
        />
        <ul v-if="open && shownSuggestions.length" class="dropdown">
          <li
              v-for="(s, i) in shownSuggestions"
              :key="s.key"
              :class="['item', { active: i === hi }]"
              @mousedown.prevent="selectSuggestion(s)"
          >
            {{ s.displayForInput }}
          </li>
        </ul>
      </div>
      <button @click="findTable" class="btn">Потврди</button>
    </div>

    <div class="result" v-if="table !== null">
      <transition name="fade-slide">
        <div class="number" v-if="table >= 0">
          Број на маса<br /><span class="num">{{ table }}</span>
        </div>
      </transition>
      <div class="not-found" v-if="table < 0">
        Не го најдовме името „<strong>{{ query }}</strong>“.
        <div v-if="suggestion" class="suggest">
          Дали мислевте <a @click.prevent="applySuggestion">{{ suggestion }}</a>?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ---------- Levenshtein ----------
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

// ---------- Utils ----------
function hasCyrillic(s) { return /[\u0400-\u04FF]/.test(s || ""); }

// кирилица → латиница (МК)
// кирилица → латиница (МК)
function cyrToLatin(s) {
  const map = {
    а:'a', б:'b', в:'v', г:'g', д:'d', ѓ:'gj', е:'e', ж:'zh', з:'z', ѕ:'dz',
    и:'i', ј:'j', к:'k', л:'l', љ:'lj', м:'m', н:'n', њ:'nj', о:'o', п:'p',
    р:'r', с:'s', т:'t', ќ:'kj', у:'u', ф:'f', х:'h', ц:'c', ч:'ch',
    џ:'dzh', ш:'sh',
    А:'a', Б:'b', В:'v', Г:'g', Д:'d', Ѓ:'gj', Е:'e', Ж:'zh', З:'z', Ѕ:'dz',
    И:'i', Ј:'j', К:'k', Л:'l', Љ:'lj', М:'m', Н:'n', Њ:'nj', О:'o', П:'p',
    Р:'r', С:'s', Т:'t', Ќ:'kj', У:'u', Ф:'f', Х:'h', Ц:'c', Ч:'ch',
    Џ:'dzh', Ш:'sh'
  };
  return String(s).replace(/[\u0400-\u04FF]/g, ch => map[ch] ?? ch);
}


// латински дијакритици → диграфи
function latinDiacriticsToDigraphs(s) {
  return String(s)
      .replace(/dž/gi, 'dzh')
      .replace(/đ/gi, 'dj')
      .replace(/ž/gi, 'zh')
      .replace(/č/gi, 'ch')
      .replace(/š/gi, 'sh')
      .replace(/ǵ/gi, 'gj')
      .replace(/ḱ/gi, 'kj');
}

// нормализација за споредба (кири/лати → унифицирана латиница без дијакритици)
function normalizeName(s) {
  if (!s) return '';
  let x = String(s).trim();
  x = cyrToLatin(x);
  x = latinDiacriticsToDigraphs(x);
  x = x.toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  return x;
}

function titleCaseWords(str) {
  return str.replace(/\b\p{L}+/gu, w => w.charAt(0).toUpperCase() + w.slice(1));
}

// кирилица → латиница (Title Case)
function cyrToLatinProper(s) {
  const lower = cyrToLatin(s).toLowerCase();
  return titleCaseWords(lower);
}

// секогаш враќај латиница
function displayInSameScript(originalDisplay) {
  return cyrToLatinProper(originalDisplay);
}

// помошни за прв токен
function firstToken(str) { return (str || '').split(' ')[0] || ''; }
function firstTokenNorm(display) { return firstToken(normalizeName(display)); }

export default {
  data() {
    return {
      guests: [],                 // {key, display, name(norm), first(norm), table}
      query: "",
      table: null,
      suggestion: "",
      open: false,
      hi: -1,
      shownSuggestions: []
    };
  },
  mounted() {
    fetch("/guests.json")
        .then(res => res.json())
        .then(data => {
          this.guests = data.map((g, idx) => {
            const norm = normalizeName(g.name);
            return {
              key: idx,
              display: g.name,
              name: norm,
              first: firstToken(norm),
              table: g.table
            };
          });
        });
  },
  methods: {
    // === Autocomplete ===
    onInput() {
      clearTimeout(this._t);
      this._t = setTimeout(() => this.updateDropdown(), 80);
    },
    updateDropdown() {
      const raw = this.query || "";
      const q = normalizeName(raw);
      const qTokens = q.split(" ").filter(Boolean);
      const qFirst = qTokens[0] || "";
      const qSecond = qTokens[1] || ""; // дел од презиме

      if (qFirst.length < 2) {
        this.open = false; this.shownSuggestions = []; this.hi = -1; return;
      }

      let pool = this.guests.filter(g => g.first.startsWith(qFirst));

      if (qSecond.length >= 1) {
        pool = pool.filter(g => {
          const parts = g.name.split(" ");
          const last  = (parts[1] || "");
          return last.startsWith(qSecond);
        });
        if (pool.length === 0) {
          pool = this.guests.filter(g => {
            const [first, last = ""] = g.name.split(" ");
            return first.startsWith(qFirst) && last.includes(qSecond);
          });
        }
      }

      if (pool.length === 0) {
        pool = this.guests.filter(g => g.name.includes(qFirst));
      }

      const shown = pool.slice(0, 8).map(g => ({
        key: g.key,
        table: g.table,
        displayOriginal: g.display,
        displayForInput: displayInSameScript(g.display)
      }));

      this.shownSuggestions = shown;
      this.open = shown.length > 0;
      this.hi = this.open ? 0 : -1;
    },
    move(dir) {
      if (!this.open || !this.shownSuggestions.length) return;
      const n = this.shownSuggestions.length;
      this.hi = ( (this.hi + dir) % n + n ) % n;
    },
    enterSelect() {
      if (this.open && this.hi >= 0) {
        this.selectSuggestion(this.shownSuggestions[this.hi]);
      } else {
        this.findTable();
      }
    },
    closeDropdown() { this.open = false; this.hi = -1; },
    selectSuggestion(s) {
      this.query = s.displayForInput;
      this.closeDropdown();
      this.findTable();
    },

    // === Пребарување/наод ===
    findTable() {
      const raw = this.query;
      const qNorm = normalizeName(raw);

      let guest = this.guests.find(g => g.name === qNorm);

      if (!guest) {
        const ranked = this.guests
            .map(g => ({ ...g, dist: levenshtein(qNorm, g.name) }))
            .sort((a, b) => a.dist - b.dist);
        const best = ranked[0];

        if (best && best.dist <= 1) {
          this.table = best.table;
          this.suggestion = "";
          return;
        }

        if (best && best.dist <= 3) {
          this.table = -1;
          this.suggestion = cyrToLatinProper(best.display);
        } else {
          this.table = -1;
          this.suggestion = "";
        }
        return;
      }

      this.table = guest.table;
      this.suggestion = "";
    },
    applySuggestion() {
      this.query = this.suggestion;
      this.findTable();
    }
  }
};
</script>

<style>
:root {
  --accent: #d47a90;
  --dark: #4d3b49;
  --light: #ffffff;
  --font-heading: "Playfair Display", serif;
  --font-body: "Roboto", sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body {
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: 59%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: var(--dark);
  font-family: var(--font-body);
}
.wrapper {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}
.title { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; }
.subtitle { font-size: 1rem; margin-bottom: 1.5rem; }
.form { display: flex; flex-direction: column; gap: 0.5rem; align-items: stretch; }
.input-wrap { position: relative; }
.input {
  width: 100%;
  padding: 0.75rem; font-size: 1rem; border: 2px solid var(--accent);
  border-radius: 8px;
}
.input:focus { outline: none; border-color: var(--dark); }
.dropdown {
  position: absolute; left: 0; right: 0; top: calc(100% + 4px);
  background: #fff; border: 1px solid rgba(0,0,0,.12); border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,.12);
  list-style: none; padding: 6px; margin: 0; z-index: 20;
  max-height: 220px; overflow: auto;
}
.item {
  padding: 8px 10px; border-radius: 6px; cursor: pointer; user-select: none;
}
.item:hover, .item.active { background: rgba(212,122,144,0.12); }
.btn {
  padding: 0.75rem; font-size: 1rem; background: var(--accent); color: var(--light);
  border: none; border-radius: 8px; cursor: pointer; font-weight: 500;
  transition: background 0.3s, transform 0.2s;
}
.btn:hover { background: var(--dark); transform: translateY(-2px); }
.result { margin-top: 1rem; min-height: 4rem; }
.fade-slide-enter-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px); }
.fade-slide-enter-to { opacity: 1; transform: translateY(0); }
.number .num {
  display: block; font-size: 3rem; font-family: var(--font-heading);
  color: var(--accent); margin-top: 0.5rem;
}
.not-found { color: #b3475f; font-size: 0.95rem; }
.suggest { margin-top: 0.5rem; }
.suggest a { color: var(--accent); text-decoration: underline; cursor: pointer; }
</style>
