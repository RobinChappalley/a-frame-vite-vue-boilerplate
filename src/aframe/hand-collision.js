AFRAME.registerComponent('hand-collision', {
  schema: {
    targets: { type: 'string', default: '#left-hand, #right-hand' },
    radius: { type: 'number', default: 0.4 },
    event: { type: 'string', default: 'hit' }
  },

  init: function () {
    this.targetEls = [];
    this.rockPos = new THREE.Vector3();
    this.handPos = new THREE.Vector3();
  },

  update: function () {
    this.targetEls = Array.from(document.querySelectorAll(this.data.targets));
  },

  tick: function () {
    // If we haven't found the hands yet, try to find them again
    if (this.targetEls.length === 0) {
      this.targetEls = Array.from(document.querySelectorAll(this.data.targets));
      if (this.targetEls.length === 0) return;
    }

    this.el.object3D.getWorldPosition(this.rockPos);

    for (let i = 0; i < this.targetEls.length; i++) {
      const handEl = this.targetEls[i];
      if (!handEl.object3D) continue;
      
      handEl.object3D.getWorldPosition(this.handPos);
      const distance = this.rockPos.distanceTo(this.handPos);

      if (distance < this.data.radius) {
        this.el.emit(this.data.event, { hand: handEl });
        console.log('hit'); 
        // We remove the component to avoid multiple hit events for the same rock
        this.el.removeAttribute('hand-collision');
        break;
      }
    }
  }
});
