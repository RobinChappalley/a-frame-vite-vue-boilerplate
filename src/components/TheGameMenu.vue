<template>
  <a-entity v-bind="$attrs">
    <!-- CADRE DU BOUTON -->
    <a-box
      id="start-button"
      width="0.8"
      height="0.3"
      depth="0.1"
      color="#444"
      clickable
      @click="store.startGame()"
      class="button"
      :animation__mouseenter="`property: components.material.material.color; type: color; to: #666; startEvents: mouseenter; dur: 200`"
      :animation__mouseleave="`property: components.material.material.color; type: color; to: #444; startEvents: mouseleave; dur: 200`"
      :animation__click="`property: position; from: 0 0 0; to: 0 0 -0.05; startEvents: click; dur: 100; dir: alternate; loop: 1`"
    >
      <a-text
        :value="store.isGameOver ? 'RESTART' : 'START'"
        align="center"
        position="0 0 0.06"
        width="2"
        color="white"
      ></a-text>
    </a-box>

    <!-- INSTRUCTION (uniquement au début) -->
    <a-text
      v-if="!store.isGameOver"
      value="Poussez les roches avec vos gants !"
      position="0 0.3 0"
      align="center"
      width="2"
      color="#CCC"
    ></a-text>
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
