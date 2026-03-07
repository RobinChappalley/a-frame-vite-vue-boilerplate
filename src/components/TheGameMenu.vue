<template>
  <a-entity v-bind="$attrs">
    <a-entity v-if="!store.isPlaying">

      <!-- FOND HOLOGRAPHIQUE (Apparaît au GAME OVER) -->
      <!-- Bordure lumineuse pour nouveau record -->
      <a-plane v-if="store.isGameOver && store.score > 0 && store.score === store.bestScore" width="3.3" height="2.3"
        position="0 0.5 -0.11" color="#ffaa00" material="shader: flat; transparent: true; opacity: 0.8"
        animation="property: components.material.material.opacity; from: 0.1; to: 0.9; dir: alternate; loop: true; dur: 2000"></a-plane>

      <a-plane v-if="store.isGameOver" width="3.2" height="2.2" position="0 0.5 -0.1" color="#111"
        material="shader: flat; opacity: 0.85; transparent: true"></a-plane>
      <a-entity>
        <!-- TITRE DU MENU -->
        <a-text :value="store.isGameOver ? 'GAME OVER' : 'SMASH LAB'" :color="store.isGameOver ? '#ff3333' : '#ffffff'"
          position="0 1.2 0" align="center" width="4" scale="1.5 1.5 1.5" font="exo2bold"></a-text>

        <!-- STATISTIQUES (Seulement au Game Over) -->
        <a-entity v-if="store.isGameOver" position="0 0.7 0">
          <a-text :value="`Score: ${store.score}`" position="0 0.35 0" align="center" color="#FFD700" width="3"
            scale="1.2 1.2 1.2"></a-text>

          <a-text :value="`Coins found: ${store.sessionCoins}`" position="0 0.15 0" align="center" color="#CCC"
            width="2.5" scale="1.1 1.1 1.1"></a-text>

          <a-text v-if="store.bestCombo > 0"
            :value="`Streak Bonus: +${Math.round(store.sessionCoins * (store.bestCombo / 100))}`" position="0 0 0"
            align="center" color="#FF8800" width="2.5" scale="1.1 1.1 1.1"></a-text>

          <a-text :value="`Total Coins: ${store.coins}`" position="0 -0.2 0" align="center" color="#00FFDD" width="2.8"
            scale="1.2 1.2 1.2"></a-text>

          <!-- NOUVEAU RECORD -->
          <a-text v-if="store.score > 0 && store.score === store.bestScore" value="NEW RECORD !" position="0 -0.5 0"
            scale="1.5 1.5 1.5" align="center" color="#ffaa00" width="2.5"
            animation="property: opacity; from: 1; to: 0.2; dir: alternate; loop: true; dur: 2000"></a-text>
          <a-text v-else-if="store.bestScore > 0" :value="`Best Score: ${store.bestScore}`" position="0 -0.5 0"
            align="center" color="#888" width="2.5"></a-text>
        </a-entity>
      </a-entity>

      <!-- INSTRUCTION DE DÉMARRAGE -->
      <a-text v-if="!store.isGameOver" value="Hit rocks to survive !" position="0 0.6 0" align="center" width="2"
        color="#CCC"></a-text>

      <!-- BOUTON D'ACTION (START / RESTART) -->
      <a-box id="start-button" width="1.2" height="0.3" depth="0.1" :color="store.isGameOver ? '#662222' : '#444'"
        position="0 0.1 0" clickable @click="store.startGame()" class="button"
        :animation__mouseenter="`property: components.material.material.color; type: color; to: ${store.isGameOver ? '#ff4444' : '#666'}; startEvents: mouseenter; dur: 200`"
        :animation__mouseleave="`property: components.material.material.color; type: color; to: ${store.isGameOver ? '#662222' : '#444'}; startEvents: mouseleave; dur: 200`"
        :animation__click="`property: position; from: 0 0.1 0; to: 0 0.1 -0.05; startEvents: click; dur: 100; dir: alternate; loop: 1`">
        <a-text :value="store.isGameOver ? 'RESTART' : 'START'" align="center" position="0 0 0.06" width="3"
          color="white" font="exo2bold"></a-text>
      </a-box>

      <!-- BOUTON RETOUR HUB (CHANGE WORLD) -->
      <a-box id="hub-button" width="1.2" height="0.3" depth="0.1" color="#224466" position="0 -0.3 0" clickable
        @click="store.isSelectingWorld = true; store.isGameOver = false" class="button"
        animation__mouseenter="property: components.material.material.color; type: color; to: #446688; startEvents: mouseenter; dur: 200"
        animation__mouseleave="property: components.material.material.color; type: color; to: #224466; startEvents: mouseleave; dur: 200"
        animation__click="property: position; from: 0 -0.3 0; to: 0 -0.3 -0.05; startEvents: click; dur: 100; dir: alternate; loop: 1">
        <a-text value="CHANGE WORLD" align="center" position="0 0 0.06" width="2.5" color="white"
          font="exo2bold"></a-text>
      </a-box>

    </a-entity>
  </a-entity>
</template>

<script setup>
import { store } from '../store.js';
</script>

<style scoped>
.button {
  cursor: pointer;
}
</style>
