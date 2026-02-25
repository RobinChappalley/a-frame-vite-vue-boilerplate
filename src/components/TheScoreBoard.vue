<template>
  <a-entity v-bind="$atrs"
  rotation="0 45 0"
  >
    <!-- FOND DU PANNEAU -->
    <a-plane  
      width="1.8" 
      height="1" 
      color="#222" 
      material="shader: flat; opacity: 0.9"
    ></a-plane>
    
    <!-- BORDURE -->
    <a-entity 
      geometry="primitive: box; width: 1.85; height: 1.05; depth: 0.05" 
      material="color: #444"
      position="0 0 -0.05"
    ></a-entity>

    <!-- ÉLÉMENTS DE TEXTE -->
    <a-entity position="0 0 0.01">
      <!-- AFFICHE LE SCORE -->
      <a-text 
        :value="`SCORE: ${store.score}`" 
        position="0 0.25 0" 
        color="#FFD700"
        align="center"
        scale="1.2 1.2 1.2"
        font="exo2bold"
      ></a-text>

      <!-- AFFICHE LES VIES (Cœurs) -->
      <a-text 
        :value="livesText" 
        position="0 0 0" 
        color="#FF0000"
        align="center"
        scale="1.5 1.5 1.5"
      ></a-text>

      <!-- MESSAGE GAME OVER -->
      <a-entity v-if="store.isGameOver" position="0 -0.25 0">
        <a-text 
          value="GAME OVER" 
          color="red" 
          align="center" 
          width="4"
          scale="1.5 1.5 1.5"
        ></a-text>
      </a-entity>
    </a-entity>
  </a-entity>
</template>


<script setup>
import { computed } from 'vue';
import { store } from '../store.js';
console.log(store);

// Petit helper pour transformer le nombre 3 en "♥♥♥"
const livesText = computed(() => {
  return '♥'.repeat(store.lives); // Exemple: "♥♥♥"
});
</script>
