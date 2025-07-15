<template>
  <div class="invitation">
    <h1 class="names">Никола и Ања</h1>
    <p class="invite-text">
      Со голема радост ве покануваме<br />
      да бидете дел од нашата свадбена приказна
    </p>
    <p class="date">20.09.2025</p>
    <p class="venue">Ресторан „Сајгија“, Гостивар</p>

    <div class="times">
      <div class="time-block">
        <span class="label">Венчавка</span>
        <span class="time">18:00</span>
      </div>
      <div class="separator"></div>
      <div class="time-block">
        <span class="label">Прием на гости</span>
        <span class="time">18:45</span>
      </div>
    </div>

    <div class="families">
      <div>Семејство Јованоски</div>
      <div>Семејство Стефановски</div>
    </div>
  </div>
</template>

<script setup>
// Static text invite, no props needed
</script>

<style scoped>
.invitation {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  padding: 24px;
  max-width: 360px;
  margin: auto;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  font-family: 'Playfair Display', serif;
  color: #333;
  text-align: center;
}
.names {
  font-size: 1.8rem;
  margin-bottom: 12px;
}
.invite-text {
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 16px;
}
.date, .venue {
  font-size: 1rem;
  margin-bottom: 8px;
}
.venue {
  margin-bottom: 24px;
}
.times {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.label {
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.time {
  font-size: 1rem;
  font-weight: 500;
}
.separator {
  width: 1px;
  height: 40px;
  background: #ccc;
  margin: 0 24px;
}
.families {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.families > div {
  width: 45%;
  text-align: center;
  font-style: italic;
}
</style>
