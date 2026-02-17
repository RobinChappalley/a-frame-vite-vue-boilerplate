<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";

const allAssetsLoaded = ref(false);
const color = ref("#8FD8E3");
</script>

<template>
  <a-scene background="color: black;">
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>

    <template v-if="allAssetsLoaded">
      <a-ocean
        clickable
        @click="toggle"
        position="0 -3 0"
        width="100"
        depth="100"
        amplitude="0.5"
        amplitudevariance="0.05"
        density="20"
        opacity="0.8"
        speed="1.8"
      ></a-ocean>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
