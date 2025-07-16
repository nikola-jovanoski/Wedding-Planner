<template>
  <div class="invitation" id="invitation-card">
    <!-- Header text -->
    <div style="font-family:'Alex Brush',cursive; font-size:2.5rem; color:#8B0000;"> Anja &amp; Nikola </div>    <p class="invite-text">
      Со голема радост ве покануваме<br/>
      да бидете дел од нашата свадбена веселба и да ја споделите со нас нашата свадбена приказна
    </p>
    <p class="date">20.09.2025</p>
    <p class="venue">Ресторан „Сајгија“, Гостивар</p>

    <!-- Timeline using custom icons from public/icons/1.png, 2.png, ... -->
    <div class="timeline">
      <div
          v-for="(step, i) in steps"
          :key="i"
          class="timeline-step"
      >
        <img :src="step.iconUrl" class="icon" :alt="step.label" />
        <div class="info">
          <div class="time">{{ step.time }}</div>
          <div class="label">{{ step.label }}</div>
        </div>
      </div>
    </div>

    <!-- Families at bottom -->
    <div class="families">
      <div>Семејство Стефановски</div>
      <div>Семејство Јованоски</div>
    </div>

    <!-- RSVP request -->
    <p class="rsvp">*Ве молиме потврдете го вашето присуство најдоцна до 25ти Август</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Place your custom icon PNGs in public/icons named 1.png, 2.png, etc.
const steps = reactive([
  { time: '08:30', label: 'Забава кај младоженецот',     iconUrl: '/1.png' },
  { time: '11:30', label: 'По невестата',                iconUrl: '/2.png' },
  { time: '13:30', label: 'Венчавка во црква “Св. Никола”', iconUrl: '/3.png' },
  { time: '18:00', label: 'Склучување на брак',          iconUrl: '/4.png' },
  { time: '18:45', label: 'Прием на гости',              iconUrl: '/5.png' },
  { time: '20:00', label: 'Прв танц',                    iconUrl: '/6.png' }
])

</script>

<style scoped>
/* Import a single elegant script font for the entire card */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

/* Container styling */
.invitation {
  background: rgba(235,231,215,0.6);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  padding: 24px;
  max-width: 360px;
  margin: auto;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  font-family: 'Great Vibes', cursive;
  color: #333;
  text-align: center;
}
.names {
  font-family: 'Alex Brush', cursive;
  font-size: 2.8rem;
  color: #8B0000;
  margin-bottom: 12px;
}
.invite-text {
  font-size: 1.3rem;
  line-height: 1.4;
  margin-bottom: 16px;
}
.date,
.venue {
  font-size: 1.3rem;
  margin-bottom: 8px;
}
.venue {
  margin-bottom: 24px;
}

/* Timeline styling */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 24px;
}
.timeline-step {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 1rem;
  position: relative;
}
.icon {
  width: 48px;
  height: 48px;
}
.info .time {
  font-weight: 500;
  font-size: 1.3rem;
}
.info .label {
  font-size: 1.3rem;
  color: #555;
}

/* Families at bottom */
.families {
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  margin-top: 12px;
}
.families > div {
  width: 45%;
  text-align: center;
}

/* RSVP text */
.rsvp {
  font-size: 1rem;
  font-style: italic;
  margin-top: 16px;
  color: #d47a90;
}
</style>