import { Helper } from "./helper.js";

const helper = new Helper();

export class Obstacle {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ...params,
    };

    this.stoneGroup = new THREE.Group();
    this.stoneGroup.position.x = this.params.x;
    this.stoneGroup.position.y = this.params.y;
    this.stoneGroup.position.z = this.params.z;

    this.stoneArray = [];
  }

  createStone() {
    // Create the stone
    this.stoneGeometry = new THREE.BoxGeometry(2, 2, 2);
    this.stoneTexture = new THREE.TextureLoader().load(
      "images/stone-texture.jpg"
    );
    this.stoneMaterial = new THREE.MeshBasicMaterial({
      map: this.stoneTexture,
    });
    this.stone = new THREE.Mesh(this.stoneGeometry, this.stoneMaterial);
    this.stone.castShadow = true;
    this.stone.receiveShadow = true;

    // Position for the mouth
    while (true) {
      let loop = false;
      this.stone.position.x = helper.randomPlace();
      this.stoneArray.forEach((stoneData) => {
        if (
          stoneData.stoneGroup.children[0].position.x === this.stone.position.x
        ) {
          loop = true;
        }
      });
      if (!loop) {
        break;
      }
    }
    this.stone.position.y = -0.4;
    this.stone.position.z = -40;

    // Add the stone group to the group
    this.stoneGroup.add(this.stone);
  }

  addOtherStone(...stone) {
    stone.forEach((stoneData) => {
      this.stoneArray.push(stoneData);
    });
  }

  moveStone() {
    if (this.stoneGroup.children[0].position.x < 0) {
      this.stoneGroup.children[0].position.x -= 0.011;
    } else if (this.stoneGroup.children[0].position.x > 0) {
      this.stoneGroup.children[0].position.x += 0.011;
    }
    this.stoneGroup.children[0].position.y -= 0.01;
    this.stoneGroup.children[0].position.z += 0.4;
    if (this.stoneGroup.children[0].position.z > 40) {
      if (randomized) {
        randomized = false;
      }
      while (true) {
        let loop = false;
        this.stoneGroup.children[0].position.x = helper.randomPlace();
        this.stoneArray.forEach((stoneData) => {
          if (
            stoneData.stoneGroup.children[0].position.x ===
            this.stoneGroup.children[0].position.x
          ) {
            loop = true;
          }
        });
        if (!loop) {
          break;
        }
      }
      this.stoneGroup.children[0].position.y = -0.4;
      this.stoneGroup.children[0].position.z = -40;
    }
    return this.stoneGroup.children[0];
  }

  disableStone() {
    this.stoneGroup.position.set(-1000, -1000, -1000);
  }

  makeStone(scene) {
    scene.add(this.stoneGroup);
    this.createStone();
  }
}
