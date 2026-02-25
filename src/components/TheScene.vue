<template>
  <a-scene 
    background="color: black"
    bloom="strength: 0.6; radius: 0.5; threshold: 0.6"
  >
    <!-- ENVIRONNEMENT & LUMIERE -->
    <a-entity environment="preset: volcano; groundColor: #440000; dressingAmount: 10; skyType: atmosphere; lighting: point"></a-entity>
    <a-entity light="type: ambient; color: #ff4400; intensity: 0.5"></a-entity>

    <!-- MAINS VR -->
    <a-entity id="left-hand" hand-controls="hand: left; handModelStyle: lowPoly; color: #ffcccc">
      <a-sphere radius="0.08" color="#ff0000" material="roughness: 0.2; emissive: #ff2200; emissiveIntensity: 0.8"></a-sphere>
    </a-entity>
    <a-entity id="right-hand" hand-controls="hand: right; handModelStyle: lowPoly; color: #ffcccc">
      <a-sphere radius="0.08" color="#ff0000" material="roughness: 0.2; emissive: #ff2200; emissiveIntensity: 0.8"></a-sphere>
    </a-entity>

    <!-- ZONE DE JEU -->
    <a-ring position="0 0.1 0" rotation="-90 0 0" radius-inner="0.8" radius-outer="1" color="#ff8800" material="emissive: #ff4400"></a-ring>

    <TheRockSpawner />

  </a-scene>
</template>

<script setup>
import TheRockSpawner from './TheRockSpawner.vue';
</script>

