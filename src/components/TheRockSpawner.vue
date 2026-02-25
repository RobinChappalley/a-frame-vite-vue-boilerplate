<template>
  <!-- 🚀 LES ROCHES VOLCANIQUES (BOUCLE VUE) -->
  <!-- On utilise v-for pour afficher chaque roche du tableau 'rocks' -->
  <a-entity 
    v-for="rock in rocks" 
    :key="rock.id"
    :position="`${rock.x} ${rock.y} -20`"
    :fly-forward="`speed: ${rock.speed}`"
    hand-collision
    @hit="removeRock(rock.id)"
    @out-of-bounds="removeRock(rock.id)"
  >
    <!-- Visuel de la roche -->
    <a-dodecahedron 
      radius="0.4" 
      color="#330000"
      material="roughness: 1; emissive: #ff4400; emissiveIntensity: 0.5"
    >
      <!-- Ajout d'une particule ou d'un coeur lumineux -->
      <a-entity light="type: point; color: #ff0000; distance: 2; intensity: 2"></a-entity>
    </a-dodecahedron>
  </a-entity>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- ÉTAT DU JEU ---
const rocks = ref([]);
let gameLoop;

// --- FONCTIONS ---

// Créer une roche
const spawnRock = () => {
  const id = Date.now();
  // Position X aléatoire (gauche/droite) entre -1.5 et 1.5
  const x = (Math.random() * 3) - 1.5;
  // Position Y aléatoire (hauteur) entre 1 et 2 (niveau tête/torse)
  const y = 1 + Math.random(); 
  // Vitesse aléatoire
  const speed = 4 + Math.random() * 4; // Entre 4 et 8 m/s

  rocks.value.push({ id, x, y, speed });
};

// Supprimer une roche
const removeRock = (id) => {
  // On filtre le tableau pour garder tout sauf l'ID donné
  rocks.value = rocks.value.filter(rock => rock.id !== id);
};

// --- CYCLE DE VIE VUE ---
onMounted(() => {
  // Lancer le générateur toutes les secondes
  gameLoop = setInterval(spawnRock, 1000);
});

onUnmounted(() => {
  // Nettoyer l'intervalle si on quitte la page pour ne pas faire bugger le navigateur
  clearInterval(gameLoop);
});
</script>
