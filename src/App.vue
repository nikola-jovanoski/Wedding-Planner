<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Нема дополнителна логика овде – само вчита router-view
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
</style>
