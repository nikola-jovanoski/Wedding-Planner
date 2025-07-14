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
      />
      <button @click="findTable" class="btn">Потврди</button>
    </div>

    <div class="result" v-if="table !== null">
      <div
          class="number"
          :class="{ show: table >= 0 }"
          v-if="table >= 0"
      >
        Број на маса<br /><span class="num">{{ table }}</span>
      </div>
      <div class="not-found" v-else>
        Не го најдовме името „<strong>{{ query }}</strong>“. Пробај повторно.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guests: [],
      query: "",
      table: null,
    };
  },
  mounted() {
    fetch("/guests.json")
        .then((r) => r.json())
        .then((data) => {
          this.guests = data.map((g) => ({
            name: g.name.trim().toLowerCase(),
            table: g.table,
          }));
        });
  },
  methods: {
    findTable() {
      const q = this.query.trim().toLowerCase();
      const guest = this.guests.find((g) => g.name === q);
      this.table = guest ? guest.table : -1;
    },
  },
};
</script>

<style>
/* Theme colors */
:root {
  --bg: #fff5f8;
  --accent: #d47a90;       /* rose */
  --dark: #4d3b49;         /* deep plum */
  --light: #ffffff;
  --font-heading: "Playfair Display", serif;
  --font-body: "Roboto", sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--dark);
  font-family: var(--font-body);
}

.wrapper {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.title {
  font-family: var(--font-heading);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--dark);
}

.form {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid var(--accent);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: var(--dark);
}

.btn {
  padding: 0.75rem;
  font-size: 1rem;
  background: var(--accent);
  color: var(--light);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
}

.btn:hover {
  background: var(--dark);
  transform: translateY(-2px);
}

.result {
  margin-top: 2rem;
  min-height: 4rem;
  position: relative;
}

/* Анимација: fade-in + slide-up */
.number {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.number.show {
  opacity: 1;
  transform: translateY(0);
}

.number .num {
  display: block;
  font-size: 3rem;
  font-family: var(--font-heading);
  color: var(--accent);
  margin-top: 0.5rem;
}

.not-found {
  color: #b3475f;
  font-size: 0.95rem;
}
</style>
