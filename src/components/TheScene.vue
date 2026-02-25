<template>
  <a-scene 
    @loaded="$emit('loaded')"
    background="color: black"
    bloom="strength: 0.6; radius: 0.5; threshold: 0.6"
  >
    <!-- ENVIRONNEMENT & LUMIERE -->
    <a-entity environment="preset: volcano; groundColor: #440000; dressingAmount: 10; skyType: atmosphere; lighting: point"></a-entity>
    <a-entity light="type: ambient; color: #ff4400; intensity: 0.5"></a-entity>
    <TheCameraRig />

    <TheScoreBoard position="-2 2 -3" rotation="0 45 0" />  

    <TheScoreBoard position="2 2 -3" rotation="0 -45 0" />  

    <!-- ZONE DE JEU -->
    <a-ring position="0 0.1 0" rotation="-90 0 0" radius-inner="0.8" radius-outer="1" color="#ff8800" material="emissive: #ff4400"></a-ring>

    <TheRockSpawner />

  </a-scene>
</template>

<script setup>
import TheCameraRig from './TheCameraRig.vue';
import TheRockSpawner from './TheRockSpawner.vue';
import TheScoreBoard from './TheScoreBoard.vue';
</script>


