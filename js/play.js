import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";
import { Obstacle } from "./obstacle.js";

const helper = new Helper();
const view = new View();
view.init();
view.camera.position.set(0, 5, 10); // Set position like this
view.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Set look at coordinate like this
const figure = new Figure();
figure.init(view.scene);
figure.head.children[1].position.z -= 1;
figure.head.children[2].position.z -= 1;
figure.group.position.y -= 1;
const obstacle = new Obstacle();
obstacle.makeStone(view.scene);

//play controller
gsap.ticker.add(() => {
  if (figure.dead === 0) {
    if (view.score % 1000 === 0) obstacle.speed += 0.2;
    figure.walk = figure.doWalk(figure.walk);
    figure.jump = figure.doJump(figure.jump);
    figure.moveLeft = figure.doMoveLeft(figure.moveLeft, figure.stepCount);
    figure.moveRight = figure.doMoveRight(figure.moveRight, figure.stepCount);
    let curStone = obstacle.moveStone();
    obstacle.stoneGroup.position.set(
      curStone.position.x,
      curStone.position.y,
      curStone.position.z
    );
    view.render();
    view.score++;
  }
});

//set key movement
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      if (figure.group.position.x > -3) {
        figure.moveLeft = 1;
        break;
      } else {
        break;
      }
    case "KeyD":
    case "ArrowRight":
      if (figure.group.position.x < 3) {
        figure.moveRight = 1;
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

//set collision
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
    (distX < 0.2 && distY < 1.2 && distZ < 2) ||
    (distX < 1.3 && distY < 1.2 && distZ < 2)
  ) {
    const gameOver = document.getElementById("game-over");
    gameOver.style.display = "block";
    let highScore = localStorage.getItem("highScore");
    localStorage.setItem(
      "highScore",
      helper.updateHighScore(highScore === null ? 0 : highScore, view.score - 1)
    );
    figure.dead = 1;
  }
}, 20);
