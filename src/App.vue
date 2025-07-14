<template>
  <div class="wrapper">
    <h1 class="title">Добредојдовте на свадбата на Anja & Nikola</h1>
    <p class="subtitle">
      Внесете го вашето име и презиме за да го најдете бројот на вашата маса
    </p>

    <div class="form">
      <input
          v-model="query"
          @keyup.enter="findTable"
          placeholder="Име и презиме"
          class="input"
          autocomplete="off"
      />
      <button @click="findTable" class="btn">Потврди</button>
    </div>

    <div class="result" v-if="table !== null">
      <!-- Animation with Vue Transition -->
      <transition name="fade-slide">
        <div class="number" v-if="table >= 0">
          Број на маса<br /><span class="num">{{ table }}</span>
        </div>
      </transition>
      <!-- Show not-found when table is negative -->
      <div class="not-found" v-if="table < 0">
        Не го најдовме името „<strong>{{ query }}</strong>".
        <div v-if="suggestion" class="suggest">
          Дали мислевте <a @click.prevent="applySuggestion">{{ suggestion }}</a>?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Прост Levenshtein алгоритам за сличност
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

export default {
  data() {
    return {
      guests: [],
      query: "",
      table: null,
      suggestion: ""
    };
  },
  mounted() {
    fetch("/guests.json")
        .then(res => res.json())
        .then(data => {
          this.guests = data.map(g => ({
            display: g.name,
            name: g.name.trim().toLowerCase(),
            table: g.table
          }));
        });
  },
  methods: {
    findTable() {
      const q = this.query.trim().toLowerCase();
      const guest = this.guests.find(g => g.name === q);
      if (guest) {
        this.table = guest.table;
        this.suggestion = "";
      } else {
        // Најди најсличен
        const distances = this.guests.map(g => ({ ...g, dist: levenshtein(q, g.name) }));
        distances.sort((a, b) => a.dist - b.dist);
        const best = distances[0];
        if (best.dist <= 3) {
          this.suggestion = best.display;
        } else {
          this.suggestion = "";
        }
        this.table = -1;
      }
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
  --bg: #fff5f8;
  --accent: #d47a90;
  --dark: #4d3b49;
  --light: #ffffff;
  --font-heading: "Playfair Display", serif;
  --font-body: "Roboto", sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--dark); font-family: var(--font-body); }
.wrapper { max-width: 360px; margin: 2rem auto; padding: 1rem; text-align: center; }
.title { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; }
.subtitle { font-size: 1rem; margin-bottom: 1.5rem; }
.form { display: flex; flex-direction: column; }
.input { padding: 0.75rem; font-size: 1rem; border: 2px solid var(--accent); border-radius: 8px; margin-bottom: 0.5rem; }
.input:focus { outline: none; border-color: var(--dark); }
.btn { padding: 0.75rem; font-size: 1rem; background: var(--accent); color: var(--light); border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background 0.3s, transform 0.2s; }
.btn:hover { background: var(--dark); transform: translateY(-2px); }
.result { margin-top: 2rem; min-height: 4rem; position: relative; }
.fade-slide-enter-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px); }
.fade-slide-enter-to { opacity: 1; transform: translateY(0); }
.number .num { display: block; font-size: 3rem; font-family: var(--font-heading); color: var(--accent); margin-top: 0.5rem; }
.not-found { color: #b3475f; font-size: 0.95rem; }
.suggest { margin-top: 0.5rem; }
.suggest a { color: var(--accent); text-decoration: underline; cursor: pointer; }
</style>
