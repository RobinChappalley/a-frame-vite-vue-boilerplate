<template>
  <a-scene 
    @loaded="$emit('loaded')"
    background="color: black"
    bloom="strength: 0.6; radius: 0.5; threshold: 0.6"
    cursor="rayOrigin: mouse"
    raycaster="objects: [clickable]"
  >
    <!-- ENVIRONNEMENT & LUMIERE -->
    <a-entity environment="preset: volcano; groundColor: #440000; dressingAmount: 10; skyType: atmosphere; lighting: point"></a-entity>
    
    <TheCameraRig />

    <TheScoreBoard position="-2 2 -3" rotation="0 45 0" />  

    <TheScoreBoard position="2 2 -3" rotation="0 -45 0" />  

    <!-- MENU DE DÉPART -->
    <TheGameMenu v-if="!store.isPlaying" position="0 1.5 -1.2" />

    <!-- ZONE DE JEU -->

    <a-ring position="0 0.1 0" rotation="-90 0 0" radius-inner="0.8" radius-outer="1" color="#ff8800" material="emissive: #ff4400"></a-ring>

    <TheRockSpawner />

  </a-scene>
</template>

<script setup>
import { store } from '../store.js';
import TheCameraRig from './TheCameraRig.vue';
import TheRockSpawner from './TheRockSpawner.vue';
import TheScoreBoard from './TheScoreBoard.vue';
import TheGameMenu from './TheGameMenu.vue';
</script>


