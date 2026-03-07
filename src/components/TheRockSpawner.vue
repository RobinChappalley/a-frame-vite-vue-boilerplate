<template>
  <!-- 🚀 LES ROCHES VOLCANIQUES (BOUCLE VUE) -->
  <!-- On utilise v-for pour afficher chaque roche du tableau 'rocks' -->
  <a-entity v-for="rock in rocks" :key="rock.id" :position="`${rock.x} ${rock.y} -40`"
    animation__spawn="property: scale; from: 0 0 0; to: 1 1 1; dur: 600; easing: easeOutQuad"
    :fly-forward="`speed: ${rock.isHit ? 0 : rock.speed}`" :hand-collision="rock.isHit ? null : ''"
    @hit="removeRock(rock.id, true)" @out-of-bounds="removeRock(rock.id, false)">

    <template v-if="!rock.isHit">
      <!-- Visuel de la roche normale (adaptée au monde) -->
      <a-dodecahedron v-if="rock.type === 'normal'" radius="0.4" :color="store.worlds[store.currentWorld].rockColor"
        material="roughness: 0.9; metalness: 0.2; flatShading: true; emissive: #111">
        <a-entity light="type: point; color: #ff0000; distance: 2; intensity: 1"></a-entity>
      </a-dodecahedron>

      <!-- Visuel de la roche dorée (Bonus x10) -->
      <a-dodecahedron v-else-if="rock.type === 'golden'" radius="0.4" color="#ffcc00"
        material="roughness: 0.2; metalness: 0.8; flatShading: true; emissive: #ffaa00; emissiveIntensity: 0.5">
        <a-entity light="type: point; color: #ffcc00; distance: 3; intensity: 2"></a-entity>
      </a-dodecahedron>

      <!-- Visuel du Coeur (Bonus +1 Vie) -->
      <a-entity v-else-if="rock.type === 'heart'"
        animation="property: rotation; to: 0 360 0; loop: true; dur: 2000; easing: linear">
        <!-- On descend le modèle pour que le centre visuel du coeur corresponde à l'origine (centre de la collision) -->
        <a-entity gltf-model="#heart-model" scale="0.015 0.015 0.015" position="0 -0.3 0"></a-entity>
        <a-entity light="type: point; color: #ff0088; distance: 2; intensity: 1"></a-entity>
      </a-entity>
    </template>

    <!-- EFFET D'EXPLOSION (Si touchée) - On l'éloigne de 0.5m pour qu'il ne soit pas "dans les yeux" -->
    <a-entity v-else
      :explode="`color: ${rock.type === 'normal' ? store.worlds[store.currentWorld].rockColor : (rock.type === 'golden' ? '#ffcc00' : '#ff0088')}`"
      position="0 0 -0.5"
      :sound="rock.type === 'heart' ? '' : `src: ${rock.type === 'golden' ? '#boost-sound' : '#hit-sound'}; autoplay: true; volume: 2; positional: true`"></a-entity>
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
const COINSSPAWNPERCENTAGE = 0.05;
const HEARTSPAWNPERCENTAGE = 0.15;

// Créer une roche
const spawnRock = () => {
  if (store.isGameOver || !store.isPlaying) return;

  const id = Date.now();
  const x = (Math.random() * GAME_WIDTH) - (GAME_WIDTH / 2);
  const y = 1 + Math.random();

  // La vitesse augmente avec la difficulté
  const speed = (BASE_SPEED + Math.random() * 4) * store.difficulty;

  // Attribution du type de roche (probabilités de spawn)
  const rand = Math.random();
  let type = 'normal';
  if (rand < COINSSPAWNPERCENTAGE) {
    type = 'heart'; // 5% de chance
  } else if (rand > 1 - HEARTSPAWNPERCENTAGE) {
    type = 'golden'; // 10% de chance
  }

  rocks.value.push({ id, x, y, speed, type, isHit: false });

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
    const rock = rocks.value[rockIndex];

    if (hit) {
      if (rock.type === 'golden') {
        store.addCoin(1);
      } else if (rock.type === 'heart') {
        const lifeAdded = store.addLife();
        if (!lifeAdded) {
          // Si les vies étaient déjà pleines, on prévient le système
          const sceneEl = document.querySelector('a-scene');
          if (sceneEl) sceneEl.emit('full-life-warning');
        } else {
          store.addScore(1);
        }
      } else {
        store.addScore(1);
      }

      store.incrementCombo();
      rock.isHit = true;

      setTimeout(() => {
        const finalIdx = rocks.value.findIndex(r => r.id === id);
        if (finalIdx !== -1) rocks.value.splice(finalIdx, 1);
      }, 1000);
    } else {
      // On ne pénalise que si on manque une roche normale
      if (rock.type === 'normal') {
        store.removeLife();
      }
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
