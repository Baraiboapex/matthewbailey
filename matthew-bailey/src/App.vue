<script setup>
    import { RouterView } from 'vue-router';
    import NavBar from "./layouts/NavBar/NavBar.vue";
    import ParticleBackground from './layouts/Backgrounds/ParticleBackground.vue';
    import { BG_PARTICLES_CONFIG } from './layouts/Backgrounds/particleConfig';
</script>
<template>
  <div class="container-fluid p-0">
    <ParticleBackground :particles-config="BG_PARTICLES_CONFIG">
      <NavBar/>
      <RouterView/>
    </ParticleBackground>
  </div>
</template>