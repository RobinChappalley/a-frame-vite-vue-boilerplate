<script setup>
import { ref } from "vue";

const color = ref("#8FD8E3");
</script>

<template>
  <a-entity>
    <a-light type="ambient" color="#8FD8E3" intensity="0.5"></a-light>
    <a-light
      type="directional"
      color="#8FD8E3"
      intensity="0.8"
      position="-1 1 0"
    ></a-light>
  </a-entity>
  <a-box></a-box>
  <a-ocean
    position="0 0 0"
    width="500"
    depth="500"
    amplitude="0.1"
    amplitudevariance="0.05"
    opacity="0.8"
    speed="1.8"
  ></a-ocean>
  <a-sky src="#sky-texture" material="fog: false"></a-sky>
</template>
