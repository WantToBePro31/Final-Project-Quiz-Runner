import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";
import { Obstacle } from "./obstacle.js";
import { Quiz } from "./quiz.js";

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

rand_stone = helper.randomCount();
if (rand_stone === 1) {
  obstacle2.disableStone();
  obstacle3.disableStone();
} else if (rand_stone === 2) {
  obstacle3.disableStone();
}

function gameOverCondition() {
  const gameOver = document.getElementById("game-over");
  gameOver.style.display = "block";
  const exitgame = document.getElementById("exit-game");
  exitgame.style.display = "block";
  let highScore = localStorage.getItem("highScore");
  localStorage.setItem(
    "highScore",
    helper.updateHighScore(highScore === null ? 0 : highScore, view.score - 1)
  );
  figure.dead = 1;
}

//play controller
gsap.ticker.add(() => {
  if (figure.dead === 0) {
    figure.walk = figure.doWalk(figure.walk);
    figure.jump = figure.doJump(figure.jump);
    figure.moveLeft = figure.doMoveLeft(figure.moveLeft, figure.stepCount);
    figure.moveRight = figure.doMoveRight(figure.moveRight, figure.stepCount);
    stones.forEach((stone) => {
      let curStone = stone.moveStone();
      stone.stoneGroup.position.set(
        curStone.position.x,
        curStone.position.y,
        curStone.position.z
      );
    });
    if (!randomized) {
      rand_stone = helper.randomCount();
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
      if (figure.group.position.x > -4) {
        figure.moveLeft = 1;
        break;
      } else {
        break;
      }
    case "KeyD":
    case "ArrowRight":
      if (figure.group.position.x < 4) {
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
    let distX = Math.abs(figure.group.position.x - stone.stoneGroup.position.x);
    let distY = Math.abs(figure.group.position.y - stone.stoneGroup.position.y);
    let distZ = Math.abs(figure.group.position.z - stone.stoneGroup.position.z);
    if (
      (distX < 0.2 && distY < 1.5 && distZ < 1.8) ||
      (distX < 1.7 && distY < 1.5 && distZ < 0.7) ||
      (distX > 1.2 && distX < 2 && distY < 1.5 && distZ > 1.6 && distZ < 2)
    ) {
      gameOverCondition();
    }
    if (
      helper.randomGenerator(1000) &&
      !isQuiz &&
      view.score > 1000 &&
      !figure.dead
    ) {
      isQuiz = true;
      figure.dead = 1;

      const quiz = new Quiz();
      quiz.init();

      document
        .getElementById("answer-1")
        .addEventListener("click", function () {
          quiz.answer = 1;
        });
      document
        .getElementById("answer-2")
        .addEventListener("click", function () {
          quiz.answer = 2;
        });
      document
        .getElementById("answer-3")
        .addEventListener("click", function () {
          quiz.answer = 3;
        });
      document
        .getElementById("answer-4")
        .addEventListener("click", function () {
          quiz.answer = 4;
        });

      const countdown = setInterval(() => {
        if (quiz.updateRemainingTime()) {
          gameOverCondition();
          quiz.closeQuiz();
          clearInterval(checkAnswer);
          clearInterval(countdown);
        }
      }, 1000);

      const checkAnswer = setInterval(() => {
        if (quiz.filledAnswer()) {
          if (quiz.checkAnswer()) {
            figure.dead = 0;
            isQuiz = false;
            quiz.closeQuiz();
            view.score += 500;
          } else {
            gameOverCondition();
            quiz.closeQuiz();
          }
          clearInterval(checkAnswer);
          clearInterval(countdown);
        }
      }, 100);
    }
  });
}, 20);
