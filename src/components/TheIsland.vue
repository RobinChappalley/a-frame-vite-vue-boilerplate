<script setup>
import { ref } from "vue";
import "../aframe/duplicate.js";
import "../aframe/hexa.js";
const color = ref("#D41500");
</script>

<template>
  <a-entity>
    <a-hexa
      rotation="-90 0 0"
      position="0 0 0"
      radius="1"
      :color="color"
    ></a-hexa>
  </a-entity>
</template>
