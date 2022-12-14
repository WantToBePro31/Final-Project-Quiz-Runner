import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";
import { Obstacle } from "./obstacle.js";

const helper = new Helper();
const view = new View();
view.init();
view.camera.position.set(0, 5, 10); // Set position like this
view.camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this
const figure = new Figure();
figure.init(view.scene);
figure.head.children[1].position.z -= 1;
figure.head.children[2].position.z -= 1;
figure.group.position.y -= 1;
const obstacle = new Obstacle();
obstacle.makeStone(view.scene);

gsap.set(figure.params, {
  y: -1.5,
});

gsap.to(figure.params, {
  y: 0,
  armRotation: helper.degreesToRadians(90),
  repeat: -1,
  yoyo: true,
  duration: 0.5,
});

gsap.ticker.add(() => {
  if (figure.dead === 0) {
    let curStone = obstacle.moveStone();
    obstacle.stoneGroup.position.set(
      curStone.position.x,
      curStone.position.y,
      curStone.position.z
    );
    console.log(obstacle.stoneGroup.position);
    figure.jump = figure.doJump(figure.jump);
    view.render();
    view.score++;
  }
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      if (figure.group.position.x > -3) {
        figure.group.position.x -= 3;
        break;
      } else {
        break;
      }
    case "KeyD":
    case "ArrowRight":
      if (figure.group.position.x < 3) {
        figure.group.position.x += 3;
        break;
      } else {
        break;
      }
    case "Space":
    case "ArrowUp":
      figure.jump = 1;
      break;
  }
});

window.setInterval(() => {
  let distX = Math.abs(
    obstacle.stoneGroup.children[0].position.x - figure.group.position.x
  );
  let distY = Math.abs(
    figure.group.position.y - obstacle.stoneGroup.children[0].position.y
  );
  let distZ = Math.abs(
    figure.group.position.z - obstacle.stoneGroup.children[0].position.z
  );
  if (
    (distX < 0.2 && distY < 1.5 && distZ < 2) ||
    (distX < 1.3 && distY < 1.5 && distZ < 2)
  ) {
    const gameOver = document.getElementById("game-over");
    gameOver.style.display = "block";
    figure.dead = 1;
  }
}, 20);
