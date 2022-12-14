import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";
import { Obstacle } from "./obstacle.js";

const helper = new Helper();
const view = new View();
view.init();
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
  // console.log(obstacle.stoneGroup.children[0].position.x, obstacle.stoneGroup.children[0].position.z)
  if (obstacle.stoneGroup.children[0].position.x < 0) {
    obstacle.stoneGroup.children[0].position.x -= 0.02;
  } else if (obstacle.stoneGroup.children[0].position.x > 0) {
    obstacle.stoneGroup.children[0].position.x += 0.02;
  }
  obstacle.stoneGroup.children[0].position.y -= 0.03;
  obstacle.stoneGroup.children[0].position.z += 0.3;
  if (obstacle.stoneGroup.children[0].position.z > 30) {
    obstacle.stoneGroup.children[0].position.x = helper.randomPlace();
    obstacle.stoneGroup.children[0].position.y = -0.2;
    obstacle.stoneGroup.children[0].position.z = -20;
  }
  if (figure.jump === 1) {
    figure.group.position.y += 0.1;
    if (figure.group.position.y >= 1.5) {
      figure.jump = 2;
    }
  }
  if (figure.jump === 2) {
    figure.group.position.y -= 0.1;
    if (figure.group.position.y <= -0.9) {
      figure.jump = 0;
    }
  }
  if (figure.dead === 0) {
    view.render();
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
      figure.jump = 1;
      break;
  }
});

window.setInterval(() => {
  if (
    (Math.abs(
      obstacle.stoneGroup.children[0].position.x - figure.group.position.x
    ) < 0.5 &&
      figure.group.position.x == 0 &&
      Math.abs(
        figure.group.position.z - obstacle.stoneGroup.children[0].position.z
      ) < 0.77) ||
    (Math.abs(
      obstacle.stoneGroup.children[0].position.x - figure.group.position.x
    ) < 0.7 &&
      Math.abs(
        figure.group.position.z - obstacle.stoneGroup.children[0].position.z
      ) < 1.6)
  ) {
    const gameOver = document.getElementById("game-over");
    gameOver.style.display = "block";
    figure.dead = 1;
  }
});
