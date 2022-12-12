import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";

const helper = new Helper();
const view = new View();
view.init();
const figure = new Figure();
figure.init(view.scene);
figure.head.children[1].position.z -= 1;
figure.head.children[2].position.z -= 1;
figure.group.position.y -= 1;

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
  view.render();
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
      break;
  }
});
