<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheOcean from "./TheOcean.vue";
import TheIsland from "./TheIsland.vue";

const allAssetsLoaded = ref(false);
const color = ref("#8FD8E3");
</script>

<template>
  <a-scene
    background="color: black;"
    fog="type: linear; color: #81BEC7; near: 30; far: 250;"
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
      <TheIsland> </TheIsland>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
