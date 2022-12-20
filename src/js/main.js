import { Helper } from "./helper.js";
import { View } from "./view.js";
import { Figure } from "./figure.js";

const helper = new Helper();
const view = new View();
view.init();
const figure = new Figure();
figure.init(view.scene);
figure.head.position.x -= 2.5;
figure.head.rotation.y += 0.3;
figure.body.position.x -= 2.5;
figure.body.rotation.y += 0.3;

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
  figure.bounce();
  view.render();
});

const figure2 = new Figure();
figure2.init(view.scene);
figure2.head.position.x += 2.5;
figure2.head.rotation.y -= 0.3;
figure2.body.position.x += 2.5;
figure2.body.rotation.y -= 0.3;

gsap.set(figure2.params, {
  y: -1.5,
});

gsap.to(figure2.params, {
  y: 0,
  armRotation: helper.degreesToRadians(90),
  repeat: -1,
  yoyo: true,
  duration: 0.5,
});

gsap.ticker.add(() => {
  figure2.bounce();
  view.render();
});