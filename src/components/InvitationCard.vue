<template>
  <div class="invitation">
    <div class="header">
      <img src="/background.jpg" alt="Ваша слика" />
      <div class="overlay"></div>
      <div class="text">
        <h1>{{ bride }} & {{ groom }}</h1>
        <p>Со голема радост ве покануваме</p>
        <p><strong>{{ date }}</strong></p>
        <p>Ресторан „Сајгија“, Гостивар</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const bride = 'Ања'
const groom = 'Никола'
const date  = '20.09.2025'
</script>

<style scoped>
.invitation {
  width: 85vw;
  max-width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}
.header {
  position: relative;
  height: 200px;
}
.header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.4);
}
.text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #333;
}
.text h1 {
  margin: 0;
  font-size: 1.6rem;
}
</style>