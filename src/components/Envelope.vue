<template>
  <div class="envelope" @click="$emit('open')">
    <img src="/envelope.png" alt="Envelope" class="envelope-image" />
  </div>
</template>

<script setup>
// Static envelope with overlay text. Ensure envelope.png is in /public.
</script>

<style scoped>
.envelope {
  position: relative;
  cursor: pointer;
  width: 280px;
  max-width: 90vw;
}
.envelope-image {
  width: 100%;
  display: block;
}
.envelope-text {
  position: absolute;
  bottom: 16%; /* adjust to match red rectangle area */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: #333;
  line-height: 1.2;
}
</style>