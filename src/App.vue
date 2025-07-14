<template>
  <div class="container">
    <h1>Добредојдовте на свадбата на Anja и Nikola!</h1>
    <p>Внесете го вашето име и презиме за да го најдете бројот на вашата маса:</p>

    <input
        v-model="query"
        @keyup.enter="findTable"
        placeholder="Име и презиме"
    />
    <button @click="findTable">Потврди</button>

    <div class="result" v-if="table !== null">
      <span v-if="table >= 0">
        Вие сте на маса бр. {{ table }}
      </span>
      <span v-else>
        Не е пронајдено име „{{ query }}“. Проверете правопис.
      </span>
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
.container {
  max-width: 400px;
  margin: 2rem auto;
  font-family: sans-serif;
}
input,
button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
}
.result {
  margin-top: 1rem;
  font-weight: bold;
}
</style>
