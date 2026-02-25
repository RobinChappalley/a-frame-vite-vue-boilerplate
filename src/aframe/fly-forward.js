// src/aframe/fly-forward.js
AFRAME.registerComponent('fly-forward', {
  schema: {
    speed: { type: 'number', default: 1 },
    gameOverLimit: { type: 'number', default: 2 } // Distance Z derrière le joueur
  },

  tick: function (time, timeDelta) {
    // On déplace l'objet vers le joueur (Z positif)
    // (timeDelta / 1000) permet d'avoir une vitesse constante quel que soit le framerate (90hz ou 60hz)
    const currentZ = this.el.object3D.position.z;
    const movement = this.data.speed * (timeDelta / 1000);
    
    this.el.object3D.position.z += movement;

    // Faire tourner la roche sur elle-même pour le style
    this.el.object3D.rotation.x += 0.01;
    this.el.object3D.rotation.y += 0.02;

    // Si l'objet dépasse le joueur (Z > 2), c'est raté !
    if (currentZ > this.data.gameOverLimit) {
      this.el.emit('out-of-bounds');
    }
  }
});
