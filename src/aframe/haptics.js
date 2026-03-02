AFRAME.registerComponent('haptics', {
  schema: {
    actuatorIndex: { default: 0 },
    dur: { default: 100 },
    enabled: { default: true },
    events: { type: 'array' },
    eventsFrom: { type: 'string' },
    force: { default: 1 }
  },

  multiple: true,

  init: function () {
    this.callPulse = this.pulse.bind(this);
    this.addEventListeners();
  },

  remove: function () {
    this.removeEventListeners();
  },

  pulse: function (force, dur) {
    var data = this.data;
    if (!data.enabled) return;

    // Récupérer le contrôleur WebXR (A-Frame 1.0.0+)
    var trackedControls = this.el.components['tracked-controls-webxr'] || this.el.components['tracked-controls'];
    if (!trackedControls || !trackedControls.controller) return;

    var gamepad = trackedControls.controller.gamepad || trackedControls.controller;
    if (!gamepad || !gamepad.hapticActuators || !gamepad.hapticActuators.length) return;

    var actuator = gamepad.hapticActuators[data.actuatorIndex];
    if (actuator) {
      var pulseForce = force !== undefined && typeof force === 'number' ? force : data.force;
      var pulseDur = dur !== undefined && typeof dur === 'number' ? dur : data.dur;
      
      // On teste les API possibles (WebXR / standard Gamepad API)
      if (actuator.pulse) {
        actuator.pulse(pulseForce, pulseDur);
      } else if (actuator.playEffect) {
        actuator.playEffect("dual-rumble", {
          startDelay: 0,
          duration: pulseDur,
          strongMagnitude: pulseForce,
          weakMagnitude: pulseForce
        });
      }
    }
  },

  addEventListeners: function () {
    var data = this.data;
    var listenTarget = data.eventsFrom ? document.querySelector(data.eventsFrom) : this.el;
    if (!listenTarget) return;

    for (var i = 0; i < data.events.length; i++) {
      listenTarget.addEventListener(data.events[i], this.callPulse);
    }
  },

  removeEventListeners: function () {
    var data = this.data;
    var listenTarget = data.eventsFrom ? document.querySelector(data.eventsFrom) : this.el;
    if (!listenTarget) return;

    for (var i = 0; i < data.events.length; i++) {
      listenTarget.removeEventListener(data.events[i], this.callPulse);
    }
  }
});