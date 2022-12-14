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
    this.stone.position.x = helper.randomPlace();
    this.stone.position.y = -0.2;
    this.stone.position.z = -20;

    // Add the stone group to the group
    this.stoneGroup.add(this.stone);
  }

  moveStone() {
    if (this.stoneGroup.children[0].position.x < 0) {
      this.stoneGroup.children[0].position.x -= 0.02;
    } else if (this.stoneGroup.children[0].position.x > 0) {
      this.stoneGroup.children[0].position.x += 0.02;
    }
    this.stoneGroup.children[0].position.y -= 0.03;
    this.stoneGroup.children[0].position.z += 0.3;
    if (this.stoneGroup.children[0].position.z > 30) {
      this.stoneGroup.children[0].position.x = helper.randomPlace();
      this.stoneGroup.children[0].position.y = -0.2;
      this.stoneGroup.children[0].position.z = -20;
    }
    return this.stoneGroup.children[0]
  }

  makeStone(scene) {
    scene.add(this.stoneGroup);
    this.createStone();
  }
}
