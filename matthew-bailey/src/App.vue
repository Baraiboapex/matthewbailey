<script setup>
    import { RouterView } from 'vue-router';
    import NavBar from "./layouts/NavBar/NavBar.vue";
    import ParticleBackground from './layouts/Backgrounds/ParticleBackground.vue';
    import { BG_PARTICLES_CONFIG } from './layouts/Backgrounds/particleConfig';
</script>
<template>
  <div id="app" class="container-fluid p-0">
    <ParticleBackground :particles-config="BG_PARTICLES_CONFIG">
      <div class="container p-0">
        <NavBar/>
        <RouterView/>
      </div>
    </ParticleBackground>
  </div>
</template>