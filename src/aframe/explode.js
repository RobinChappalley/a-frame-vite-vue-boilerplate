AFRAME.registerComponent('explode', {
  schema: {
    color: { type: 'color', default: '#ff5500' }
  },
  init: function () {
    const el = this.el;
    const explodeColor = this.data.color;

    // 1. FLASH PLUS DISCRET
    // On réduit la taille et la durée pour ne pas masquer les débris
    const flash = document.createElement('a-sphere');
    flash.setAttribute('radius', '0.15');
    flash.setAttribute('material', 'color: #ffffff; emissive: #ffffff; transparent: true; opacity: 0.8');
    flash.setAttribute('animation__scale', {
      property: 'scale',
      to: '3 3 3',
      dur: 150,
      easing: 'easeOutExpo'
    });
    flash.setAttribute('animation__fade', {
      property: 'material.opacity',
      to: '0',
      dur: 200,
      easing: 'linear'
    });
    el.appendChild(flash);

    // 2. DÉBRIS PLUS VISIBLES ET NOMBREUX
    // On augmente le nombre, on ajoute de l'émissivité pour qu'ils "brillent"
    const fragmentsCount = 16; 
    
    for (let i = 0; i < fragmentsCount; i++) {
      const fragment = document.createElement('a-octahedron'); // Forme plus "éclatée"
      const size = 0.1 + Math.random() * 0.15;
      fragment.setAttribute('radius', size);
      fragment.setAttribute('material', {
        color: explodeColor,
        emissive: explodeColor,
        emissiveIntensity: 1.5,
        roughness: 0
      });
      
      // Direction aléatoire plus explosive (360°)
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI;
      const speed = 3 + Math.random() * 5; // Plus rapide
      
      const targetX = Math.cos(angle) * Math.cos(elevation) * speed;
      const targetY = Math.sin(elevation) * speed;
      const targetZ = Math.sin(angle) * Math.cos(elevation) * speed;

      fragment.setAttribute('animation__pos', {
        property: 'position',
        to: `${targetX} ${targetY} ${targetZ}`,
        dur: 1200,
        easing: 'easeOutExpo'
      });
      
      fragment.setAttribute('animation__scale', {
        property: 'scale',
        to: '0 0 0',
        dur: 1200,
        easing: 'easeInQuad'
      });

      fragment.setAttribute('animation__rot', {
        property: 'rotation',
        to: `${Math.random() * 720} ${Math.random() * 720} ${Math.random() * 720}`,
        dur: 1200
      });

      el.appendChild(fragment);
    }

    // 3. ONDE DE CHOC (Cercle qui s'étend au sol ou dans l'air)
    const shockwave = document.createElement('a-ring');
    shockwave.setAttribute('radius-inner', '0.1');
    shockwave.setAttribute('radius-outer', '0.2');
    shockwave.setAttribute('rotation', '-90 0 0');
    shockwave.setAttribute('material', `color: ${explodeColor}; transparent: true; opacity: 0.8`);
    shockwave.setAttribute('animation__scale', {
      property: 'scale',
      to: '10 10 10',
      dur: 500,
      easing: 'easeOutQuad'
    });
    shockwave.setAttribute('animation__fade', {
      property: 'material.opacity',
      to: '0',
      dur: 500
    });
    el.appendChild(shockwave);

    // 4. LUMIÈRE ÉPHÉMÈRE
    const light = document.createElement('a-entity');
    light.setAttribute('light', `type: point; color: ${explodeColor}; intensity: 10; distance: 10`);
    light.setAttribute('animation__fade', {
      property: 'light.intensity',
      to: '0',
      dur: 400,
      easing: 'linear'
    });
    el.appendChild(light);
  }
});