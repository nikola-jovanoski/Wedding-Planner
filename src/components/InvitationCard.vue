<template>
  <div class="invitation" id="invitation-card">
    <!-- Header text -->
    <div class="names">Ања &amp; Никола</div>
    <p class="invite-text">
      Со голема радост ве покануваме<br/>
      да бидете дел од нашата свадбена веселба и да ја споделите со нас нашата свадбена приказна
    </p>
    <p class="date">20.09.2025</p>
    <p class="venue">Ресторан „Сајгија“, Гостивар</p>

    <!-- Timeline using custom icons -->
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
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Alex+Brush&display=swap');

.invitation {
  background: rgba(235,231,215,0.6);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  padding: 20px;           /* slightly increased from 16px */
  max-width: 360px;
  margin: auto;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  font-family: 'Great Vibes', cursive;
  color: #333;
  text-align: center;
}
.names {
  font-family: 'Alex Brush', cursive;
  font-size: 2.6rem;       /* slight bump from 2.4 to retain prominence */
  color: #8B0000;
  margin-bottom: 10px;     /* mild spacing */
}
.invite-text {
  font-size: 1.2rem;       /* between 1.1 and 1.3 */
  line-height: 1.35;
  margin-bottom: 14px;
}
.date,
.venue {
  font-size: 1.2rem;
  margin-bottom: 7px;
}
.venue {
  margin-bottom: 18px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;             /* moderate gap */
  margin-bottom: 18px;
}
.timeline-step {
  display: grid;
  grid-template-columns: 44px 1fr;  /* icon slightly smaller */
  align-items: center;
  gap: 0.85rem;
}
.icon {
  width: 44px;
  height: 44px;
}
.info .time {
  font-weight: 500;
  font-size: 1.2rem;
}
.info .label {
  font-size: 1.2rem;
  color: #555;
}

.families {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-top: 10px;
}
.families > div {
  width: 45%;
  text-align: center;
}

.rsvp {
  font-size: 0.95rem;       /* tiny reduction */
  font-style: italic;
  margin-top: 14px;
  color: #d47a90;
}
</style>