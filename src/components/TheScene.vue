<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheOcean from "./TheOcean.vue";

const allAssetsLoaded = ref(false);
const color = ref("#8FD8E3");
</script>

<template>
  <a-scene
    background="color: black;"
    fog="type: linear; color: #81BEC7; opacity: 0.5; near: 30; far: 45;"
  >
    <a-assets @loaded="allAssetsLoaded = true">
      <img
        id="sky-texture"
        src="/public/assets/citrus_orchard_puresky.jpg"
        alt=""
      />
    </a-assets>

    <template v-if="allAssetsLoaded">
      <TheOcean> </TheOcean>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
