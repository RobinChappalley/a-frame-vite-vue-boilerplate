<template>
  <a-entity v-bind="$attrs"
  rotation="0 45 0"
  >
    <!-- FOND DU PANNEAU -->
    <a-plane  
      width="1.8" 
      height="0.4" 
      color="#222" 
      material="shader: flat; opacity: 0.9"
    >
    <a-entity position="0 0 0.01">
      <!-- AFFICHE LE SCORE -->
      <a-text 
        :value="`SCORE: ${store.score}`" 
        position="0 0 0" 
        color="#FFD700"
        align="center"
        scale="1.2 1.2 1.2"
        font="exo2bold"
      ></a-text>
    </a-entity>
    </a-plane>
    
   

    <!-- ÉLÉMENTS DE TEXTE -->
   
      <!-- AFFICHE LES VIES (Cœurs visuels) -->
      <a-entity position="0 -1 0">
        <a-entity 
          v-for="i in 3" 
          :key="i"
          :position="`${(i - 2) * 0.85} 0 0`"
          scale="0.01 0.01 0.01"
          gltf-model="#heart-model"
          :material="store.lives < i ? 'opacity: 0.3; transparent: true' : ''"
          :visible="store.lives >= i"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear"
        >
          <!-- Optionnel: Un petit socle ou un coeur "vide" en dessous si on veut voir l'emplacement -->
          <a-entity 
            v-if="store.lives < i"
            geometry="primitive: torus; radius: 8; radiusTubular: 1"
            material="color: #333; opacity: 0.5"
            rotation="90 0 0"
          ></a-entity>
        </a-entity>

        <!-- Coeurs pleins avec animation si on veut les différencier plus -->
        <a-entity 
          v-for="i in 3" 
          :key="'bg-' + i"
          :position="`${(i - 2) * 0.35} 0 0`"
          scale="0.008 0.008 0.008"
          geometry="primitive: sphere"
          :material="`color: #222; opacity: ${store.lives < i ? 0.2 : 0}; transparent: true`"
        ></a-entity>
      </a-entity>

      <!-- MESSAGE GAME OVER -->
      <a-entity v-if="store.isGameOver" position="0 -0.35 0">
        <a-text 
          value="GAME OVER" 
          color="red" 
          align="center" 
          width="4"
          scale="1.5 1.5 1.5"
        ></a-text>
      </a-entity>
    </a-entity>
</template>


<script setup>
import { store } from '../store.js';
</script>
