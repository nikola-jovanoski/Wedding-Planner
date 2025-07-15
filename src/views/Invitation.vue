<template>
  <div class="invitation-page">
    <!-- Show envelope first -->
    <Envelope v-if="!opened" @open="handleOpen" />
    <!-- Then show card with animation -->
    <transition name="fade-slide">
      <InvitationCard v-if="opened" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Envelope from '../components/Envelope.vue'
import InvitationCard from '../components/InvitationCard.vue'

const opened = ref(false)
function handleOpen() {
  opened.value = true
}
</script>

<style scoped>
.invitation-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  background: transparent;
}

.fade-slide-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>