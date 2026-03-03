<template>
  <a-scene @loaded="$emit('loaded')" background="color: black" bloom="strength: 0.2; radius: 0.5; threshold: 0.6">


    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="heart-model" src="assets/love_low_poly.glb"></a-asset-item>
      <audio id="hit-sound" src="assets/hit.mp3"></audio>
      <audio id="boost-sound" src="assets/boost.mp3"></audio>
      <audio id="bg-music" src="assets/music.mp3" loop="true" preload="auto"></audio>
      <audio id="loss-1" src="assets/life-loss/1-life-loss.mp3" preload="auto"></audio>
      <audio id="loss-2" src="assets/life-loss/2-life-loss.mp3" preload="auto"></audio>
      <audio id="loss-3" src="assets/life-loss/3-life-loss.mp3" preload="auto"></audio>
      <audio id="new-life" src="assets/new-life.mp3" preload="auto"></audio>
      <audio id="full-life" src="assets/full-life.mp3" preload="auto"></audio>
    </a-assets>


    <template v-if="allAssetsLoaded">


      <!-- ENVIRONNEMENT & LUMIERE -->
      <a-entity
        environment="preset: volcano; groundColor: #440000; dressingAmount: 10; skyType: atmosphere; lighting: point"></a-entity>


      <TheScoreBoard position="-2 2 -3" rotation="0 45 0" />


      <!-- MENU DE DÉPART -->
      <TheGameMenu v-if="!store.isPlaying" position="0 1.2 -1.2" rotation="-30 0 0 " />

      <!-- ZONE DE JEU -->

      <a-ring position="0 0.1 0" rotation="-90 0 0" radius-inner="0.8" radius-outer="1" color="#ff8800"
        material="emissive: #ff4400"></a-ring>
      <a-entity id="ambient-music" sound="src: #bg-music; autoplay: false; loop: true; volume: 0.8"></a-entity>

      <!-- Sons de perte / gain de vie -->
      <a-entity id="sound-loss-1" sound="src: #loss-1; autoplay: false; volume: 1.5"></a-entity>
      <a-entity id="sound-loss-2" sound="src: #loss-2; autoplay: false; volume: 1.5"></a-entity>
      <a-entity id="sound-loss-3" sound="src: #loss-3; autoplay: false; volume: 1.5"></a-entity>
      <a-entity id="sound-new-life" sound="src: #new-life; autoplay: false; volume: 1.5"></a-entity>
      <a-entity id="sound-full-life" sound="src: #full-life; autoplay: false; volume: 2.5"></a-entity>

      <TheRockSpawner />
    </template>
    <TheCameraRig />

  </a-scene>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '../store.js';
import TheCameraRig from './TheCameraRig.vue';
import TheRockSpawner from './TheRockSpawner.vue';
import TheScoreBoard from './TheScoreBoard.vue';
import TheGameMenu from './TheGameMenu.vue';
const allAssetsLoaded = ref(false);

onMounted(() => {
  const sceneEl = document.querySelector('a-scene');
  if (sceneEl) {
    sceneEl.addEventListener('full-life-warning', () => {
      const soundEl = document.querySelector('#sound-full-life');
      if (soundEl && soundEl.components.sound) {
        soundEl.components.sound.stopSound();
        soundEl.components.sound.playSound();
      }
    });
  }
});

// Gérer la musique d'ambiance
watch(() => store.isPlaying, (isPlaying) => {
  const musicEl = document.querySelector('#ambient-music');
  if (!musicEl || !musicEl.components.sound) return;

  if (isPlaying) {
    musicEl.components.sound.playSound();
  } else {
    musicEl.components.sound.stopSound();
    // Réinitialiser la vitesse en cas de Game Over
    const audioNode = musicEl.components.sound.pool.children[0];
    if (audioNode && audioNode.setPlaybackRate) {
      audioNode.setPlaybackRate(1.0);
    }
  }
});
// Gérer les effets sonores de perte/gain de vie
watch(() => store.lives, (newLives, oldLives) => {
  // Gain de vie (Coeur)
  if (newLives > oldLives && oldLives > 0) {
    const soundEl = document.querySelector('#sound-new-life');
    if (soundEl && soundEl.components.sound) {
      soundEl.components.sound.stopSound();
      soundEl.components.sound.playSound();
    }
  }
  // Perte de vie (Roche ratée)
  else if (newLives < oldLives && oldLives <= 3) {
    const livesLostCount = 3 - newLives;
    const soundEl = document.querySelector(`#sound-loss-${livesLostCount}`);

    if (soundEl && soundEl.components.sound) {
      soundEl.components.sound.stopSound();
      soundEl.components.sound.playSound();
    }
  }
});

</script>
