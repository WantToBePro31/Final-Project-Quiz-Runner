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
    this.stoneGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.stoneTexture = new THREE.TextureLoader().load(
      "images/stone-texture.jpg"
    );
    this.stoneMaterial = new THREE.MeshBasicMaterial({
      map: this.stoneTexture,
    });
    this.stone = new THREE.Mesh(this.stoneGeometry, this.stoneMaterial);
    this.stone.castShadow = true;
    this.stone.receiveShadow = true;
    this.stone.position.x = helper.randomPlace();
    this.stone.position.y = -0.2;
    this.stone.position.z = -20;
    this.stoneGroup.add(this.stone);
  }

  makeStone(scene) {
    scene.add(this.stoneGroup);
    this.createStone();
  }
}
