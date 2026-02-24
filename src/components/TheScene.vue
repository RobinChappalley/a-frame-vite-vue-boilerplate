<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheEnvironnement from "./TheEnvironnement.vue";

const allAssetsLoaded = ref(false);
const color = ref("#8FD8E3");
</script>

<template>
  <a-scene
    background="color: black;"
    fog="type: linear; color: #81BEC7; near: 30; far: 250;"
  >
    <a-assets @loaded="allAssetsLoaded = true"></a-assets>

    <template v-if="allAssetsLoaded">
      <TheEnvironnement></TheEnvironnement>

    </template>

    <TheCameraRig />
  </a-scene>
</template>
