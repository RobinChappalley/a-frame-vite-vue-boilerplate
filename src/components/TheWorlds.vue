<template>
    <a-entity>
        <a-entity v-for="(world, key, index) in store.worlds" :key="key">
            <a-light type="point" :position="`0 ${-80 + (index * 20)} 0`"></a-light>
            <!-- On exclut 'void' du système de sélection puisqu'il est par défaut -->
            <a-entity v-if="key !== 'void'" :rotation="`0 ${-80 + (index * 20)} 0`">
                <!-- Conteneur qui décale la sphère sur l'arc de cercle -->
                <a-entity position="0 0 -2.5">

                    <a-sphere radius="0.25" :color="world.groundColor"
                        :material="`roughness: 0.5; emissive: ${store.currentWorld === key ? '#ffffff' : '#000000'}; emissiveIntensity: 0.2`"
                        clickable @click="selectWorld(key, index)" haptics="events: mouseenter; dur: 40; force: 0.4"
                        :animation__hover="`property: scale; to: 1.1 1.1 1.1; startEvents: mouseenter; dur: 200`"
                        :animation__leave="`property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200`">
                    </a-sphere>

                    <!-- Etiquette de texte -->
                    <a-text :value="world.name" position="0 -0.4 0" align="center" width="2.5"
                        :color="store.currentWorld === key ? '#ffffff' : '#aaaaaa'" font="exo2bold"></a-text>

                    <!-- Verrou si pas débloqué -->
                    <a-text v-if="!store.unlockedWorlds.includes(key)" value="10 Coins" position="0 -0.6 0"
                        align="center" width="2" color="red"></a-text>
                </a-entity>
            </a-entity>
        </a-entity>
    </a-entity>
</template>

<script setup>
import { store } from '../store.js';

// Gérer la sélection / achat d'un monde depuis le Hub
const selectWorld = (key, index) => {
    // Déjà débloqué : On s'en équipe
    if (store.unlockedWorlds.includes(key)) {
        store.currentWorld = key;
        store.gameAngle = -80 + (index * 20); // Aligne le jeu sur ce monde
        store.isSelectingWorld = false; // Ferme le hub, ouvre le menu Go
    }
    // Pas encore débloqué, mais on a l'argent (10 Coins)
    else if (store.coins >= 10) {
        store.removeCoin(10); // Paie
        store.unlockedWorlds.push(key); // Débloque
        store.currentWorld = key; // S'en équipe automatiquement
        store.gameAngle = -80 + (index * 20);
        store.isSelectingWorld = false; // Ferme le hub
    }
    // Pas débloqué et pas d'argent
    else {
        store.nomoney();
    }
};
</script>