<template>
    <a-entity v-bind="$attrs" position="0 0 -0.5">

        <!-- INFOS (Score, Coins, Combo) - Haut Gauche -->
        <a-entity position="-0.30 -0.15 0" scale="0.15 0.15 0.15">
            <a-text :value="`SCORE: ${store.score}`" position="0 0 0" color="#FFD700" align="left" font="exo2bold"
                opacity="0.9"></a-text>
            <a-text :value="`TOTAL COINS: ${store.coins}`" position="0 -0.2 0" color="#00FFDD" align="left"
                font="exo2bold" opacity="0.9"></a-text>
            <a-text v-if="store.combo > 1" :value="`COMBO: ${store.combo}x`" position="0 -0.4 0" color="#FF8800"
                align="left" font="exo2bold" opacity="0.9"
                animation="property: scale; to: 1.1 1.1 1.1; dur: 200; dir: alternate; loop: 2; startEvents: combo-changed">
            </a-text>
        </a-entity>

        <!-- LES VIES (Cœurs) - Haut Droit -->
        <a-entity position="0.20 -0.15 0" scale="0.15 0.15 0.15">
            <a-entity v-for="i in store.lives" :key="i" :position="`${(i - 1) * 0.4} 0 0`" scale="0.006 0.006 0.006"
                gltf-model="#heart-model" :material="store.lives < i ? 'opacity: 0.2; transparent: true' : ''"
                :visible="store.lives >= i"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear">
            </a-entity>
        </a-entity>

    </a-entity>
</template>

<script setup>
import { store } from '../store.js';
</script>
