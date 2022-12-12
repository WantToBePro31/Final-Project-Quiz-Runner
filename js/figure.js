import { Helper } from "./helper.js";

const helper = new Helper();

export class Figure {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0,
      ...params,
    };

    // Create group for figure and positioning
    this.group = new THREE.Group();
    this.group.position.x = this.params.x;
    this.group.position.y = this.params.y;
    this.group.position.z = this.params.z;
    this.group.rotation.y = this.params.ry;

    // Set outer material
    this.headColor = helper.random(0, 360);
    this.bodyColor = helper.random(0, 360);
    this.headLightness = helper.random(40, 65);
    this.bodyLightness = helper.random(40, 65);
    this.headMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.headColor}, 40%, ${this.headLightness}%)`,
    });
    this.bodyMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.bodyColor}, 85%, ${this.bodyLightness}%)`,
    });

    this.arms = [];
  }

  createHead() {
    // Create a new group for the head
    this.head = new THREE.Group();

    // Create the head and add to the group
    const headGeometry = new THREE.SphereGeometry(0.85, 16, 8);
    const headMain = new THREE.Mesh(headGeometry, this.headMaterial);
    this.head.add(headMain);

    // Position for the head group
    this.head.position.y = 0;

    // Add the head group to the figure
    this.group.add(this.head);

    // Add the eyes and mouth
    this.createEyes();
    this.createMouth();
  }

  createBody() {
    // Create a new group for the body
    this.body = new THREE.Group();

    // Create the body and add to the group
    const bodyGeometry = new THREE.BoxGeometry(1, 1.2, 1);
    const bodyMain = new THREE.Mesh(bodyGeometry, this.bodyMaterial);
    this.body.add(bodyMain);

    // Position for the head group
    this.body.position.y = -1.35;

    // Add the head group to the figure
    this.group.add(this.body);

    // Add the legs
    this.createLegs();
  }

  createEyes() {
    // Create a new group for the eyes
    const eyes = new THREE.Group();

    // Create the eyes and add to the group
    const eyeGeometry = new THREE.SphereGeometry(0.15, 12, 8);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x44445c });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.x = -0.3;
    rightEye.position.x = 0.3;
    eyes.add(leftEye, rightEye);

    // Position for the eyes group
    eyes.position.y = 0.15;
    eyes.position.z = 0.7;

    // Add the eyes group to the head
    this.head.add(eyes);
  }

  createMouth() {
    // Create the mouth
    const curve = new THREE.EllipseCurve(
      0,
      0,
      0.25,
      0.15,
      0,
      2 * Math.PI,
      false,
      0
    );
    const points = curve.getPoints(50);
    const mouthshape = new THREE.Shape(points);
    const extrudeSettings = {
      steps: 0,
      bevelEnabled: false,
    };
    const mouthGeometry = new THREE.ExtrudeGeometry(
      mouthshape,
      extrudeSettings
    );
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xfa8072 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);

    // Position for the mouth
    mouth.position.y = -0.3;
    mouth.position.z = 0.85;

    // Add the mouth to the head
    this.head.add(mouth);
  }

  createLegs() {
    // Create a new group for the legs
    const legs = new THREE.Group();

    // Create the legs and add to the group
    const legGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.25);
    const leftLeg = new THREE.Mesh(legGeometry, this.headMaterial);
    const rightLeg = new THREE.Mesh(legGeometry, this.headMaterial);
    leftLeg.position.x = -0.22;
    rightLeg.position.x = 0.22;
    legs.add(leftLeg, rightLeg);

    // Position for the legs group
    legs.position.y = -1.15;

    // Add the legs group to the body
    this.body.add(legs);
  }

  createArms() {
    const height = 0.7;

    for (let i = 0; i < 2; i++) {
      // Create a new group for the arm
      const armGroup = new THREE.Group();

      // Create the arm and add to the group
      const armGeometry = new THREE.BoxGeometry(0.25, height, 0.25);
      const arm = new THREE.Mesh(armGeometry, this.headMaterial);
      arm.position.y = height * -0.5;
      armGroup.add(arm);

      // Specify the arm position for the figure
      const n = i % 2 === 0 ? 1 : -1; //look for side
      armGroup.position.x = 0.8 * n;
      armGroup.position.y = 0.6;
      armGroup.rotation.z = helper.degreesToRadians(30 * n);

      // Add the arm group to the body
      this.body.add(armGroup);

      // Push arm group to the arms array
      this.arms.push(armGroup);
    }
  }

  bounce() {
    this.group.position.y = this.params.y;
    this.group.rotation.y = this.params.ry;
    this.arms[0].rotation.z = this.params.armRotation;
    this.arms[1].rotation.z = -this.params.armRotation;
  }

  init(scene) {
    scene.add(this.group);
    this.createBody();
    this.createHead();
    this.createArms();
  }
}