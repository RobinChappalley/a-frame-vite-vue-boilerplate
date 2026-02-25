<p align="center">
    <img src="./logo.png" alt="Smash Lab Logo" align="center" width="200"/>
</p>
<h1 align="center">Smash Lab</h1>



![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![A-Frame](https://img.shields.io/badge/A%E2%80%93Frame-brightgreen?style=for-the-badge&labelColor=%23ef2d5e&color=%23ef2d5e)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### [>> DEMO <<](https://onivers.com/aframe-vue-boilerplate/)

### Libs and components

- [aframe-extras](https://github.com/c-frame/aframe-extras) (MIT License)
- [aframe physx](https://github.com/c-frame/physx) (MIT License)
- [aframe-blink-controls](https://github.com/jure/aframe-blink-controls) (MIT License)
- [aframe-multi-camera](https://github.com/diarmidmackenzie/aframe-multi-camera/) (MIT License)
- [simple-navmesh-constraint](https://github.com/AdaRoseCannon/aframe-xr-boilerplate) (MIT Licence)
- [a-frame-environment-component](https://github.com/c-frame/aframe-environment-component) (MIT License)

### Movement modes support

- **Desktop** – Keyboard for move (_WASD_ or Arrows keys) + Mouse for look control (Drag and drop)
- **Mobile** – 1x Finger touch to go forward + 2x Fingers touch to go backward + Gaze cursor for click
- **VR/AR** – walk + Teleport (Grip for grab and laser for click) + Gaze cursor for click in AR

### 3D models



- **Hearts** – [Love Low Poly](https://sketchfab.com/3d-models/love-low-poly-6xsuX) by [VARRRG](https://sketchfab.com/vrrrg) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

---

## Quickstart

### Create a folder for your project and move to it

### Run the project

```sh
 docker compose up --build
```

### Stop the project

```sh
 docker compose down -v
```

## Notes for local dev on VR headset

1. Check that your development device and your VR headset are connected on **the same network**.

2. Expose you local development:

```sh
docker compose -f docker-compose-vr.yaml up --build
```

3. In your VR headset, browse to the local development adress `[ip]:[port]`.

> [!NOTE]
> The certificate is self-signed, so you will probably have to confirm access to the resource in your browser.

---

## License

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge&color=%23262626)
