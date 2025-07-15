<template>
  <div class="invitation" id="invitation-card">
    <!-- Header text -->
    <h1 class="names">Никола и Ања</h1>
    <p class="invite-text">
      Со голема радост ве покануваме<br/>
      да бидете дел од нашата свадбена приказна
    </p>
    <p class="date">20.09.2025</p>
    <p class="venue">Ресторан „Сајгија“, Гостивар</p>

    <!-- Timeline map with icons -->
    <div class="timeline">
      <div
          v-for="(step, i) in steps"
          :key="i"
          class="timeline-step"
          :data-aos="step.animation"
          :data-aos-delay="i * 200"
      >
        <font-awesome-icon :icon="step.icon" class="icon" />
        <div class="info">
          <div class="time">{{ step.time }}</div>
          <div class="label">{{ step.label }}</div>
        </div>
      </div>
    </div>

    <!-- Families at bottom -->
    <div class="families">
      <div>Семејство Јованоски</div>
      <div>Семејство Стефановски</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const steps = reactive([
  { time: '08:30', label: 'Забава кај младоженецот',             icon: ['fas', 'glass-cheers'], animation: 'fade-right' },
  { time: '11:30', label: 'По невестата',                       icon: ['fas', 'car-side'],       animation: 'fade-left' },
  { time: '13:30', label: 'Венчавка во црква “Св. Никола”',     icon: ['fas', 'church'],         animation: 'fade-right' },
  { time: '18:00', label: 'Склучување на брак',                 icon: ['fas', 'ring'],           animation: 'fade-left' },
  { time: '18:45', label: 'Прием на гости',                     icon: ['fas', 'glass-cheers'],   animation: 'fade-right' },
  { time: '20:00', label: 'Прв танц',                           icon: ['fas', 'music'],          animation: 'fade-left' }
])

onMounted(() => {
  AOS.init({
    once: true,      // animate only once
    duration: 600,   // animation duration in ms
    offset: 100      // trigger offset
  })
})
</script>

<style scoped>
.invitation {
  background: rgba(235, 231, 215, 0.6);
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

.date,
.venue {
  font-size: 1rem;
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

.timeline-step::before {
  content: '';
  position: absolute;
  top: -2rem;
  left: 24px;
  width: 2px;
  height: calc(100% + 2rem);
  background: #ddd;
  z-index: -1;
}

.timeline-step:first-child::before {
  top: 50%;
  height: calc(100% - 50%);
}

.timeline-step:last-child::before {
  height: 50%;
}

.icon {
  font-size: 1.8rem;
  color: #a33;
}

.info .time {
  font-weight: 500;
  font-size: 1rem;
}

.info .label {
  font-size: 0.9rem;
  color: #555;
}

/* Families at bottom */
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
