<template>
  <div class="page">
    <!-- FULLSCREEN background -->
    <div class="bg"></div>
    <div class="overlay"></div>

    <!-- INVITATION CARD -->
    <section class="card">
      <img src="/public/logo.svg" alt="Logo" class="logo" />

      <h1 class="title">Покана</h1>

      <p class="lead">
        Со особена чест и задоволство Ве покануваме на<br/>
        <strong>заедничка хајка на дива свиња</strong><br/>
        која ќе се одржи на <strong>11.10.2025 година</strong>.
      </p>

      <div class="details">
        <p>📍 Збирно место: <strong>Стража</strong> во 06:30 часот</p>
        <p>🍽️ После ловот: <strong>Свечен ручек</strong> во Домот, с. Церово во 12:00 часот</p>
      </div>

      <p class="footer">Со почит,<br/>Ловечко друштво „…“</p>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500&display=swap');

:root{
  --card-bg: rgba(255, 254, 249, 0.85); /* помалку транспарентно */
  --border: #3d4a33;
  --title: #2e4427;
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
}
.bg{
  position:fixed;
  inset:0;
  background:
      url('https://images.unsplash.com/photo-1694950986821-1169560546e7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
      center center / cover no-repeat;
  z-index:-2;
}
.overlay{
  position:fixed; inset:0;
  background:linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.45));
  z-index:-1;
}
.card{
  width:min(92vw, 720px);
  margin: 4dvh auto;
  padding: clamp(20px, 4vw, 44px);
  background: var(--card-bg);
  border: 3px solid var(--border);
  border-radius: 18px;
  text-align:center;
  box-shadow:0 25px 50px rgba(0,0,0,.99); /* поголем elevation */
  backdrop-filter: blur(5px);
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
  color: var(--title);
  margin:.2rem 0 1rem;
}
.lead{
  font-size: clamp(1rem, 2.6vw, 1.15rem);
  line-height:1.7;
  color:#172015;
}
.details{
  margin-top: 1.1rem;
  font-size: clamp(.95rem, 2.3vw, 1.05rem);
  color:#141414;
}
.footer{
  margin-top: 1.2rem;
  font-style: italic;
  color:#2a2a2a;
  font-size: clamp(.95rem, 2.2vw, 1rem);
}
</style>
