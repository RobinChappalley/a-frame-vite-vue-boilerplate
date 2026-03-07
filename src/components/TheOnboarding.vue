<script setup>
import { ref } from 'vue';

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
    document.querySelector('a-scene').enterVR();
  }
  document.querySelector('a-scene').emit('enter-scene');
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <img src="/assets/logo.png" alt="" width="100" height="100">
      <h1>Smash Lab</h1>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Enter smashing world</button>
      <div class="licences">
        <section>
          <h4>Movement modes support</h4>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              control (Drag and drop)
            </li>
            <li>
              Mobile – 1x Finger touch to go forward + 2x Fingers touch to go
              backward + Gaze cursor for click
            </li>
            <li>
              VR/AR – walk + Teleport (Grip for grab and laser for
              click) + Gaze cursor for click
            </li>
          </ul>
        </section>
        <section>
          <h4>Source code</h4>
          <blockquote><a href="https://github.com/RobinChappalley/smash-lab">Github repository</a></blockquote>
        </section>
        <dl>
          <dt>
            <i>Included</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras</a>
          </dt>
          <dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a>
          </dt>
          <dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a>
          </dt>
          <dd>
            <a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a>
          </dt>
          <dd>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">MIT
              License</a>
          </dd>

          <dt>
            <a href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
              target="_blank">simple-navmesh-constraint</a>
          </dt>
          <dd>
            By Ada Rose Cannon under MIT License
          </dd>

          <dt>
            <a href="https://sketchfab.com/3d-models/love-low-poly-dd3b881a34904991878dc6a5a05aa1f6"
              target="_blank">Hearts</a>
          </dt>
          <dd>
            by <a href="https://sketchfab.com/VladislavFehu" target="_blank">VARRRG</a> under <a
              href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY
              4.0</a>
          </dd>

          <dt>
            <a href="https://github.com/supermedium/aframe-environment-component"
              target="_blank">a-frame-environment-component</a>
          </dt>
          <dd>
            by <a href="https://github.com/supermedium" target="_blank">supermedium</a>
            under <a href="https://github.com/supermedium/aframe-environment-component/blob/master/LICENSE"
              target="_blank">MIT License</a>
          </dd>

        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0b0f19 0%, #1a1525 100%);
  color: #e2e8f0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  z-index: 10000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

#onboarding>div {
  max-width: 1400px;
  width: 95vw;
  height: 90vh;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

img {
  width: 70px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(to right, #FFD700, #FF8800);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
}

p {
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

button {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  background: linear-gradient(45deg, #ff4400, #ff8800);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 68, 0, 0.4);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 68, 0, 0.6);
  background: linear-gradient(45deg, #ff5500, #ff9900);
}

button:active {
  transform: translateY(1px);
}

.licences {
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  align-self: stretch;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: auto auto;
  gap: 1.5rem 3rem;
  overflow: hidden;
}

section:nth-of-type(1) {
  grid-column: 1;
  grid-row: 1;
}

section:nth-of-type(2) {
  grid-column: 1;
  grid-row: 2;
}

h4 {
  font-size: 1.1rem;
  color: #FFD700;
  margin-bottom: 0.8rem;
  margin-top: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.4;
}

li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #FF8800;
}

blockquote {
  margin: 0;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-left: 4px solid #00FFDD;
  border-radius: 0 8px 8px 0;
}

a {
  color: #00FFDD;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

a:hover {
  color: #ffffff;
  text-decoration: underline;
}

dl {
  grid-column: 2;
  grid-row: 1 / 3;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.5rem;
  align-items: baseline;
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 0;
  max-height: 100%;
  overflow-y: auto;
}

dt {
  font-weight: 600;
  color: #e2e8f0;
}

dt:first-of-type {
  grid-column: 1 / -1;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

dt i {
  color: #FFD700;
  font-style: normal;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 1px;
}

dd {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Responsiveness pour l'affichage mobile */
@media (max-width: 800px) {
  #onboarding>div {
    height: auto;
    overflow-y: auto;
  }

  .licences {
    grid-template-columns: 1fr;
    overflow: auto;
  }

  dl {
    grid-column: 1;
    grid-row: 3;
  }

  h1 {
    font-size: 2rem;
  }

  dl {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  dd {
    margin-bottom: 0.8rem;
  }
}
</style>
