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
const obstacle1 = new Obstacle();
const obstacle2 = new Obstacle();
const obstacle3 = new Obstacle();
obstacle1.makeStone(view.scene);
obstacle1.addOtherStone(obstacle2, obstacle3);
obstacle2.addOtherStone(obstacle1);
obstacle2.makeStone(view.scene);
obstacle3.addOtherStone(obstacle1, obstacle2);
obstacle3.makeStone(view.scene);
obstacle2.addOtherStone(obstacle3);
stones.push(obstacle1, obstacle2, obstacle3);

rand_stone = helper.randomCount()
if (rand_stone === 1) {
  obstacle2.disableStone();
  obstacle3.disableStone();
} else if (rand_stone === 2) {
  obstacle3.disableStone();
}

//play controller
gsap.ticker.add(() => {
  if (figure.dead === 0) {
    figure.walk = figure.doWalk(figure.walk);
    figure.jump = figure.doJump(figure.jump);
    figure.moveLeft = figure.doMoveLeft(figure.moveLeft, figure.stepCount);
    figure.moveRight = figure.doMoveRight(figure.moveRight, figure.stepCount);
    stones.forEach((stone) => {
      if (view.score % 1000 === 0) stone.speed += 0.2;
      let curStone = stone.moveStone();
      stone.stoneGroup.position.set(
        curStone.position.x,
        curStone.position.y,
        curStone.position.z
      );
    });
    if (!randomized) {
      rand_stone = helper.randomCount()
      randomized = true;
    }
    if (rand_stone === 1) {
      obstacle2.disableStone();
      obstacle3.disableStone();
    } else if (rand_stone === 2) {
      obstacle3.disableStone();
    }
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
      if (figure.group.position.y === -1) {
        figure.jump = 1;
        break;
      }
  }
});

//set collision
window.setInterval(() => {
  stones.forEach((stone) => {
    let distX = Math.abs(stone.stoneGroup.position.x - figure.group.position.x);
    let distY = Math.abs(figure.group.position.y - stone.stoneGroup.position.y);
    let distZ = Math.abs(figure.group.position.z - stone.stoneGroup.position.z);
    if (
      (distX < 0.2 && distY < 1.5 && distZ < 2) ||
      (distX < 1.5 && distY < 1.5 && distZ < 2)
    ) {
      const gameOver = document.getElementById("game-over");
      gameOver.style.display = "block";
      const exitgame = document.getElementById("exit-game");
      exitgame.style.display = "block";
      let highScore = localStorage.getItem("highScore");
      localStorage.setItem(
        "highScore",
        helper.updateHighScore(
          highScore === null ? 0 : highScore,
          view.score - 1
        )
      );
      figure.dead = 1;
    }
  });
}, 20);
