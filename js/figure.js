import { Helper } from "./helper.js";

const helper = new Helper();

export class Figure {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ...params,
    };

    // Create group for figure and positioning
    this.group = new THREE.Group();
    this.group.position.x = this.params.x;
    this.group.position.y = this.params.y;
    this.group.position.z = this.params.z;

    // Set outer material
    this.headColor = helper.randomColor(0, 360);
    this.bodyColor = helper.randomColor(0, 360);
    this.headLightness = helper.randomColor(20, 100);
    this.bodyLightness = helper.randomColor(20, 80);
    this.headMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.headColor}, 60%, ${this.headLightness}%)`,
    });
    this.bodyMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.bodyColor}, 85%, ${this.bodyLightness}%)`,
    });

    this.arms = [];
    this.legs = [];

    this.dead = 0;
    this.jump = 0;
    this.walk = 0;
    this.moveLeft = 0;
    this.moveRight = 0;
    this.stepCount = 0;
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
    for (let i = 0; i < 2; i++) {
      // Create a new group for the legs
      const legGroup = new THREE.Group();

      // Create the legs and add to the group
      const legGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.25);
      const leg = new THREE.Mesh(legGeometry, this.headMaterial);
      legGroup.add(leg);

      // Position for the legs group
      const n = i % 2 === 0 ? 1 : -1; //look for side
      legGroup.position.x = 0.22 * n;
      legGroup.position.y = -1.15;

      // Add the legs group to the body
      this.body.add(legGroup);

      // Push leg group to the legs array
      this.legs.push(legGroup);
    }
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
    this.arms[0].rotation.z = this.params.armRotation;
    this.arms[1].rotation.z = -this.params.armRotation;
  }

  doWalk(walkFlag) {
    if (walkFlag === 0) {
      this.arms[0].rotation.x += 0.1;
      this.arms[1].rotation.x -= 0.1;
      this.legs[0].rotation.x -= 0.05;
      this.legs[1].rotation.x += 0.05;
      if (this.arms[0].rotation.x >= 1.5) {
        return 1;
      }
      return 0;
    }
    if (walkFlag === 1) {
      this.arms[0].rotation.x -= 0.1;
      this.arms[1].rotation.x += 0.1;
      this.legs[0].rotation.x += 0.05;
      this.legs[1].rotation.x -= 0.05;
      if (this.arms[0].rotation.x <= -1.5) {
        return 0;
      }
      return 1;
    }
  }

  doJump(jumpFlag) {
    if (jumpFlag === 1) {
      this.group.position.y += 0.15;
      this.arms[0].rotation.z += 0.05;
      this.arms[1].rotation.z -= 0.05;
      if (this.group.position.y >= 1.5) {
        return 2;
      }
      return 1;
    }
    if (jumpFlag === 2) {
      this.group.position.y -= 0.15;
      this.arms[0].rotation.z -= 0.05;
      this.arms[1].rotation.z += 0.05;
      if (this.group.position.y <= -0.9) {
        return 0;
      }
      return 2;
    }
  }

  doMoveLeft(moveLeftFlag, step) {
    if (moveLeftFlag === 1) {
      if (step === 0) {
        this.stepCount = 1;
      }
      this.group.position.x -= 0.5;
      this.stepCount++;
      if (this.group.position.x <= -4 || step === 8) {
        this.stepCount = 0;
        return 0;
      }
      return 1;
    }
  }

  doMoveRight(moveRightFlag, step) {
    if (moveRightFlag === 1) {
      if (step === 0) {
        this.stepCount = 1;
      }
      this.group.position.x += 0.5;
      this.stepCount++;
      if (this.group.position.x >= 4 || step === 8) {
        this.stepCount = 0;
        return 0;
      }
      return 1;
    }
  }

  init(scene) {
    scene.add(this.group);
    this.createBody();
    this.createHead();
    this.createArms();
  }
}
