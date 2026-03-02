<template>
  <!-- 🚀 LES ROCHES VOLCANIQUES (BOUCLE VUE) -->
  <!-- On utilise v-for pour afficher chaque roche du tableau 'rocks' -->
  <a-entity v-for="rock in rocks" :key="rock.id" :position="`${rock.x} ${rock.y} -20`"
    :fly-forward="`speed: ${rock.isHit ? 0 : rock.speed}`" :hand-collision="rock.isHit ? null : ''"
    @hit="removeRock(rock.id, true)" @out-of-bounds="removeRock(rock.id, false)">

    <!-- Visuel de la roche (Si pas touchée) -->
    <a-dodecahedron v-if="!rock.isHit" radius="0.4" color="#aa3300"
      material="roughness: 0.9; metalness: 0.2; flatShading: true; emissive: #330000">
      <a-entity light="type: point; color: #ff0000; distance: 2; intensity: 1"></a-entity>
    </a-dodecahedron>

    <!-- EFFET D'EXPLOSION (Si touchée) - On l'éloigne de 0.5m pour qu'il ne soit pas "dans les yeux" -->
    <a-entity v-else explode position="0 0 -0.5"
      :sound="`src: #hit-sound; autoplay: true; volume: 2; positional: true`"></a-entity>
  </a-entity>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { store } from '../store.js';

// --- ÉTAT DU JEU ---
const rocks = ref([]);
let spawnTimeout;
let difficultyTimeout;

const GAME_WIDTH = 2;
const BASE_SPEED = 4;
const BASE_INTERVAL = 1200;

// Créer une roche
const spawnRock = () => {
  if (store.isGameOver || !store.isPlaying) return;

  const id = Date.now();
  const x = (Math.random() * GAME_WIDTH) - (GAME_WIDTH / 2);
  const y = 1 + Math.random();

  // La vitesse augmente avec la difficulté
  const speed = (BASE_SPEED + Math.random() * 4) * store.difficulty;

  rocks.value.push({ id, x, y, speed, isHit: false });

  // Planifier la prochaine roche (l'intervalle diminue avec la difficulté)
  const currentInterval = Math.max(300, BASE_INTERVAL / store.difficulty);
  spawnTimeout = setTimeout(spawnRock, currentInterval);
};

// Augmenter la difficulté progressivement
const increaseDifficulty = () => {
  if (store.isGameOver || !store.isPlaying) return;

  store.difficulty += 0.05; // +5% de difficulté

  // On change de "niveau" tous les 0.2 de difficulté
  store.level = Math.floor((store.difficulty - 1) * 5) + 1;

  difficultyTimeout = setTimeout(increaseDifficulty, 5000); // Toutes les 5 secondes
};

// Supprimer une roche
const removeRock = (id, hit = false) => {
  const rockIndex = rocks.value.findIndex(rock => rock.id === id);
  if (rockIndex !== -1) {
    if (hit) {
      store.addScore(1);
      // On marque la roche comme touchée au lieu de la supprimer
      rocks.value[rockIndex].isHit = true;

      // On attend la fin de l'effet d'explosion pour la supprimer du DOM
      setTimeout(() => {
        const finalIdx = rocks.value.findIndex(rock => rock.id === id);
        if (finalIdx !== -1) rocks.value.splice(finalIdx, 1);
      }, 1000);
    } else {
      store.removeLife();
      rocks.value.splice(rockIndex, 1);
    }
  }
};

// --- CYCLE DE VIE VUE ---
onUnmounted(() => {
  clearTimeout(spawnTimeout);
  clearTimeout(difficultyTimeout);
});

// Gérer le démarrage et l'arrêt du jeu
watch(() => store.isPlaying, (isPlaying) => {
  if (isPlaying) {
    // Vider les roches restantes d'une partie précédente
    rocks.value = [];
    // Lancer les timers
    spawnRock();
    increaseDifficulty();
  } else {
    clearTimeout(spawnTimeout);
    clearTimeout(difficultyTimeout);
  }
});
</script>
