<template>
  <div class="page">
    <div class="bg"></div>

    <section class="card">
      <img src="/logo.svg" alt="Logo" class="logo" />

      <h1 class="title">Покана</h1>

      <p class="lead">
        Со особена чест и задоволство ве покануваме на<br/>
        <strong>заедничка хајка на дива свиња</strong><br/>
        која ќе се одржи на <strong>11.10.2025 година</strong>.
      </p>

      <div class="details">
        <p>📍 Збирно место: <strong>Стража</strong> во 06:30 часот</p>
        <p>🍽️ После ловот: <strong>Свечен ручек</strong> во Домот, с. Церово во 12:00 часот</p>
      </div>

      <p class="footer">Со почит,<br/>Ловно друштво „БИСТРА“</p>
      <p class="footer">Добар поглед и мирна рака</p>
    </section>

    <!-- 🎶 Аудио -->
    <audio
        id="bg-music"
        src="/audio/lovnamuzika.mp3"
        preload="auto"
        loop
        playsinline
    ></audio>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let started = false

const tryPlay = () => {
  if (started) return
  const el = document.getElementById('bg-music')
  if (!el) return
  el.volume = 0.6
  el.play().then(() => {
    started = true
    removeGestureListeners()
  }).catch(err => {
    console.warn('Autoplay blocked:', err)
  })
}

const addGestureListeners = () => {
  // ќе пушти на scroll, click или touch
  ['scroll', 'pointerdown', 'touchstart', 'click'].forEach(evt =>
      window.addEventListener(evt, tryPlay, { passive: true })
  )
}

const removeGestureListeners = () => {
  ['scroll', 'pointerdown', 'touchstart', 'click'].forEach(evt =>
      window.removeEventListener(evt, tryPlay)
  )
}

onMounted(() => {
  tryPlay() // прв обид
  addGestureListeners()
})
onBeforeUnmount(removeGestureListeners)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500&display=swap');

:root{
  --card-bg: rgba(255, 254, 249, 0.82); /* останува исто */
  --border: #3d4a33;
  --title: #000; /* црн наслов */

  --page-gutter: clamp(14px, 5vw, 32px);
  --card-max: 720px;
  --card-radius: 20px;
}

.page{
  position:relative;
  min-height:100dvh;
  width:100%;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  padding-inline: calc(var(--page-gutter) + env(safe-area-inset-left));
  padding-block: clamp(14px, 4vh, 40px);
}

.bg{
  position:fixed;
  inset:0;
  background-image:
      linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.45)),
      url('/pozadina.jpg');
  background-position: center center, center center;
  background-size: cover, cover;
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index:-2;
  transform: translateZ(0);
}

.card{
  width: min(var(--card-max), 100%);
  border: 3px solid var(--border);
  border-radius: var(--card-radius);
  text-align:center;
  padding: clamp(18px, 4vw, 44px);
  box-shadow: 0 18px 42px rgba(0,0,0,.45);
  background: var(--card-bg);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-clip: padding-box;
  transform: translateZ(0);
}

.logo{
  width:90px; height:auto;
  margin:0 auto 10px;
  object-fit:contain;
}

.title{
  font-family:'Playfair Display', serif;
  font-weight:700;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  color: var(--title); /* црн */
  margin:.2rem 0 1rem;
}

.lead{
  font-size: clamp(1rem, 2.6vw, 1.15rem);
  line-height:1.7;
  color:#000; /* црн */
}

.details{
  margin-top: 1.1rem;
  font-size: clamp(.95rem, 2.3vw, 1.05rem);
  color:#000; /* црн */
}

.footer{
  margin-top: 1.2rem;
  font-style: italic;
  color:#000; /* црн */
  font-size: clamp(.95rem, 2.2vw, 1rem);
}
</style>
