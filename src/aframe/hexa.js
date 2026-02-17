AFRAME.registerPrimitive("a-hexa", {
  defaultComponents: {
    "a-hexa": {},
  },
  mappings: {
    radius: "a-hexa.radius",
    color: "a-hexa.color",
  },
});

AFRAME.registerComponent("a-hexa", {
  schema: {
    radius: { type: "number", default: 1 },
    color: { type: "color", default: "#8FD8E3" },
  },

  init: function () {
    this.createVertices();
    this.createShape();
    this.createGeometry();
    this.createMaterial();
    this.createMesh();
  },

  remove: function () {
    this.el.removeObject3D("mesh");
  },

  createVertices: function () {
    const vertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({
        x: this.data.radius * Math.cos(angle),
        y: this.data.radius * Math.sin(angle),
      });
    }
    this.vertices = vertices;
  },

  createShape: function () {
    const shape = new THREE.Shape();
    shape.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < this.vertices.length; i++) {
      shape.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    shape.lineTo(this.vertices[0].x, this.vertices[0].y);
    this.shape = shape;
  },

  createGeometry: function () {
    const extrudeSettings = {
      steps: 1,
      depth: 0.01,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(this.shape, extrudeSettings);
    this.geometry = geometry;
  },

  createMaterial: function () {
    const material = new THREE.MeshLambertMaterial({ color: this.data.color });
    this.material = material;
  },

  createMesh: function () {
    this.mesh = new THREE.Mesh(this.geometry, this.createMaterial());
    this.el.setObject3D("mesh", this.mesh);
    return this.mesh;
  },
  update() {
    this.mesh.material.color.set(this.data.color);
  },
});
