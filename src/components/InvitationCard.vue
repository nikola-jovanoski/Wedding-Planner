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

    <!-- Timeline with appear animation on load -->
    <transition-group name="fade-slide" tag="div" class="timeline" appear>
      <div
          v-for="(step, i) in steps"
          :key="i"
          class="timeline-step"
          :style="{ transitionDelay: `${i * 150}ms` }"
      >
        <font-awesome-icon :icon="step.icon" class="icon" />
        <div class="info">
          <div class="time">{{ step.time }}</div>
          <div class="label">{{ step.label }}</div>
        </div>
      </div>
    </transition-group>

    <!-- Families at bottom -->
    <div class="families">
      <div>Семејство Јованоски</div>
      <div>Семејство Стефановски</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const steps = reactive([
  { time: '08:30', label: 'Забава кај младоженецот',     icon: ['fas','champagne-glasses'] },
  { time: '11:30', label: 'По невестата',                icon: ['fas','car-side']         },
  { time: '13:30', label: 'Венчавка во црква “Св. Никола”', icon: ['fas','church']           },
  { time: '18:00', label: 'Склучување на брак',          icon: ['fas','ring']             },
  { time: '18:45', label: 'Прием на гости',              icon: ['fas','glass-cheers']     },
  { time: '20:00', label: 'Прв танц',                    icon: ['fas','music']   }
])
</script>

<style scoped>
/* Container styling */
.invitation {
  background: rgba(235,231,215,0.6);
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
.names { font-size: 1.8rem; margin-bottom: 12px; }
.invite-text { font-style: italic; font-size: 0.95rem; line-height:1.4; margin-bottom:16px; }
.date, .venue { font-size: 1rem; margin-bottom:8px; }
.venue { margin-bottom:24px; }

/* Fade-slide appear and enter animation */
.fade-slide-enter-active,
.fade-slide-appear-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter-from,
.fade-slide-appear-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to,
.fade-slide-appear-to {
  opacity: 1;
  transform: translateY(0);
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
.icon { font-size: 1.8rem; color: #a33; }
.info .time { font-weight:500; font-size:1rem; }
.info .label { font-size:0.9rem; color:#555; }

/* Families at bottom */
.families {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.families > div { width: 45%; text-align:center; font-style:italic; }
</style>